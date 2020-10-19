/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 00:02:07
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 00:02:42
 */
import Article from '../models/article'
import Joi from 'joi'

class ArticleController {
    /**
     * @description: 获取文章列表
     */
    static async getList(ctx) {
        const result = await Article.findAll()
        ctx.body = result
    }
}

export default ArticleController
