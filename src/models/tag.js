/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-22 11:31:31
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 15:17:53
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'
import Article from './article'

// 定义标签模型
class Tag extends Model {}

// 初始标签模型
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        name: { type: DataTypes.STRING, allowNull: false, comment: '标签名' }
    },
    {
        sequelize,
        modelName: 'Tag',
        tableName: 'tag'
    }
)

export default Tag
