<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <div class="app-wrapper">
      <aside class="app-sidebar">
        <div class="sidebar-header">
          <h1 class="app-title">求职助手</h1>
        </div>
        <nav class="app-nav">
          <RouterLink to="/" class="nav-item">首页</RouterLink>
          <RouterLink to="/job/list" class="nav-item">岗位管理</RouterLink>
          <RouterLink to="/resume" class="nav-item">简历管理</RouterLink>
          <RouterLink to="/plan" class="nav-item">职业规划</RouterLink>
        </nav>
      </aside>
      <div class="main-container">
        <main class="app-main">
          <RouterView />
        </main>
        <footer class="app-footer">
          <p>© 2026 求职助手 | 帮助你找到理想的工作</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
}

.app-wrapper {
  display: flex;
  flex: 1;
  width: 100%;
}

.app-sidebar {
  width: 200px;
  background-color: #409eff;
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  position: sticky;
  top: 0;
  height: 100vh;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  min-width: 1000px;
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-title {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.app-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.app-main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.app-footer {
  background-color: #f5f7fa;
  color: #606266;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #e4e7ed;
  margin-top: auto;
  width: 100%;
  box-sizing: border-box;
}

/* 固定PC端布局，不做移动端适配 */
</style>
