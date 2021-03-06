/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 15:26:37
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 10:09:45
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'
import Category from './category'
import Tag from './tag'

// 定义文章模型
class Article extends Model {}

// 初始文章模型
Article.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        title: {
            type: DataTypes.STRING(60),
            allowNull: false,
            comment: '标题'
        },
        brief: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: '',
            comment: '简介'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            comment: '内容'
        },
        pageViews: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            comment: '浏览数'
        },
        keyword: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '',
            comment: '文章关键字'
        }
    },
    {
        sequelize,
        modelName: 'Article',
        tableName: 'article'
    }
)

// 文章关联分类
Article.belongsTo(Category, {
    foreignKey: 'categoryId',
    targetKey: 'id',
    as: 'category'
})

// 文章关联标签
Article.belongsToMany(Tag, { through: 'ArticleTags' })
// Tag关联文章
Tag.belongsToMany(Article, { through: 'ArticleTags' })

export default Article
