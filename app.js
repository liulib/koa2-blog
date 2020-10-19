/*
 * @Des          : 入口文件
 * @Author       : liulib
 * @Date         : 2020-09-12 23:04:08
 * @LastEditors  : liulib
 * @LastEditTime : 2020-09-19 13:03:49
 */
import Koa from 'koa'
import config from './config/index'
import koaBody from 'koa-body'
import context from './utils/context'

const app = new Koa()

// 引入路由
import routers from './routers/index'

app.use(koaBody())
// context binding...
Object.keys(context).forEach((key) => {
    app.context[key] = context[key] // 绑定上下文对象
})
// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

app.use(async (ctx) => {
    ctx.body = 'hello koa2'
})

app.listen(config.PORT, () => {
    console.log(`===============================================
    app is running at http://0.0.0.0:${config.PORT}
===============================================
    `)
})
