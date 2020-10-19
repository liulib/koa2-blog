/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 23:48:58
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 23:49:41
 */
import Router from 'koa-router'
import CategoryController from '../controllers/category'

const router = new Router()

router.get('/', CategoryController.getList) // 获取分类列表

export default router
