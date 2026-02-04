<template>
  <div class="job-detail">
    <div class="detail-header">
      <h2>岗位详情</h2>
      <a href="#" class="back-link" @click.prevent="goBack" title="返回上一页"> ← 返回 </a>
    </div>
    <div class="job-card">
      <div class="job-header">
        <h3 class="job-title">{{ job.title }}</h3>
        <span class="job-salary">{{ job.salary }}</span>
      </div>
      <div class="job-info">
        <span class="company">{{ job.company }}</span>
        <span class="city">{{ job.city }}</span>
        <span class="experience">{{ job.experience }}</span>
        <span class="education">{{ job.education }}</span>
        <span class="type">{{ job.type }}</span>
      </div>
      <div class="job-section">
        <h4>岗位描述</h4>
        <div class="job-description">
          {{ job.description }}
        </div>
      </div>
      <div class="job-section">
        <h4>任职要求</h4>
        <div class="job-requirements">
          {{ job.requirements }}
        </div>
      </div>
      <div class="job-section">
        <h4>公司信息</h4>
        <div class="company-info">
          <div class="info-item">
            <span class="label">公司规模：</span>
            <span class="value">{{ job.companySize }}</span>
          </div>
          <div class="info-item">
            <span class="label">行业：</span>
            <span class="value">{{ job.industry }}</span>
          </div>
          <div class="info-item">
            <span class="label">公司性质：</span>
            <span class="value">{{ job.companyType }}</span>
          </div>
          <div class="info-item">
            <span class="label">公司简介：</span>
            <span class="value">{{ job.companyIntro }}</span>
          </div>
        </div>
      </div>
      <div class="job-footer">
        <span class="publish-time">发布时间：{{ job.publishTime }}</span>
        <div class="action-buttons">
          <button class="target-btn" @click="setAsTarget">设为目标</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const job = ref({
  id: 1,
  title: '前端开发工程师',
  salary: '15-25K',
  company: '字节跳动',
  city: '北京',
  experience: '3-5年',
  education: '本科',
  type: '全职',
  description:
    '1. 负责公司核心产品的前端开发和维护\n2. 参与产品需求讨论和技术方案设计\n3. 优化前端性能，提升用户体验\n4. 与后端工程师协作，完成前后端联调\n5. 持续学习和探索前端新技术',
  requirements:
    '1. 本科及以上学历，计算机相关专业\n2. 3年以上前端开发经验\n3. 熟悉Vue、React等前端框架\n4. 熟悉HTML5、CSS3、JavaScript等前端技术\n5. 了解前端工程化，熟悉webpack等构建工具\n6. 良好的代码风格和团队协作能力',
  companySize: '10000人以上',
  industry: '互联网',
  companyType: '民营企业',
  companyIntro:
    '字节跳动成立于2012年3月，是全球领先的内容平台，旗下拥有抖音、今日头条等知名产品。公司致力于通过技术创新为用户创造价值。',
  publishTime: '2026-02-03',
})

onMounted(() => {
  const id = route.params.id
  console.log('获取岗位详情，ID:', id)
  // 模拟获取岗位详情
})

const setAsTarget = () => {
  // 设置为目标岗位
  console.log('设置为目标岗位，ID:', job.value.id)
  // 这里可以添加设置为目标岗位的逻辑
}

const goBack = () => {
  // 返回上一页
  window.history.back()
}
</script>

<style scoped>
.job-detail {
  padding: 20px;
}

.detail-header {
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

.job-card {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 20px;
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.job-salary {
  font-size: 18px;
  font-weight: bold;
  color: #f56c6c;
}

.job-info {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.job-section {
  margin-bottom: 20px;
}

.job-section h4 {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.job-description,
.job-requirements {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  white-space: pre-wrap;
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-item {
  font-size: 14px;
}

.info-item .label {
  font-weight: bold;
  color: #333;
}

.info-item .value {
  color: #666;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e4e7ed;
}

.publish-time {
  font-size: 14px;
  color: #909399;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.target-btn {
  padding: 10px 20px;
  border: 1px solid #67c23a;
  border-radius: 4px;
  background-color: white;
  color: #67c23a;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.target-btn:hover {
  background-color: #67c23a;
  color: white;
}
</style>
