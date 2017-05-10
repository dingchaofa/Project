<template>
    <div id="topbar">
        <div class="wrapper">
        <span class="logo">Resumer</span>
        <div class="actions">
        <button class="primary">保存</button>
        <button>预览</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'Topbar'
    }
</script>

<style scoped lang="scss">
    #topbar {
        color: green;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);
        
        padding: 0 16px;
    >.wrapper {
        height:64px;
        margin:0 auto;
    }
    >.wrapper {
        display: flex;
        justify-content:space-between;
        align-items: center;
    }
    .logo {
        font-size: 24px;
        color: #000;
    }
    }
    button {
        width: 72px;
        height: 32px;
        border: none;
        cursor: pointer;
        font-size: 18px;
        background: #ddd;
        color: #222;
        &:hover {
            box-shadow: 1px 1px 1px hsla(0,0,0,0.5)
        }
        &.primary{
            background: #02af5f;
            color: white;
        }
    }
</style>