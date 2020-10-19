/*
 * @Des          : 验证数据格式
 * @Author       : liulib
 * @Date         : 2020-09-17 22:54:10
 * @LastEditors  : liulib
 * @LastEditTime : 2020-09-19 22:58:20
 */
import Joi from 'joi'

/**
 *
 * @param {Object} params - 需要被验证的 key-value
 * @param {Object} schema - 验证规则
 * @return Promise
 */
async function validate(params = {}, schema = {}) {
    const ctx = this
    try {
        await schema.validateAsync(params)
        return true
    } catch (error) {
        ctx.response.status = error.statusCode || error.status || 500
        ctx.response.body = {
            message: error.message,
        }
        return false
    }
}
// 绑定 app.context  ctx.func 直接调用
export default {
    validate: validate,
}
