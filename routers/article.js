/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 00:03:14
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 00:03:41
 */
import Router from 'koa-router'
import ArticleController from '../controllers/article'

const router = new Router()

router.get('/', ArticleController.getList) // 获取文章列表

export default router
