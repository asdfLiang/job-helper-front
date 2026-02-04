<template>
  <div class="job-list">
    <h2>岗位列表</h2>
    <div class="search-bar">
      <input type="text" v-model="searchKeyword" placeholder="搜索岗位关键词" />
      <select v-model="searchCity">
        <option value="">全部城市</option>
        <option value="北京">北京</option>
        <option value="上海">上海</option>
        <option value="广州">广州</option>
        <option value="深圳">深圳</option>
        <option value="杭州">杭州</option>
      </select>
      <button class="search-btn" @click="searchJobs">搜索</button>
    </div>
    <div class="job-items">
      <div class="job-item" v-for="job in jobs" :key="job.id">
        <div class="job-header">
          <h3 class="job-title">{{ job.title }}</h3>
          <span class="job-salary">{{ job.salary }}</span>
        </div>
        <div class="job-info">
          <span class="company">{{ job.company }}</span>
          <span class="city">{{ job.city }}</span>
          <span class="experience">{{ job.experience }}</span>
          <span class="education">{{ job.education }}</span>
        </div>
        <div class="job-desc">
          {{ job.description }}
        </div>
        <div class="job-footer">
          <span class="publish-time">{{ job.publishTime }}</span>
          <div class="job-actions">
            <router-link :to="`/job/detail/${job.id}`" class="detail-link">查看详情</router-link>
            <button class="delete-btn" @click="showDeleteConfirm(job.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination" v-if="total > 10">
      <button class="prev-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
      <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
      <button class="next-btn" @click="nextPage" :disabled="currentPage === totalPages">
        下一页
      </button>
    </div>

    <!-- 删除确认弹窗 -->
    <div class="delete-modal" v-if="showDeleteModal">
      <div class="modal-content">
        <h4>确认删除</h4>
        <p>您确定要删除这个岗位吗？此操作不可恢复。</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="cancelDelete">取消</button>
          <button class="confirm-btn" @click="confirmDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchKeyword = ref('')
const searchCity = ref('')
const currentPage = ref(1)
const total = ref(23)
const showDeleteModal = ref(false)
const currentDeleteJobId = ref<number | null>(null)

const totalPages = computed(() => {
  return Math.ceil(total.value / 10)
})

const jobs = ref([
  {
    id: 1,
    title: '前端开发工程师',
    salary: '15-25K',
    company: '字节跳动',
    city: '北京',
    experience: '3-5年',
    education: '本科',
    description: '负责公司产品的前端开发，使用Vue、React等技术栈',
    publishTime: '2026-02-03',
  },
  {
    id: 2,
    title: '高级前端开发工程师',
    salary: '25-35K',
    company: '阿里巴巴',
    city: '杭州',
    experience: '5-10年',
    education: '本科及以上',
    description: '负责前端架构设计和技术选型，带领团队完成项目',
    publishTime: '2026-02-02',
  },
  {
    id: 3,
    title: '前端开发实习生',
    salary: '3-5K',
    company: '腾讯',
    city: '深圳',
    experience: '不限',
    education: '本科',
    description: '协助前端团队完成开发任务，学习前端技术栈',
    publishTime: '2026-02-01',
  },
])

const searchJobs = () => {
  // 模拟搜索
  console.log('搜索关键词:', searchKeyword.value)
  console.log('搜索城市:', searchCity.value)
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// 删除确认相关方法
const showDeleteConfirm = (jobId: number) => {
  currentDeleteJobId.value = jobId
  showDeleteModal.value = true
}

const cancelDelete = () => {
  showDeleteModal.value = false
  currentDeleteJobId.value = null
}

const confirmDelete = () => {
  if (currentDeleteJobId.value) {
    // 从jobs数组中删除对应的岗位
    const index = jobs.value.findIndex((job) => job.id === currentDeleteJobId.value)
    if (index !== -1) {
      jobs.value.splice(index, 1)
      total.value--
      console.log('删除岗位，ID:', currentDeleteJobId.value)
    }
    showDeleteModal.value = false
    currentDeleteJobId.value = null
  }
}
</script>

<style scoped>
.job-list {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.search-bar input,
.search-bar select {
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar input {
  flex: 1;
  min-width: 200px;
}

.search-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #66b1ff;
}

.job-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.job-item {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: box-shadow 0.3s;
}

.job-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.job-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.job-salary {
  font-size: 16px;
  font-weight: bold;
  color: #f56c6c;
}

.job-info {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.job-desc {
  font-size: 14px;
  color: #909399;
  margin-bottom: 10px;
  line-height: 1.5;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #909399;
}

.publish-time {
  font-size: 12px;
}

.job-actions {
  display: flex;
  gap: 10px;
}

.detail-link {
  color: #409eff;
  text-decoration: none;
  transition: color 0.3s;
  padding: 6px 12px;
  border-radius: 4px;
}

.detail-link:hover {
  color: #66b1ff;
  background-color: #ecf5ff;
}

.delete-btn {
  padding: 6px 12px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #f78989;
}

/* 删除确认弹窗样式 */
.delete-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.modal-content h4 {
  margin-bottom: 15px;
  font-size: 16px;
  color: #333;
}

.modal-content p {
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  padding: 8px 16px;
  background-color: #fff;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.cancel-btn:hover {
  border-color: #c6e2ff;
  color: #409eff;
}

.confirm-btn {
  padding: 8px 16px;
  background-color: #f56c6c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.confirm-btn:hover {
  background-color: #f78989;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.prev-btn,
.next-btn {
  padding: 5px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.prev-btn:hover:not(:disabled),
.next-btn:hover:not(:disabled) {
  border-color: #409eff;
  color: #409eff;
}

.prev-btn:disabled,
.next-btn:disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}

.page-info {
  font-size: 14px;
  color: #666;
}
</style>
