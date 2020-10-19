/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-09-13 22:54:16
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 16:59:29
 */
import Sequelize from 'sequelize'
import config from '../config/index'

const sequelize = new Sequelize(
    config.DATABASE.database,
    config.DATABASE.user,
    config.DATABASE.password,
    {
        ...config.DATABASE.options
    }
)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.')
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    })

sequelize.sync({ force: true })

export default sequelize
