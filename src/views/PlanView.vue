<template>
  <div class="plan-view">
    <h2>职业规划</h2>
    <div class="plan-container">
      <div class="plan-form">
        <h3>个人信息</h3>
        <div class="form-item">
          <label for="currentPosition">当前职位</label>
          <input
            type="text"
            id="currentPosition"
            v-model="currentPosition"
            placeholder="例如：前端开发工程师"
          />
        </div>
        <div class="form-item">
          <label for="workYears">工作年限</label>
          <input
            type="number"
            id="workYears"
            v-model.number="workYears"
            min="0"
            max="50"
            placeholder="例如：3"
          />
        </div>
        <div class="form-item">
          <label for="education">学历</label>
          <select id="education" v-model="education">
            <option value="">请选择</option>
            <option value="高中及以下">高中及以下</option>
            <option value="大专">大专</option>
            <option value="本科">本科</option>
            <option value="硕士">硕士</option>
            <option value="博士">博士</option>
          </select>
        </div>
        <div class="form-item">
          <label for="industry">行业</label>
          <input type="text" id="industry" v-model="industry" placeholder="例如：互联网" />
        </div>
        <button class="generate-btn" @click="generatePlan">生成职业规划</button>
      </div>
      <div class="plan-result" v-if="planResult">
        <h3>职业规划建议</h3>
        <div class="plan-content">
          <div class="plan-section">
            <h4 class="section-title">短期规划（1-2年）</h4>
            <p class="section-content">{{ planResult.shortTerm }}</p>
          </div>
          <div class="plan-section">
            <h4 class="section-title">中期规划（3-5年）</h4>
            <p class="section-content">{{ planResult.mediumTerm }}</p>
          </div>
          <div class="plan-section">
            <h4 class="section-title">长期规划（5年以上）</h4>
            <p class="section-content">{{ planResult.longTerm }}</p>
          </div>
          <div class="plan-section">
            <h4 class="section-title">技能提升建议</h4>
            <ul class="skill-list">
              <li v-for="(skill, index) in planResult.skills" :key="index">{{ skill }}</li>
            </ul>
          </div>
          <div class="plan-section">
            <h4 class="section-title">薪资预测</h4>
            <p class="section-content">{{ planResult.salaryPrediction }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPosition = ref('前端开发工程师')
const workYears = ref(3)
const education = ref('本科')
const industry = ref('互联网')
interface PlanResult {
  shortTerm: string
  mediumTerm: string
  longTerm: string
  skills: string[]
  salaryPrediction: string
}

const planResult = ref<PlanResult | null>(null)

const generatePlan = () => {
  // 模拟生成职业规划
  setTimeout(() => {
    planResult.value = {
      shortTerm:
        '1. 掌握前端主流框架（Vue 3、React 18）的高级特性\n2. 学习前端工程化工具（Webpack、Vite、ESLint）\n3. 提升代码质量，学习TypeScript\n4. 参与中大型项目，积累项目经验',
      mediumTerm:
        '1. 成为前端技术专家，掌握前端架构设计\n2. 学习后端技术（Node.js、Express），成为全栈工程师\n3. 参与技术团队管理，培养领导力\n4. 积累行业经验，了解业务逻辑',
      longTerm:
        '1. 成为技术总监或架构师\n2. 主导大型项目的技术选型和架构设计\n3. 培养技术团队，传承技术经验\n4. 关注行业趋势，引领技术创新',
      skills: [
        '深入学习JavaScript/TypeScript',
        '掌握前端性能优化技术',
        '学习前端安全知识',
        '了解后端技术栈',
        '提升沟通协作能力',
      ],
      salaryPrediction:
        '根据当前市场行情，1-2年后薪资预计达到25-35K，3-5年后达到35-50K，5年以上达到50K以上。',
    }
  }, 2000)
}
</script>

<style scoped>
.plan-view {
  padding: 20px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.plan-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.plan-form {
  flex: 1;
  min-width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.plan-form h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.form-item {
  margin-bottom: 15px;
}

.form-item label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.form-item input,
.form-item select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
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
  margin-top: 20px;
}

.generate-btn:hover {
  background-color: #66b1ff;
}

.plan-result {
  flex: 1;
  min-width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.plan-result h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.plan-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.plan-section {
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.section-content {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  white-space: pre-wrap;
}

.skill-list {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  padding-left: 20px;
}

.skill-list li {
  margin-bottom: 5px;
}
</style>
