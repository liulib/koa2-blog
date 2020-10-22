/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-22 14:17:56
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 15:44:27
 */
import Tag from '../models/tag'
import Joi from 'joi'

class TagController {
    /**
     * @description: 获取标签列表
     */
    static async getList(ctx) {
        const result = await Tag.findAndCountAll()
        // 返回数据
        ctx.success(200, result, '创建成功')
    }
    /**
     * @description: 创建标签
     */
    static async create(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                name: Joi.string().required()
            })
        )
        if (val) {
            const { name } = ctx.request.body
            // 创建标签
            await Tag.create({
                name
            })
            // 返回数据
            ctx.success(200, null, '创建成功')
        }
    }
    /**
     * @description: 更新标签
     */
    static async update(ctx) {
        // 验证参数
        const val = await ctx.validate(
            {
                tagId: ctx.params.id,
                ...ctx.request.body
            },
            Joi.object({
                tagId: Joi.string().required(),
                name: Joi.string().required()
            })
        )
        if (val) {
            const { name } = ctx.request.body
            const tagId = parseInt(ctx.params.id)
            // 更新分类
            await Tag.update(
                {
                    name
                },
                { where: { id: tagId } }
            )
            // 返回数据
            ctx.success(200, '更新成功', null)
        }
    }
}

export default TagController
