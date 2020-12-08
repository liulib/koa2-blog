/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-22 11:31:31
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 11:36:18
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'
import User from './user'

// 定义评论模型
class Ip extends Model {}

// 初始评论模型
Ip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        ip: { type: DataTypes.TEXT, allowNull: false, comment: 'ip 地址' },
        auth: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: '是否可用'
        }
    },
    {
        sequelize,
        modelName: 'Ip',
        tableName: 'ip'
    }
)

// IP关联用户
Ip.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id',
    as: 'user'
})

export default Ip
