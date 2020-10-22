/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 23:04:18
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 15:39:55
 */
import Category from '../models/category'
import Joi from 'joi'

class CategoryController {
    /**
     * @description: 获取分类列表
     */
    static async getList(ctx) {
        const result = await Category.findAndCountAll()
        ctx.success(200, result, '查询成功')
    }
    /**
     * @description: 创建分类
     */
    static async create(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                name: Joi.string().required(),
                parentId: Joi.number().required()
            })
        )
        if (val) {
            const { name, parentId } = ctx.request.body
            // 创建分类
            await Category.create({
                name,
                parentId
            })
            // 返回数据
            ctx.success(200, '创建成功', null)
        }
    }
    /**
     * @description: 更新分类
     */
    static async update(ctx) {
        // 验证参数
        const val = await ctx.validate(
            {
                categoryId: ctx.params.id,
                ...ctx.request.body
            },
            Joi.object({
                categoryId: Joi.string().required(),
                name: Joi.string().required(),
                parentId: Joi.number().required()
            })
        )
        if (val) {
            const { name, parentId } = ctx.request.body
            const categoryId = parseInt(ctx.params.id)
            // 更新分类
            await Category.update(
                {
                    name,
                    parentId
                },
                { where: { id: categoryId } }
            )
            // 返回数据
            ctx.success(200, '更新成功', null)
        }
    }
}

export default CategoryController
