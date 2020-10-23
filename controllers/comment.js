/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:42:54
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 10:46:54
 */
import Comment from '../models/comment'
import User from '../models/user'
import Article from '../models/article'
import Joi from 'joi'

class CommentController {
    /**
     * @description: 获取文章评论列表
     */
    static async getListById(ctx) {
        const result = await Comment.findAndCountAll()
        ctx.parseRes(200, result, '查询成功')
    }

    static async create(ctx) {
        // 验证参数
        const val = await ctx.validate(
            ctx.request.body,
            Joi.object({
                comment: Joi.string().required(),
                userId: Joi.number().required(),
                articleId: Joi.number().required(),
                parentId: Joi.number()
            })
        )
        if (val) {
            const { comment, userId, articleId, parentId } = ctx.request.body
            // 查询分类及文字是否存在
            const user = await User.findOne({
                where: {
                    id: userId
                }
            })
            const article = await Article.findOne({
                where: {
                    id: articleId
                }
            })
            if (user && article) {
                // 创建评论
                await Comment.create({ comment, userId, articleId, parentId })
                // 返回数据
                ctx.parseRes(200, null, '创建成功')
            } else {
                // 返回数据
                ctx.parseRes(404, null, '文章或用户不存在')
            }
        }
    }
}

export default CommentController
