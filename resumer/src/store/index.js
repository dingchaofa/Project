import Vuex from 'vuex'
import Vue from 'vue'

import objectPath from 'object-path'
    Vue.use(Vuex)

    export default new Vuex.Store({
        state: {
        selected: 'profile',
        user: {
            id: 'qwq',
            username: ''
        },
        resume:{
            config:[
                {field:'profile',icon:'id'},
                { field: 'workHistory', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' }
                ],
            profile:{
                name: '豹子头林冲',
                city: '梁山',
                title: '长枪在手，天下我有',
                birthday: '生卒年不详'
            },
            workHistory: [
            {company: '皇家禁军', content: '禁军教头'},
            {company: '水泊梁山', content: '六当家'},
        ],
            education: [
            { school: '东街私塾', content: '满腹经纶' },
            { school: '皇城武馆', content: '武林高手' },
        ],
            projects: [
            { name: '执掌禁军', content: '训练禁军' },
            { name: '火并王伦', content: '领导“梁山革命”，使梁山走向繁荣' },
        ],
            awards: [
            { name: '武林大会', content: '获得“豹子头”荣誉称号' },
            { name: '武举', content: '获得“禁军教头”最高称号' },
        ],
            contacts: [
            { contact: '书信', content: '送到梁山脚下' },
            { contact: '飞鸽', content: '飞到梁山一湖水' },
        ]
        }
    },
    mutations: {
        switchTab(state,payload){
            state.selected = payload
            localStorage.setItem('state',JSON.stringify(state))
        },
        updateResume(state,{path,value}){
            objectPath.set(state.resume,path,value)
            localStorage.setItem('state',JSON.stringify(state))
        },
        initState(state,payload){
            Object.assign(state,payload) 
            //ResumeEditor.vue中的resume()是从index.js中的state中读取的，
            //这个和保存在localStorage中的state是不一样的，而我们要获得localStorage的state中的内容。
            //通过Object.assign()方法，浅拷贝
        },
        setUser(state,payload){
            //console.log(payload,111)
            Object.assign(state.user,payload)
            //console.log(state.user,222)
        },
        removeUser(state){
            state.user.id = null
            // state.user.username = payload
            Object.assign(state.user,{
                'state.user.id': '',
                'state.user.username':''
            })
            localStorage.setItem('state',JSON.stringify(state))
        }
    }
    })