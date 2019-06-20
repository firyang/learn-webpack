let { SyncHook } = require('tapable')

class Lesson{
  constructor(){
    this.hooks = {
      arch: new SyncHook(['name'])
    }
  }
  tap(){
    this.hooks.arch.tap('node',function(name){
      console.log('node',name)
    })

    this.hooks.arch.tap('react', function (name) {
      console.log('react', name)
    })
  }
  start(){
    this.hooks.arch.call('jw')
  }
}

const l = new Lesson('js')
l.tap()
l.start()