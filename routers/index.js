/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 00:07:02
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 09:44:43
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
import Category from './category'
import Article from './article'
import Comment from './comment'

const router = new Router()

router.use('/user', User.routes(), User.allowedMethods())
router.use('/category', Category.routes(), Category.allowedMethods())
router.use('/article', Article.routes(), Article.allowedMethods())
router.use('/comment', Comment.routes(), Comment.allowedMethods())

export default router
