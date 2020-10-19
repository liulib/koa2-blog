/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-22 23:03:11
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 17:11:43
 */
import Token from '../models/token'
import Joi from 'joi'

class TokenController {
    /**
     * 获取列表
     */
    static async getList(ctx) {
        let { page = 1, rows } = ctx.query
        let limit = Number(rows)
        let offset = Number((page - 1) * rows)
        const result = await Token.findAll({
            offset,
            limit
        })
        ctx.body = result
    }
    /**
     * 生成token
     */
    static async created(ctx) {
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                token: Joi.string().required()
            })
        )
        if (val) {
            const { token } = ctx.request.body
            // 创建token
            await Token.create({ token })
            ctx.body = '创建成功'
        }
    }
}

export default TokenController
