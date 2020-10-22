/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 23:48:58
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-22 13:49:38
 */
import Router from 'koa-router'
import CategoryController from '../controllers/category'

const router = new Router()

router.get('/', CategoryController.getList) // 获取分类列表
router.post('/', CategoryController.create) // 创建分类
router.put('/:id', CategoryController.update) // 更新分类

export default router
