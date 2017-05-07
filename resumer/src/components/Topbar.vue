<template>
    <div id="topbar">
        <div class="logo">
        <span>Resumer</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Topbar'
    }
</script>

<style>
    #topbar {
        color: green;
        background: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.5);
        height:64px;
        padding: 0 16px;
    }
    #topbar .logo {
        font-family:STHeitiSC-Light;
        font-size:24px;
        color:#000;
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 30px;
    }
</style>