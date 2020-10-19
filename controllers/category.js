/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-19 23:04:18
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-19 23:17:39
 */
import Category from '../models/category'
import Joi from 'joi'

class CategoryController {
    /**
     * @description: 获取分类列表
     */
    static async getList(ctx) {
        const result = await Category.findAll()
        ctx.body = result
    }
}

export default CategoryController
