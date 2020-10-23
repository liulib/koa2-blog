/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 22:54:16
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 16:03:26
 */
import Sequelize from 'sequelize'
import { DATABASE } from '../config/index'

const sequelize = new Sequelize(
    DATABASE.database,
    DATABASE.user,
    DATABASE.password,
    {
        ...DATABASE.options
    }
)

export default sequelize
