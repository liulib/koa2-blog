/*
 * @Des          : 基本配置项
 * @Author       : liulib
 * @Date         : 2020-09-12 22:36:01
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 16:22:04
 */
export const PORT = 3838 // 项目运行端口
export const DATABASE = {
    database: 'koa2_blog',
    user: 'root',
    password: 'root',
    options: {
        host: 'localhost', // 连接的 host 地址
        port: 3306, // 连接到的端口
        dialect: 'mysql', // 连接到 mysql
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            createdAt: 'createdAt', //自定义时间戳
            updatedAt: 'updatedAt', // 自定义时间戳
            freezeTableName: true // 表名默认不加 s
        },
        timezone: '+08:00'
    }
}
export const GITHUB = {
    client_id: '8cfd838ae6ab49046df7',
    client_secret: '19e698188b8ebd8aa4ef5d3e51550ecc7f85247c',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
    fetch_user: 'https://api.github.com/users/' // fetch user url https://api.github.com/users/gershonv
}
export const ADMIN_GITHUB_LOGIN_NAME = 'liulib' // 博主的 github 登录的账户名 user
export const TOKEN = {
    secret: 'liu-li-b-test', // secret is very important!
    expiresIn: '720h' // token 有效期
}
