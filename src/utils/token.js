/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 16:30:06
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 11:16:37
 */
import jwt from 'jsonwebtoken'
import { TOKEN } from '../config'

//创建token
const createToken = info => {
    const token = jwt.sign(info, TOKEN.secret, { expiresIn: TOKEN.expiresIn })
    return token
}

// 检验token
const checkToken = (ctx, roleList = []) => {
    let isVerify = false
    function _verify(token) {
        return jwt.verify(token, TOKEN.secret, function (err, decoded) {
            if (err) {
                return false
            } else if (decoded) {
                return !!roleList.find(item => item.role === decoded.role)
            }
            return false
        })
    }

    for (const item of roleList) {
        if (item.verifyTokenBy === 'headers') {
            const authorizationHeader = ctx.headers['authorization']
            if (authorizationHeader) {
                const token = authorizationHeader.split(' ')[1] // 取到 token

                const result = _verify(token)
                if (result) {
                    isVerify = true
                    break
                }
            }
        } else {
            const { token } = ctx.query
            if (token) {
                const _token = token.split(' ')[1] // 取到 token 过滤 Bearer
                const result = _verify(_token)
                if (result) {
                    isVerify = true
                    break
                }
            }
        }
    }

    return isVerify
}

export { createToken, checkToken }
