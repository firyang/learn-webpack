let { SyncBailHook } = require('tapable')

class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncBailHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      return '停一下'
    })
    this.hooks.arch.tap('react',function(name){
      console.log('react',name)
    })
  }
  start(){
    this.hooks.arch.call('jw')
  }
}

let l = new Lesson('js')
l.tap()
l.start()

