/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-21 11:45:10
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 11:52:16
 */
import { checkToken } from '../utils/token'

/**
 * role === 1 需要权限的路由
 * @required 'all': get post put delete 均需要权限。
 */
const verifyList1 = [
    { regexp: /\/user/, required: 'get, put, delete' }, // 普通用户 禁止获取用户、修改用户、以及删除用户
    { regexp: /\/category/, required: 'get, post, put, delete' } // 普通用户 禁止获取、创建、修改、以及删除分类
]

// role === 2 需要权限的路由
const verifyList2 = [
    { regexp: /\/discuss/, required: 'post' } // 未登录用户 禁止评论
]

/**
 * @description: 检查路由是否需要权限 返回权限列表
 * @param {String} method 请求方法
 * @param {String} url 请求url
 * @return {Array} 返回 roleList
 */
function checkAuth(method, url) {
    function _verify(list, role) {
        const target = list.find(v => {
            return (
                v.regexp.test(url) &&
                (v.required === 'all' ||
                    v.required.toUpperCase().includes(method))
            )
        })
        return target
    }

    const roleList = []
    const result1 = _verify(verifyList1)
    const result2 = _verify(verifyList2)

    result1 &&
        roleList.push({
            role: 1,
            verifyTokenBy: result1.verifyTokenBy || 'headers'
        })
    result2 &&
        roleList.push({
            role: 2,
            verifyTokenBy: result1.verifyTokenBy || 'headers'
        })

    return roleList
}

export const authHandler = function () {
    return async function (ctx, next) {
        const roleList = checkAuth(ctx.method, ctx.url)
        //  该路由需要验证
        if (roleList.length > 0) {
            if (checkToken(ctx, roleList)) {
                await next()
            } else {
                ctx.throw(401)
            }
        } else {
            await next()
        }
    }
}
