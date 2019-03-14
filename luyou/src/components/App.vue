<template>
  <el-container>
    <el-aside width="200px">
      <sub-nav></sub-nav>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import subNav from './SubNav'
export default {
  name: 'App',
  components: {
    subNav
  }
}
</script>

<style>
.el-container{
  height: 100%;
}
</style>
