/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-23 15:50:31
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 16:05:50
 */
import { ADMIN_GITHUB_LOGIN_NAME } from './config/index'
import UserController from './controllers/user'

export default () => {
    // 创建 role === 1 的管理员账号
    UserController.initAdminUser(ADMIN_GITHUB_LOGIN_NAME)
}
