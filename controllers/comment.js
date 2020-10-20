/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:42:54
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 09:43:34
 */
import Comment from '../models/comment'
import Joi from 'joi'

class CommentController {
    /**
     * @description: 获取分类列表
     */
    static async getList(ctx) {
        const result = await Comment.findAll()
        ctx.body = result
    }
}

export default CommentController
