/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-22 14:19:13
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 15:36:26
 */
import Router from 'koa-router'
import TagController from '../controllers/tag'

const router = new Router()

router.get('/', TagController.getList) // 获取标签列表
router.post('/', TagController.create) // 创建标签

export default router
