import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title:this.newTodo,
        createdAt: new Date(),
        done: false
      })
      //console.log(this.todoList)
      this.newTodo = ''
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo)
      console.log(index)
      this.todoList.splice(index,1)
    }
  },
  created: function(){
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('myTodos',dataString)

      let inpt = this.newTodo
      window.localStorage.setItem('myInpt',inpt)
    }
      let oldDataString = window.localStorage.getItem('myTodos')
      let oldData = JSON.parse(oldDataString)
      this.todoList = oldData || []

      let oldInpt = window.localStorage.getItem('myInpt')
      let oldIpt = oldInpt
      this.newTodo = oldIpt || ''
  }

}) 