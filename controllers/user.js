/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-12 23:59:56
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 09:32:07
 */
import User from '../models/user'
import Joi from 'joi'

class UserController {
    /**
     * @description: 获取用户列表
     */
    static async getList(ctx) {
        const result = await User.findAll()
        ctx.body = result
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
            // 创建用户
            await User.create({ username, password, email, nickname })

            ctx.body = '用户创建成功'
        }
    }
    /**
     * @description: 登录
     */
    static async login(ctx) {}
}

export default UserController
