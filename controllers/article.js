/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 00:02:07
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 17:30:08
 */
import Article from '../models/article'
import Category from '../models/category'
import Tag from '../models/tag'
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
                categoryId: Joi.string(),
                tagId: Joi.number(),
                order: Joi.number()
            })
        )
        if (val) {
            const {
                page = 1,
                pageSize = 10,
                keyword,
                startTime,
                endTime,
                categoryId,
                tagId,
                order
            } = ctx.query
            // 构造查询参数
            const where = {}
            // 分类和标签查询
            console.log(ctx.query)
            const tagFilter = tagId ? { id: tagId } : null
            console.log(tagFilter)
            const categoryFilter = categoryId ? { id: categoryId } : null
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
                include: [{ model: Tag, attributes: ['id'], where: tagFilter }],
                offset: (page - 1) * pageSize,
                limit: parseInt(pageSize),
                order: articleOrder
            })
            ctx.parseRes(200, result, '查询成功')
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
                keyword: Joi.string().required(),
                categoryId: Joi.number().required(),
                tagsId: Joi.array()
            })
        )
        if (val) {
            const {
                title,
                brief,
                content,
                keyword,
                tagsId,
                categoryId
            } = ctx.request.body

            // 查询分类是否存在
            const category = await Category.findAll({
                where: {
                    id: categoryId
                }
            })
            // 不存在分类则不进行创建
            if (category.length < 1) {
                ctx.parseRes(200, null, '请选择分类')
            } else {
                // 判断标签是否都存在
                const tags = await Tag.findAll({ where: { id: tagsId } })
                if (tags.length !== tagsId.length) {
                    ctx.parseRes(200, null, '请选择标签')
                } else {
                    // 创建文章
                    const newArticle = await Article.create({
                        title,
                        brief,
                        content,
                        keyword,
                        categoryId
                    })
                    // 为ArticleTags表添加记录
                    await newArticle.setTags(tags)
                    // 返回数据
                    ctx.parseRes(200, null, '创建成功')
                }
            }
        }
    }
}

export default ArticleController
