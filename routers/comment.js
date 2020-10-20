/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:43:49
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 09:44:12
 */
import Router from 'koa-router'
import CommentController from '../controllers/comment'

const router = new Router()

router.get('/', CommentController.getList) // 获取文章列表

export default router
