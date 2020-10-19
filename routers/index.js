/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 00:07:02
 * @LastEditors  : liulib
 * @LastEditTime : 2020-09-22 23:10:24
 */
// import fs from 'fs'

// export default (app) => {
//     fs.readdirSync(__dirname).forEach((file) => {
//         if (file === 'index.js') return
//         const route = require(`./${file}`)
//         app.use(route.routes()).use(route.allowedMethods())
//     })
// }
import Router from 'koa-router'
// 加载路由
import User from './user'
// 加载路由
import Token from './token'

const router = new Router()

router.use('/user', User.routes(), User.allowedMethods())
router.use('/token', Token.routes(), Token.allowedMethods())

export default router
