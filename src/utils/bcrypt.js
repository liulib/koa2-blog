/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 14:49:51
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 15:28:54
 */
import bcrypt from 'bcrypt'

const saltRounds = 10

/**
 * @description: 对密码进行加密
 * @param {string} password 密码
 * @return {string} 加密后的密码
 */
const encrypt = password => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

/**
 * @description: 校验密码
 * @param {string} password 需要校验的密码
 * @param {string} hash 加密后的密码
 * @return {boolean} 是否通过校验
 */
const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

export { encrypt, comparePassword }
