/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-12 23:59:56
 * @LastEditors  : liulib
 * @LastEditTime : 2020-11-04 10:40:15
 */
import Joi from 'joi'
import axios from 'axios'
// 导入配置
import { GITHUB } from '../config'
// 导入模型
import User from '../models/user'
import Ip from '../models/ip'
// 导入工具函数
import { encrypt, comparePassword } from '../utils/bcrypt'
import { createToken } from '../utils/token'
import getClientIp from '../utils/getClientIP'
import decodeParams from '../utils/decodeParams'

/**
 * 读取 github 用户信息
 * @param {String} username - github 登录名
 */
async function getGithubInfo(username) {
    const result = await axios.get(`${GITHUB.fetch_user}${username}`)
    return result && result.data
}

class UserController {
    // 获取用户列表
    static async getList(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.query,
            Joi.object({
                username: Joi.string().allow(''),
                startTime: Joi.string(),
                endTime: Joi.string(),
                page: Joi.number(),
                pageSize: Joi.number()
            })
        )
        if (val) {
            const {
                page = 1,
                pageSize = 10,
                username,
                startTime,
                endTime
            } = ctx.query
            // 构造查询参数
            const where = {}
            if (username) {
                where.username = {}
                where.username['$like'] = `%${username}%`
            }
            if (startTime && endTime) {
                where.createdAt = { $between: [startTime, endTime] }
            }
            const result = await User.findAndCountAll({
                where,
                offset: (page - 1) * pageSize,
                limit: parseInt(pageSize),
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['password'] }
            })
            ctx.parseRes(200, result, '查询成功')
        }
    }
    // 创建github用户
    static createGithubUser(data, role = 2) {
        const { login, email } = data
        return User.create({
            username: login,
            role,
            email,
            github: JSON.stringify(data)
        })
    }
    // 注册
    static async register(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
                email: Joi.string().email().required(),
                nickname: Joi.string()
            })
        )
        if (val) {
            const { username, password, email, nickname } = ctx.request.body
            // 验证邮箱是否被注册
            const hasEmail = await User.findOne({ where: { email } })
            if (hasEmail) {
                ctx.throw(403, '邮箱已被注册')
            }
            // 验证用户名是否被注册
            const hasUser = await User.findOne({ where: { username } })
            if (hasUser) {
                ctx.throw(403, '用户名已被占用')
            }
            // 密码加密
            const saltPassword = encrypt(password)
            // 创建用户
            await User.create({
                username,
                password: saltPassword,
                email,
                nickname
            })
            // 返回数据
            ctx.parseRes(200, null, '用户创建成功')
        }
    }
    // 站内用户登录
    static async defaultLogin(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required()
            })
        )
        if (val) {
            const { username, password } = ctx.request.body
            const user = await User.findOne({
                where: {
                    // $or: { email: account, username: account }
                    username: username
                }
            })
            if (!user) {
                ctx.throw(403, '用户不存在')
            } else {
                console.log(password)
                console.log(user.password)
                const isMatch = await comparePassword(password, user.password)
                if (!isMatch) {
                    ctx.throw(403, '密码不正确')
                } else {
                    const { id, role } = user
                    // 生成 token
                    const token = createToken({
                        username: user.username,
                        userId: id,
                        role
                    })
                    // 记录ip地址
                    const ip = getClientIp(ctx)
                    if (ip) {
                        Ip.create({ ip, userId: id })
                    }
                    // 返回消息
                    ctx.parseRes(
                        200,
                        {
                            username: user.username,
                            role,
                            userId: id,
                            token
                        },
                        '登录成功'
                    )
                }
            }
        }
    }

    // github 登录
    static async githubLogin(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                code: Joi.string().required()
            })
        )
        if (val) {
            const { code } = ctx.request.body
            const res = await axios.post(GITHUB.access_token_url, {
                client_id: GITHUB.client_id,
                client_secret: GITHUB.client_secret,
                code
            })
            // 获取返回数据 判断是否存在access_token 不存在说明授权失败
            const { access_token } = decodeParams(res.data)
            if (access_token) {
                // 使用access_token获取用户信息
                const res2 = await axios.get(
                    `${GITHUB.fetch_user_url}?access_token=${access_token}`
                )
                const githubInfo = res2.data
                // 查找是否注册过
                let target = await User.findOne({
                    where: { id: githubInfo.id }
                })
                // 不存在就是用相关数据创建用户
                if (!target) {
                    target = await User.create({
                        id: githubInfo.id,
                        username: githubInfo.name || githubInfo.username,
                        github: JSON.stringify(githubInfo),
                        email: githubInfo.email
                    })
                } else {
                    // github 信息发生了变动
                    if (target.github !== JSON.stringify(githubInfo)) {
                        const { id, login, email } = githubInfo
                        const data = {
                            username: login,
                            email,
                            github: JSON.stringify(githubInfo)
                        }
                        // 更新用户信息
                        await UserController.updateUserById(id, data)
                    }
                }
                // 生成 token
                const token = createToken({
                    username: target.username,
                    userId: target.id,
                    role: target.role
                })
                // 记录ip地址
                const ip = getClientIp(ctx)
                if (ip) {
                    Ip.create({ ip, userId: target.id })
                }
                // 返回消息
                ctx.parseRes(
                    200,
                    {
                        username: target.username,
                        role,
                        userId: target.id,
                        token
                    },
                    '登录成功'
                )
            } else {
                ctx.throw(403, 'github 授权码已失效！')
            }
        }
    }
    /**
     * @description: 更新用户信息
     * @param {String} userId 用户id
     */
    static updateUserById(userId, data) {
        return User.update(data, { where: { id: userId } })
    }
    // 管理后台使用的更新用户信息的接口 比如禁言\邮件通知
    static async updateUser(ctx) {
        const val = ctx.validate(
            {
                ...ctx.params,
                ...ctx.request.body
            },
            {
                userId: Joi.number().required(),
                notice: Joi.boolean(),
                disabledDiscuss: Joi.boolean()
            }
        )
        if (val) {
            const { userId } = ctx.params
            const { notice, disabledDiscuss } = ctx.request.body
            await UserController.updateUserById(userId, {
                notice,
                disabledDiscuss
            })
            // 返回消息
            ctx.parseRes(204, null, '更新成功')
        }
    }
    /**
     * @description: 初始化管理员账号
     * @param {String} githubLoginName github名称 在配置文件中
     */
    static async initAdminUser(githubLoginName) {
        try {
            const github = await getGithubInfo(githubLoginName)
            const temp = await User.findOne({
                where: { username: github.login }
            })
            if (!temp) {
                UserController.createGithubUser(github, 1)
            }
        } catch (error) {
            console.trace(
                'create github user error ==============>',
                error.message
            )
        }
    }
}

export default UserController
