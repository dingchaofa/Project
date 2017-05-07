<template>
    <div class="page">
      <header>
        <Topbar/>
      </header>
      <main>
      <ResumeEditor/>
      <ResumePreview/>
      </main>
    </div>
</template>

<script>

import 'normalize.css/normalize.css'
import './assets/reset.css'

import Topbar from './components/Topbar'
import ResumeEditor from './components/ResumeEditor'
import ResumePreview from './components/ResumePreview'

export default {
  name: 'app',
  data: function() {
    return {
      text: '你好'
    }
  },
  components:{Topbar,ResumeEditor, ResumePreview}
}
</script>
  
<style>

  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .page>main {
    flex-grow:1;
  }
  .page>main {
    display:flex;
    justify-content:space-between;
    padding: 0 16px;
    margin-top: 16px;
    margin-bottom: 16px;
    width:95%;
    align-self: center;
  }
  #resumeEditor {
    width: 30%;
    background: #333;
  }
  #resumePreview {
    background: #777;
    flex-grow:1;
    margin-left:16px;
  }

</style>