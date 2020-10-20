/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-20 09:12:17
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 09:58:17
 */
import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'
import Article from './article'
import User from './user'

// 定义评论模型
class Comment extends Model {}

// 初始评论模型
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: 'id'
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: '评论内容'
        },
        parent_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: '父评论id,顶级评论无父级id'
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '评论人的id'
        },
        article_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '评论的文章id'
        }
    },
    {
        sequelize,
        modelName: 'Comment',
        tableName: 'comment'
    }
)

// 评论关联文章
Article.hasMany(Comment, {
    foreignKey: 'article_id',
    sourceKey: 'id',
    as: 'comment'
})

// 评论关联用户
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'user'
})

// 评论关联自身
Comment.belongsTo(Comment, {
    foreignKey: 'parent_id',
    targetKey: 'id',
    as: 'parent'
})

export default Comment
