//前端不能实现读取文件 h5 fileReader， bolb类型  文件类型
//我们希望可以存储2进制 buffer -> 和字符串转化
//buffer 是十六进制



//进制转化
//1)将任意进制转化成十进制
console.log(parseInt('111',2))
//2)将十进制转化成任意进制
console.log( (0x16).toString(10) )

// '珠' -> Base64的方式进行编码
let buffer = Buffer.from('珠')
console.log( buffer )       //e7 8f a0

console.log( (0xe7).toString(2) )   //11100111
console.log( (0x8f).toString(2) )   //10001111
console.log( (0xa0).toString(2) )   //10100000

// 00111001 00111000 00111110 00100000

let base64Encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
base64Encoding += ('ABCDEFGHIJKLMNOPQRSTUVWXYZ').toLowerCase();
base64Encoding += '0123456789+/'

console.log( parseInt('00111001', 2) )  //57
console.log( parseInt('00111000', 2) )  //56
console.log( parseInt('00111110', 2) )  //62
console.log( parseInt('00100000', 2) )  //32

console.log( base64Encoding[57] + base64Encoding[56] + base64Encoding[62] + base64Encoding[32] )    //54+g ->(base64)  -? '珠'

//base64    可以出现在任何url路径上，不用发请求 但是不适合大图片 fileReader base64


//Buffer    把内容存到内存中，buffer用来表示内存的
//16进制
//声明内存，通过长度    把字符串存到内存中，手动写内存里放什么

// 1)声明Buffer的三种方式 内存申请后，长度不可变
let buf1 = Buffer.alloc(10,01)  //<Buffer 01 01 01 01 01 01 01 01 01 01>

let buf2 = Buffer.from('珠峰')  //<Buffer e7 8f a0 e5 b3 b0>

let buf3 = Buffer.from([1,2,3,100]) //<Buffer 01 02 03 64>      自动转为16进制

//2)buffer中的常见的用法    循环    截取    有索引
buf1.forEach(element => {
    console.log( element )  //1 1 1 1 1 1 1 1 1 1
});
let r = buf1.slice( 0, 1 )
console.log(r)  //<Buffer 01>
r[0] = 100;
console.log(buf1)   //<Buffer 64 01 01 01 01 01 01 01 01 01>
console.log(buf1[0])    //100
console.log( Buffer.isBuffer( buf2 ) )  //isBuffer判断是不是一个Buffer      true

//3) 重写的方法 拷贝的方法  拼接的方法
//重写
let buf1 = Buffer.from('珠峰前端架构')
let buf2 = Buffer.from('后端')

buf1.write( '后端', 6, 6, 'utf8' )
console.log(buf1.toString())    //珠峰后端架构

//拷贝
let buf1 = Buffer.from('珠峰')
let buf2 = Buffer.from('前端')
let buf3 = Buffer.alloc(12)

Buffer.prototype.copy = function( targetBuffer, targetStart, sourceStart=0, sourceEnd=this.length ){
    for( let i = 0 ; i < sourceEnd ; i++ ){
        targetBuffer[targetStart + i] = this[i]
    }
}

buf1.copy(buf3, 6, 0, 6)
buf2.copy(buf3, 0, 0, 6)
console.log(buf3.toString())    //前端珠峰

//拼接
let buf1 = Buffer.from('珠峰')
let buf2 = Buffer.from('前端')

Buffer.concat = function( bufferList, len=bufferList.reduce( (prev, next) => prev+next.length, 0 ) ){
    console.log(len)
    let buffer = Buffer.alloc(len)
    let offset = 0;
    bufferList.forEach( item => {
        item.copy( buffer, offset )
        offset += item.length
    } )
    return buffer;
}

let buf3 = Buffer.concat([buf1, buf2])
console.log(buf3.toString())


//前端传递给后端数据    自定义数据格式
// "a珠峰我爱你a珠峰我爱你a珠峰我爱你a珠峰我爱你" ---  将'爱'字全部拿出来
let buffer = Buffer.from('a珠峰我爱你珠峰我爱你珠峰我爱你珠峰我爱你');
Buffer.prototype.split = function (sep) { 
    let arr = [];
    let offset = 0;
    let start = 0;
    sep = Buffer.from(sep)
    while( (offset = this.indexOf(sep, start)) !== -1 ){
        arr.push( this.slice( start, offset ) )
        start = start + sep.length
    }
    arr.push( this.slice(start) )
    return arr;
 }
let arr = buffer.split("爱")
console.log(arr)
