/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:43:49
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 10:41:02
 */
import Router from 'koa-router'
import CommentController from '../controllers/comment'

const router = new Router()

router.get('/', CommentController.getListById) // 获取评论列表
router.post('/', CommentController.create) // 创建评论

export default router
