/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 00:07:02
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 00:04:17
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
import Token from './token'
import Category from './category'
import Article from './article'

const router = new Router()

router.use('/user', User.routes(), User.allowedMethods())
router.use('/token', Token.routes(), Token.allowedMethods())
router.use('/category', Category.routes(), Category.allowedMethods())
router.use('/article', Article.routes(), Article.allowedMethods())

export default router
