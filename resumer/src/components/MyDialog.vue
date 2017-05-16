<template>
   <div class="dialogWrapper" v-show="visible">
     <div class="dialog">
       <header>{{title}}
         <span class="close" @click="close">X</span>
       </header>
       <main>
         <slot></slot>  <!--在父组件的子组件模板的地方里默认内容，放到子组件的slot槽内-->
       </main>
     </div>
   </div>
 
 </template>
 
 <script>
   export default {
     name: 'MyDialog',
     props: ['title', 'visible'], //父组件的数据
     methods: {
       close(){
         this.$emit('close') //触发父组件的自定义事件
       }
     }
   }
 </script>
 
 <style scoped lang="scss">
   .dialogWrapper{
     position: fixed;
     background: hsla(0, 0%,0%,0.25);
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     margin: 0;
     display: flex;
     justify-content: center;
     align-items: center;
   }
   .dialog{
     background: white;
     min-height: 4em;
     min-width: 10em;
     > header{
       padding: 16px;
       display: flex;
       justify-content: space-between;
     }
     > main{
       padding: 16px;
     }
   }
 </style>