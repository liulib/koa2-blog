/*
 * @Des          : 基本配置项
 * @Author       : liulib
 * @Date         : 2020-09-12 22:36:01
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 15:18:24
 */
export default {
    PORT: 3838, // 项目运行端口
    DATABASE: {
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
}
