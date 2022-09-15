/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2022-09-14 16:36:58
 * @LastEditors: Seven
 * @LastEditTime: 2022-09-15 10:56:35
 */
const http = require('http');
const ws = require('ws');

SendData ="inint";

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    res.end();
    return;
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}



function onConnect(ws) {
  ws.on('message', function (message) {
    message = message.toString();
    SendData = message;
    console.log(message);
    ws.send("Hello from server");

    //setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

function Get_data(data){
  var out = data;
  return out;
}





if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}


const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const PORT = 8081;
const HOST = '127.0.0.1'

//buffer用来存储数据
//const Data = Buffer.from(SendData);
setInterval(function(){
  client.send(SendData, 0, SendData.length, PORT, HOST, (err, bytes) => {
    if (err) {
        console.log(err);
    }
    console.log(`服务器发送消息到：http://${HOST}:${PORT}`);
    console.log(`发送了 ${bytes} 个字节数据`);
     //client.close();

})
},100);

client.on('close', () => {
    console.log('客户端已关闭！')
})

//错误处理
client.on('error', (error) => {
    console.log(error)
})




