
require('./index.css')
require('./index.less')
require("@babel/polyfill")

let fn = ()=>{
  console.log('hello world','000000')
}

fn()

@log
class A{
  a = 1
}

let a=  new A()
console.log(a.a,'1111111')

function log(target){
  console.log(target,'22222222')
}

class B{}

function * gen(params){
  yield 1
}
console.log(gen().next(),'3333333')

console.log('aaa'.includes('a'))