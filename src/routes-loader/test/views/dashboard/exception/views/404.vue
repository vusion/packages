<template functional>
    <div :class="$style.root">
        <u-text style="font-size:64px;">404</u-text>
        <br>
        <u-text size="large" color="error">抱歉，你访问的页面不存在。</u-text>
        <br><br>
        <u-button to="/overview" color="primary">返回首页</u-button>
    </div>
</template>
<style module>
.root {
    margin-top: 200px;
    text-align: center;
}
</style>
