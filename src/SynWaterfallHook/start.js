let { SyncWaterfallHook } = require('tapable')

class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
      return 'node complete'
    })
    this.hooks.arch.tap('react',function(data){
      console.log('react',data)
    })
  }
  start(){
    this.hooks.arch.call('jw')
  }
}

let l = new Lesson('js')
l.tap()
l.start()

