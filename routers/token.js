/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-22 23:06:48
 * @LastEditors  : liulib
 * @LastEditTime : 2020-09-22 23:08:03
 */
import Router from 'koa-router'
import TokenController from '../controllers/token'

const router = new Router()

router.get('/', TokenController.getList) // 获取列表
router.post('/', TokenController.created) // 生成

export default router
