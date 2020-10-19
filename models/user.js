/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-12 23:29:22
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 23:18:06
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'
import bcrypt from 'bcrypt'

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
            set(val) {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(val, salt)
                this.setDataValue('password', hash)
            },
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
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            comment: '用户角色：true - admin, false - 普通用户',
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'user',
    }
)

export default User
