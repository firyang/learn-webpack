let { SyncLoopHook } = require('tapable')

class Lesson{
  constructor(){
    this.index = 0
    this.hooks = {
      arch: new SyncLoopHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tap('node',(name)=>{
      console.log('node',name)
      return ++this.index === 3 ? undefined : 't'
    })
    this.hooks.arch.tap('react',(name)=>{
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

