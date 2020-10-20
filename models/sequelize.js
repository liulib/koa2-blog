/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 22:54:16
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-20 23:50:32
 */
import Sequelize from 'sequelize'
import { DATABASE } from '../config/index'

const sequelize = new Sequelize(
    DATABASE.database,
    DATABASE.user,
    DATABASE.password,
    {
        ...DATABASE.options,
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err)
    })

sequelize.sync({ force: true })

export default sequelize
