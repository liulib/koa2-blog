/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:42:54
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 16:39:06
 */
import Comment from '../models/comment'
import Joi from 'joi'

class CommentController {
    /**
     * @description: 获取分类列表
     */
    static async getList(ctx) {
        const result = await Comment.findAll()
        ctx.parseRes(200, result, '查询成功')
    }
}

export default CommentController
