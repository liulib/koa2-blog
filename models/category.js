/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 15:54:13
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 22:43:49
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

// 定义分类模型
class Category extends Model {}

// 初始分类模型
Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '分类名称',
        },
        key: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: '分类关键字',
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            comment: '分类父级ID，默认为0',
        },
    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'category',
    }
)

export default Category
