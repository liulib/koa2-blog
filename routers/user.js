/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 00:09:57
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 15:44:22
 */
import Router from 'koa-router'
import UserController from '../controllers/user'

const router = new Router()

router.get('/', UserController.getList) // 获取用户列表
router.post('/register', UserController.register) // 注册
router.post('/login', UserController.login) // 登录
router.put('/:id', UserController.updateUser) // 更新用户信息

export default router
