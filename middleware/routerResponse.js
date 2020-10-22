/*
 * @Des          : 处理返回数据格式中间件
 * @Author       : liulib
 * @Date         : 2020-10-21 10:40:19
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 11:41:23
 */
export const routerResponse = function (option = {}) {
    return async function (ctx, next) {
        ctx.success = function (code, data, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.successCode || 0,
                msg: msg,
                data: data
            }
        }

        ctx.fail = function (code, msg) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.failCode || 99,
                msg: msg || option.successMsg || 'fail'
            }
        }
        await next()
    }
}
