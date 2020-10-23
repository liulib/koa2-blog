/*
 * @Des          :
 * @Author       : liulib
 * @Date         : 2020-10-23 15:23:09
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 15:24:47
 */
/**
 *
 * 解码 url 请求
 * @param {String} url
 * @returns {Object} 请求参数对象
 */
export default url => {
    const params = {}
    const paramsStr = url.replace(/(\S*)\?/, '') // a=1&b=2&c=&d=xxx&e
    paramsStr.split('&').forEach(v => {
        const d = v.split('=')
        if (d[1] && d[0]) params[d[0]] = d[1]
    })
    return params
}
