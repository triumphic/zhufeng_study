//node 自己封装了文件流

//提供一系列api 自己可以控制读取和写入的个数

// 1）读取
let buffer = Buffer.alloc(3)
let fs = require('fs')
//先打开文件    读取就是r           fd文件描述符号  数字类型
fs.open( './dist.txt', 'r', function(err, fd){
    // console.log(fd)
    //fd 文件描述符 
    //buffer 当前读取到哪里去
    //offset    表示从buffer的那个位置开始写入
    //length    写入的个数
    //从文件的第二个位置开始读
    fs.read( fd, buffer, 0, 3, 2, function (err, bytesRead) { 
        fs.close(fd, function (err) { 
            if(err){
                return console.log(err)
            }
            console.log('关闭成功')
         })
     } )
} )