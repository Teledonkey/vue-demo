<template>
  <div>
    <h3>div默认是垂直方向排列的</h3>
    <div style="background-color: #d0d0d0; height: 250px">
      <div style="background-color: #d9006c; height: 50px; width: 50px">1</div>
      <div style="background-color: #ffff00; height: 50px; width: 50px">2</div>
      <div style="background-color: #00ffcc; height: 50px; width: 50px">3</div>
      <div style="background-color: #00bfff; height: 50px; width: 50px">4</div>
    </div>

    <h3>div变成盒子模型</h3>
    <div style="background-color: #d0d0d0; height: 250px;display: flex;">
      <div style="background-color: #d9006c; height: 50px; width: 50px">1</div>
      <div style="background-color: #ffff00; height: 50px; width: 50px">2</div>
      <div style="background-color: #00ffcc; height: 50px; width: 50px">3</div>
      <div style="background-color: #00bfff; height: 50px; width: 50px">4</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>