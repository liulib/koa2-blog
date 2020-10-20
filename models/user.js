/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-12 23:29:22
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 23:32:01
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

// 定义用户模型
class User extends Model {}

// 初始用户模型
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id',
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            comment: '用户名',
        },
        password: {
            type: DataTypes.STRING,
            comment: '密码',
        },
        email: {
            type: DataTypes.STRING(50),
            comment: '邮箱',
        },
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: true,
            comment: '昵称',
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: '用户角色：0 - admin, 1 - 普通用户',
        },
        github: {
            type: DataTypes.TEXT,
            comment: 'github 登录用户 直接绑定在 user 表',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
    }
)

export default User
