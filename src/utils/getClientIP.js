/*
 * @Des          : 获取客户请求ip 存在bug：无法获取真实IP
 * @Author       : liulib
 * @Date         : 2020-10-23 11:20:26
 * @LastEditors  : liulib
 * @LastEditTime : 2020-10-23 11:36:50
 */
const getClientIP = req => {
    let ip =
        req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        req.ip ||
        req.connection.remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress ||
        ''
    if (ip) {
        ip = ip.replace('::ffff:', '')
    }
    return ip
}

export default getClientIP
