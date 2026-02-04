<template>
  <div class="optimize-detail-view">
    <div class="header-container">
      <h2>简历优化详情</h2>
      <a href="#" class="back-link" @click.prevent="goBack" title="返回目标岗位列表"> ← 返回 </a>
    </div>
    <div class="job-info" v-if="selectedJob">
      <h3>目标岗位</h3>
      <div class="job-card">
        <h4 class="job-title">{{ selectedJob.title }}</h4>
        <div class="job-details">
          <span class="company">{{ selectedJob.company }}</span>
          <span class="salary">{{ selectedJob.salary }}</span>
          <span class="city">{{ selectedJob.city }}</span>
        </div>
      </div>
      <div class="optimize-section">
        <h3>简历优化建议</h3>
        <div class="optimize-suggestions">
          <div class="suggestion-item" v-for="(suggestion, index) in suggestions" :key="index">
            <h4 class="suggestion-title">{{ suggestion.title }}</h4>
            <p class="suggestion-content">{{ suggestion.content }}</p>
          </div>
        </div>
      </div>
      <button class="generate-btn" @click="generateOptimizedResume">生成优化简历</button>
    </div>
    <div class="optimized-resumes" v-if="optimizedResumes.length > 0">
      <h3>历史生成的简历</h3>
      <div class="optimized-items">
        <div class="optimized-item" v-for="resume in optimizedResumes" :key="resume.id">
          <div class="optimized-info">
            <h4>{{ resume.jobTitle }}</h4>
            <p>{{ resume.generateTime }}</p>
          </div>
          <div class="resume-actions">
            <button class="add-btn" @click="addToMyResumes(resume.id)" title="添加到我的简历">
              添加到我的简历
            </button>
            <button class="download-btn" @click="downloadResume(resume.id)" title="下载简历">
              下载
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

interface Job {
  id: number
  title: string
  company: string
  salary: string
  city: string
  experience?: string
  education?: string
  requirements?: string
}

interface OptimizedResume {
  id: number
  jobTitle: string
  company: string
  generateTime: string
  downloadUrl: string
}

const selectedJob = ref<Job | null>(null)

const suggestions = ref([
  {
    title: '技能匹配',
    content:
      '根据岗位要求，突出你在Vue、React等前端框架的经验，以及HTML5、CSS3、JavaScript等核心技术的掌握程度。',
  },
  {
    title: '项目经验',
    content: '重点描述你参与的前端项目，特别是使用Vue或React技术栈的项目，强调你的贡献和成果。',
  },
  {
    title: '工作经验',
    content:
      '详细描述你的前端开发工作经验，突出与岗位要求相关的技能和职责，如前端架构设计、性能优化等。',
  },
  {
    title: '教育背景',
    content: '如果你的学历符合要求，确保在简历中清晰展示你的计算机相关专业背景。',
  },
])

const optimizedResumes = ref<OptimizedResume[]>([
  {
    id: 1,
    jobTitle: '前端开发工程师',
    company: '字节跳动',
    generateTime: '2026-02-01 14:30',
    downloadUrl: '#',
  },
  {
    id: 2,
    jobTitle: '高级前端开发工程师',
    company: '阿里巴巴',
    generateTime: '2026-02-02 09:45',
    downloadUrl: '#',
  },
])

const goBack = () => {
  router.push('/job/target')
}

const generateOptimizedResume = () => {
  // 模拟生成优化简历
  setTimeout(() => {
    const newResume = {
      id: Date.now(),
      jobTitle: selectedJob.value?.title || '',
      company: selectedJob.value?.company || '',
      generateTime: new Date().toLocaleString('zh-CN'),
      downloadUrl: '#',
    }
    optimizedResumes.value.push(newResume)
  }, 2000)
}

const downloadResume = (id: number) => {
  console.log('下载简历，ID:', id)
  // 这里可以实现下载简历的逻辑
}

const addToMyResumes = (id: number) => {
  console.log('添加到我的简历，ID:', id)
  // 这里可以实现添加到我的简历的逻辑
}

onMounted(() => {
  const jobId = route.query.jobId
  if (jobId) {
    // 模拟根据jobId获取岗位信息
    selectedJob.value = {
      id: Number(jobId),
      title: '前端开发工程师',
      company: '字节跳动',
      salary: '15-25K',
      city: '北京',
      experience: '3-5年',
      education: '本科',
      requirements:
        '1. 本科及以上学历，计算机相关专业\n2. 3年以上前端开发经验\n3. 熟悉Vue、React等前端框架\n4. 熟悉HTML5、CSS3、JavaScript等前端技术\n5. 了解前端工程化，熟悉webpack等构建工具\n6. 良好的代码风格和团队协作能力',
    }
  }
})
</script>

<style scoped>
.optimize-detail-view {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.back-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.back-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.job-card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 20px;
  margin-bottom: 20px;
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

.optimize-section {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 20px;
  margin-bottom: 20px;
}

.optimize-suggestions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.suggestion-item {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
}

.suggestion-title {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.suggestion-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.generate-btn {
  padding: 12px 30px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-bottom: 30px;
}

.generate-btn:hover {
  background-color: #66b1ff;
}

.optimized-resumes {
  margin-top: 30px;
}

.optimized-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.optimized-item {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.optimized-info h4 {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.optimized-info p {
  font-size: 12px;
  color: #909399;
  margin: 0;
}

.resume-actions {
  display: flex;
  gap: 10px;
}

.add-btn {
  padding: 8px 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #66b1ff;
}

.download-btn {
  padding: 8px 15px;
  background-color: #67c23a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background-color: #85ce61;
}
</style>
