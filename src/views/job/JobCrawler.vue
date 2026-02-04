<template>
  <div class="job-crawler">
    <h2>岗位爬虫</h2>
    <div class="crawler-form">
      <div class="form-item">
        <label for="keyword">关键词</label>
        <input type="text" id="keyword" v-model="keyword" placeholder="例如：前端开发" />
      </div>
      <div class="form-item">
        <label for="city">城市</label>
        <input type="text" id="city" v-model="city" placeholder="例如：北京" />
      </div>
      <div class="form-item">
        <label for="page">页数</label>
        <input type="number" id="page" v-model.number="page" min="1" max="50" />
      </div>
      <button class="crawl-btn" @click="startCrawl">开始爬取</button>
    </div>
    <div class="crawl-result" v-if="result">
      <h3>爬取结果</h3>
      <div class="result-item">
        <span>成功爬取岗位数：{{ result.successCount }}</span>
      </div>
      <div class="result-item">
        <span>失败数：{{ result.failedCount }}</span>
      </div>
      <div class="result-item" v-if="result.message">
        <span>消息：{{ result.message }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('前端开发')
const city = ref('北京')
const page = ref(5)
interface CrawlResult {
  successCount: number
  failedCount: number
  message?: string
}
const result = ref<CrawlResult | null>(null)

const startCrawl = () => {
  // 模拟爬取过程
  setTimeout(() => {
    result.value = {
      successCount: 23,
      failedCount: 2,
      message: '爬取完成',
    }
  }, 2000)
}
</script>

<style scoped>
.job-crawler {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.crawler-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 600px;
}

.form-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-item label {
  width: 80px;
  font-weight: 500;
  color: #666;
}

.form-item input {
  flex: 1;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.crawl-btn {
  width: 120px;
  padding: 10px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.crawl-btn:hover {
  background-color: #66b1ff;
}

.crawl-result {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
}

.crawl-result h3 {
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.result-item {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}
</style>
