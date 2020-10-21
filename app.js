/*
 * @Des          : 入口文件
 * @Author       : liulib
 * @Date         : 2020-09-12 23:04:08
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-21 14:41:46
 */
import Koa from 'koa'
import { PORT } from './config/index'
import koaBody from 'koa-body'
import context from './utils/context'

const app = new Koa()

// 引入路由
import routers from './routers/index'
// 引入自定义中间件
import { routerResponse } from './middleware/routerResponse'
import { authHandler } from './middleware/authHandler'
app.use(routerResponse())
app.use(authHandler)
app.use(koaBody())

// 绑定上下文对象
Object.keys(context).forEach(key => {
    app.context[key] = context[key]
})

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use(async ctx => {
    ctx.body = 'hello koa2'
})

app.listen(PORT, () => {
    console.log(`===============================================
    app is running at http://127.0.0.1:${PORT}
===============================================
    `)
})
