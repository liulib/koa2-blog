/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-12 23:59:56
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 16:46:32
 */
import Joi from 'joi'
import axios from 'axios'
// 导入配置
import { GITHUB, TOKEN } from '../config'
// 导入模型
import User from '../models/user'
// 导入工具函数
import { encrypt, comparePassword } from '../utils/bcrypt'
import { createToken } from '../utils/token'

class UserController {
    /**
     * @description: 获取用户列表
     */
    static async getList(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
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
    /**
     * @description: 注册
     */
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
    /**
     * @description: 登录
     */
    static async login(ctx) {
        const { code } = ctx.request.body
        // 判断是否github登录
        if (code) {
            await UserController.githubLogin(ctx, code)
        } else {
            await UserController.defaultLogin(ctx)
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
                // ctx.client(403, '用户不存在')
                ctx.throw(403, '用户不存在')
            } else {
                const isMatch = await comparePassword(password, user.password)
                if (!isMatch) {
                    // ctx.client(403, '密码不正确')
                    ctx.throw(403, '密码不正确')
                } else {
                    const { id, role } = user
                    const token = createToken({
                        username: user.username,
                        userId: id,
                        role
                    }) // 生成 token
                    // ctx.client(200, '登录成功', { username: user.username, role, userId: id, token })
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
    static async githubLogin(ctx, code) {
        const result = await axios.post(GITHUB.access_token_url, {
            client_id: GITHUB.client_id,
            client_secret: GITHUB.client_secret,
            code
        })
        console.log(result)
        // const { access_token } = decodeQuery(result.data)

        // if (access_token) {
        //     // 拿到 access_token 去获取用户信息
        //     const result2 = await axios.get(
        //         `${GITHUB.fetch_user_url}?access_token=${access_token}`
        //     )
        //     const githubInfo = result2.data

        //     let target = await UserController.find({ id: githubInfo.id }) // 在数据库中查找该用户是否存在

        //     if (!target) {
        //         target = await User.create({
        //             id: githubInfo.id,
        //             username: githubInfo.name || githubInfo.username,
        //             github: JSON.stringify(githubInfo),
        //             email: githubInfo.email
        //         })
        //     } else {
        //         if (target.github !== JSON.stringify(githubInfo)) {
        //             // github 信息发生了变动
        //             // console.log(`${githubInfo.login}: github 信息发生改变， 更新 user....`)
        //             const { id, login, email } = githubInfo
        //             const data = {
        //                 username: login,
        //                 email,
        //                 github: JSON.stringify(githubInfo)
        //             }
        //             await UserController.updateUserById(id, data)
        //         }
        //     }
        //     // username: user.username, role, userId: id, token
        //     const token = createToken({
        //         userId: githubInfo.id,
        //         role: target.role
        //     }) // 生成 token

        //     ctx.body = {
        //         github: githubInfo,
        //         username: target.username,
        //         userId: target.id,
        //         role: target.role,
        //         token
        //     }
        // } else {
        //     ctx.throw(403, 'github 授权码已失效！')
        // }
    }
}

export default UserController
