/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 00:09:57
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 09:28:13
 */
import Router from 'koa-router'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', UserController.getList) // 获取用户列表
router.post('/register', UserController.register) // 注册用户

export default router
