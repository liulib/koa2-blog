/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-22 23:01:40
 * @LastEditors  : liulib
 * @LastEditTime : 2020-09-22 23:12:59
 */
import { DataTypes } from 'sequelize'
import sequelize from './sequelize'

export default sequelize.define(
    'Token',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        token: { type: DataTypes.STRING(1234), allowNull: false }
    },
    {
        timestamps: true
    }
)
