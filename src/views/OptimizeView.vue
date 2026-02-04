<template>
  <div class="optimize-view">
    <h2>目标岗位列表</h2>
    <div class="job-list" v-if="currentJobs.length > 0">
      <div class="job-items">
        <div class="job-item" v-for="job in currentJobs" :key="job.id">
          <div class="job-info">
            <h4 class="job-title">{{ job.title }}</h4>
            <div class="job-details">
              <span class="company">{{ job.company }}</span>
              <span class="salary">{{ job.salary }}</span>
              <span class="city">{{ job.city }}</span>
            </div>
          </div>
          <div class="job-actions">
            <button
              class="optimize-btn"
              @click="goToOptimizeDetail(job.id)"
              title="根据目标岗位进行简历优化"
            >
              优化简历
            </button>
          </div>
        </div>
      </div>
      <!-- 分页控件 -->
      <div class="pagination" v-if="total > pageSize">
        <button class="prev-btn" @click="prevPage" :disabled="currentPage === 1">上一页</button>
        <span class="page-info">第 {{ currentPage }} 页，共 {{ totalPages }} 页</span>
        <button class="next-btn" @click="nextPage" :disabled="currentPage === totalPages">
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const jobs = ref([
  {
    id: 1,
    title: '前端开发工程师',
    company: '字节跳动',
    salary: '15-25K',
    city: '北京',
  },
  {
    id: 2,
    title: '高级前端开发工程师',
    company: '阿里巴巴',
    salary: '25-35K',
    city: '杭州',
  },
  {
    id: 3,
    title: '前端开发实习生',
    company: '腾讯',
    salary: '3-5K',
    city: '深圳',
  },
  {
    id: 4,
    title: '全栈开发工程师',
    company: '美团',
    salary: '20-30K',
    city: '北京',
  },
  {
    id: 5,
    title: '前端架构师',
    company: '百度',
    salary: '35-50K',
    city: '北京',
  },
  {
    id: 6,
    title: 'React开发工程师',
    company: '京东',
    salary: '20-30K',
    city: '北京',
  },
  {
    id: 7,
    title: 'Vue开发工程师',
    company: '网易',
    salary: '18-28K',
    city: '杭州',
  },
  {
    id: 8,
    title: '前端开发工程师',
    company: '拼多多',
    salary: '20-35K',
    city: '上海',
  },
])

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(4)
const total = ref(jobs.value.length)

// 计算当前页的岗位数据
const currentJobs = ref(jobs.value.slice(0, pageSize.value))

const goToOptimizeDetail = (jobId: number) => {
  router.push({ path: '/job/target/detail', query: { jobId } })
}

// 分页方法
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    updateCurrentJobs()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    updateCurrentJobs()
  }
}

const totalPages = ref(Math.ceil(total.value / pageSize.value))

const updateCurrentJobs = () => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  currentJobs.value = jobs.value.slice(start, end)
}

onMounted(() => {
  // 初始化操作
})
</script>

<style scoped>
.optimize-view {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

/* 目标岗位列表样式 */
.job-list {
  margin-bottom: 30px;
}

.job-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.job-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: box-shadow 0.3s;
}

.job-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.job-info {
  flex: 1;
}

.job-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.job-details {
  display: flex;
  gap: 15px;
  font-size: 14px;
  color: #666;
}

.job-actions {
  display: flex;
  gap: 10px;
}

.optimize-btn {
  padding: 8px 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.optimize-btn:hover {
  background-color: #66b1ff;
}

/* 分页控件样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.prev-btn,
.next-btn {
  padding: 6px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
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
  border-color: #ebeef5;
}

.page-info {
  font-size: 14px;
  color: #666;
}
</style>
