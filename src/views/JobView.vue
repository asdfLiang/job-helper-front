<template>
  <div class="job-view">
    <h1>岗位管理</h1>
    <div class="job-nav">
      <router-link to="/job/crawler" class="nav-item">岗位爬虫</router-link>
      <router-link to="/job/list" class="nav-item">岗位列表</router-link>
      <router-link to="/job/target" class="nav-item">目标岗位</router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.job-view {
  padding: 20px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.job-nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
}

.nav-item {
  padding: 10px 20px;
  text-decoration: none;
  color: #666;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s;
}

.nav-item:hover {
  color: #409eff;
  background-color: #f5f7fa;
}

.nav-item.router-link-active {
  color: #409eff;
  border-bottom: 2px solid #409eff;
  font-weight: bold;
}
</style>