<template>
  <div class="match-view">
    <h2>岗位匹配</h2>
    <div class="match-container">
      <div class="chat-section">
        <h3>与大模型对话</h3>
        <div class="chat-messages">
          <div class="message system-message">
            <div class="message-content">
              你好！我是你的求职助手。请告诉我你的求职需求，我会结合你的简历为你匹配合适的岗位。
            </div>
          </div>
          <div class="message user-message" v-for="msg in userMessages" :key="msg.id">
            <div class="message-content">
              {{ msg.content }}
            </div>
          </div>
          <div class="message ai-message" v-for="msg in aiMessages" :key="msg.id">
            <div class="message-content">
              {{ msg.content }}
            </div>
          </div>
        </div>
        <div class="chat-input">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="输入你的求职需求..."
            @keyup.enter="sendMessage"
          />
          <button class="send-btn" @click="sendMessage">发送</button>
        </div>
      </div>
      <div class="match-result" v-if="matches.length > 0">
        <h3>匹配结果</h3>
        <div class="match-items">
          <div class="match-item" v-for="match in matches" :key="match.id">
            <div class="match-header">
              <h4 class="match-title">{{ match.jobTitle }}</h4>
              <span class="match-score">匹配度：{{ match.score }}%</span>
            </div>
            <div class="match-info">
              <span class="company">{{ match.company }}</span>
              <span class="salary">{{ match.salary }}</span>
              <span class="city">{{ match.city }}</span>
            </div>
            <div class="match-reason">
              <h5>匹配原因</h5>
              <p>{{ match.reason }}</p>
            </div>
            <div class="match-actions">
              <router-link :to="`/job/detail/${match.jobId}`" class="detail-link"
                >查看岗位详情</router-link
              >
              <router-link :to="`/optimize?jobId=${match.jobId}`" class="optimize-link"
                >优化简历</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputMessage = ref('')
const userMessages = ref<Message[]>([])
interface Message {
  id: number
  content: string
}
const aiMessages = ref<Message[]>([])
interface Match {
  id: number
  jobId: number
  jobTitle: string
  company: string
  salary: string
  city: string
  score: number
  reason: string
}

const matches = ref<Match[]>([])

const sendMessage = () => {
  if (!inputMessage.value.trim()) return

  // 添加用户消息
  userMessages.value.push({
    id: Date.now(),
    content: inputMessage.value,
  })

  // 模拟AI回复
  setTimeout(() => {
    aiMessages.value.push({
      id: Date.now() + 1,
      content: '正在分析你的需求，为你匹配合适的岗位...',
    })

    // 模拟匹配结果
    setTimeout(() => {
      matches.value = [
        {
          id: 1,
          jobId: 1,
          jobTitle: '前端开发工程师',
          company: '字节跳动',
          salary: '15-25K',
          city: '北京',
          score: 92,
          reason: '你的技术栈与岗位要求高度匹配，具有相关项目经验',
        },
        {
          id: 2,
          jobId: 2,
          jobTitle: '高级前端开发工程师',
          company: '阿里巴巴',
          salary: '25-35K',
          city: '杭州',
          score: 85,
          reason: '你的经验和技能符合岗位要求，有一定的晋升空间',
        },
        {
          id: 3,
          jobId: 3,
          jobTitle: '前端开发实习生',
          company: '腾讯',
          salary: '3-5K',
          city: '深圳',
          score: 78,
          reason: '适合作为实习岗位，能够积累相关经验',
        },
      ]
    }, 2000)
  }, 1000)

  inputMessage.value = ''
}
</script>

<style scoped>
.match-view {
  padding: 20px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.match-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.chat-section {
  flex: 1;
  min-width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.chat-section h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.chat-messages {
  height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 18px;
}

.system-message {
  align-self: center;
  background-color: #e0e0e0;
  font-size: 14px;
  color: #666;
}

.user-message {
  align-self: flex-end;
  background-color: #409eff;
  color: white;
}

.ai-message {
  align-self: flex-start;
  background-color: white;
  border: 1px solid #e4e7ed;
  color: #333;
}

.message-content {
  word-wrap: break-word;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  font-size: 14px;
}

.send-btn {
  padding: 10px 20px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #66b1ff;
}

.match-result {
  flex: 1;
  min-width: 300px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.match-result h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.match-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.match-item {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: box-shadow 0.3s;
}

.match-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.match-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.match-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.match-score {
  font-size: 14px;
  font-weight: bold;
  color: #67c23a;
}

.match-info {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.match-reason {
  margin-bottom: 15px;
}

.match-reason h5 {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.match-reason p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.match-actions {
  display: flex;
  gap: 10px;
}

.detail-link,
.optimize-link {
  padding: 8px 15px;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.3s;
}

.detail-link {
  background-color: #409eff;
  color: white;
}

.detail-link:hover {
  background-color: #66b1ff;
}

.optimize-link {
  background-color: #67c23a;
  color: white;
}

.optimize-link:hover {
  background-color: #85ce61;
}
</style>
