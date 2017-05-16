import Vue from 'vue'

import AV from 'leancloud-storage' 

var APP_ID = 'RsCkEEr3iYDb1AM9M8d2mHhS-gzGzoHsz';  //leancould身份秘钥
var APP_KEY = 'FQURk1V4kTmklYV5rlkdfnF6';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    actionType: 'signUp',  //切换界面，默认显示注册界面
    formData:{
      username:'',
      password:''
    },
    currentUser:null  //令当前用户为空
  },
  methods: {
    addTodo: function(){  //增加代办事项
      this.todoList.push({
        title:this.newTodo,
        createdAt: new Date(),
        done: false  //事项状态
      })
      this.newTodo = '' //添加事项之后，令输入框为空
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo)
      console.log(index)
      this.todoList.splice(index,1)
    },
    signUp: function(){
      let user = new AV.User() //AV.User 是用来描述一个用户的特殊对象
      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password)
      user.signUp().then((loginedUser)=>{
        this.currentUser = this.getCurrentUser()
      },(error)=>{
        alert('注册失败')
      })
    },
    login: function(){
      AV.User.logIn(this.formData.username,this.formData.password).then((loginedUser)=>{
        this.currentUser = this.getCurrentUser()
      },function (error) {
        alert('登录失败')
      })
    },
    logout: function(){
      AV.User.logOut()
      this.currentUser = AV.User.current() //登出后，SDK自动清除数据
      window.location.reload() //刷新页面，清除输入框的用户名和密码
    },
    getCurrentUser: function(){
      let current = AV.User.current() //AV.User.current()判断当前用户状态
      if(current){
        let {id,createdAt,attributes:{username}} = current
        return {id, username, createdAt}
      }else{
        return null
      }
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

      this.currentUser = this.getCurrentUser() //检查用户是否登录
  }
  

}) 