/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2022-09-15 10:30:54
 * @LastEditors: Seven
 * @LastEditTime: 2022-09-15 10:30:58
 */
const dgram = require('dgram');
//创建upd套接字
//选择‘udp4’套字类型
const server = dgram.createSocket('udp4');

//绑定端口和主机地址，dgram.Socket的bind方法把socket和一个端口绑定到一起
server.bind(8081, '127.0.0.1');

// 监听端口
server.on('listening', () => {
    console.log('服务器运行在:http://127.0.0.1:8081');
})

//接收消息
//rinfo远程主机的地址信息
server.on('message', (message, rinfo) => {

    console.log(`服务器收到来自${rinfo.address}:${rinfo.port}的消息: ${message}  `)

})

//使用 close() 关闭socket之后触发
server.on('close', () => {
    console.log('服务器已关闭！');
});

//错误处理
server.on('error', (err) => {
    console.log(err)

})


