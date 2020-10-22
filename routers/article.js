/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 00:03:14
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 14:00:50
 */
import Router from 'koa-router'
import ArticleController from '../controllers/article'

const router = new Router()

router.get('/', ArticleController.getList) // 获取文章列表
router.post('/', ArticleController.create) // 创建文章

export default router
