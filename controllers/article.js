/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 00:02:07
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 15:21:53
 */
import Article from '../models/article'
import Category from '../models/category'
import Tags from '../models/tag'
import Joi from 'joi'

class ArticleController {
    /**
     * @description: 获取文章列表
     */
    static async getList(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                keyword: Joi.string().allow(''), // 关键字查询
                startTime: Joi.string(),
                endTime: Joi.string(),
                page: Joi.number(),
                pageSize: Joi.number(),
                category: Joi.string(),
                tag: Joi.string(),
                order: Joi.string()
            })
        )
        if (val) {
            const {
                page = 1,
                pageSize = 10,
                keyword,
                startTime,
                endTime,
                category,
                tag,
                order
            } = ctx.query
            // 构造查询参数
            const where = {}
            // const tagFilter = tag ? { name: tag } : null
            // const categoryFilter = category ? { name: category } : null
            if (keyword) {
                where.keyword = {}
                where.keyword['$like'] = `%${keyword}%`
            }
            if (startTime && endTime) {
                where.createdAt = { $between: [startTime, endTime] }
            }
            // 排序
            let articleOrder = [['createdAt', 'DESC']]
            if (order) {
                articleOrder = [order.split(' ')]
            }

            const result = await Article.findAndCountAll({
                where,
                offset: (page - 1) * pageSize,
                limit: parseInt(pageSize),
                order: articleOrder
            })
            ctx.body = result
        }
    }
    /**
     * @description: 创建文章
     */
    static async create(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                title: Joi.string().required(),
                brief: Joi.string().required(),
                content: Joi.string().required(),
                keyword: Joi.string().required()
            })
        )
        if (val) {
            const { title, brief, content, keyword } = ctx.request.body
            // 创建分类
            await Article.create({
                title,
                brief,
                content,
                keyword
            })
            // 返回数据
            ctx.success(200, '创建成功', null)
        }
    }
}

export default ArticleController
