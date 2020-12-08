/*
 * @Des          : 处理返回数据格式中间件
 * @Author       : liulib
 * @Date         : 2020-10-21 10:40:19
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 16:44:07
 */
export const routerResponse = function (option = {}) {
    return async function (ctx, next) {
        ctx.parseRes = function (code, data, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.successCode || 0,
                msg: msg,
                data: data
            }
        }
        await next()
    }
}
