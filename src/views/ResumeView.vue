<template>
  <div class="resume-view">
    <h2>简历管理</h2>
    <div class="resume-upload">
      <h3>上传简历</h3>
      <div class="upload-area" @drop="handleDrop" @dragover.prevent>
        <input type="file" id="resumeFile" ref="fileInput" @change="handleFileChange" accept=".pdf,.doc,.docx" />
        <label for="resumeFile" class="upload-label">
          <div class="upload-icon">📄</div>
          <p>点击或拖拽文件到此处上传</p>
          <p class="upload-hint">支持 PDF、DOC、DOCX 格式</p>
        </label>
      </div>
      <div class="file-info" v-if="selectedFile">
        <span>{{ selectedFile.name }}</span>
        <button class="upload-btn" @click="uploadFile">确认上传</button>
      </div>
    </div>
    <div class="resume-list" v-if="resumes.length > 0">
      <h3>我的简历</h3>
      <div class="resume-items">
        <div class="resume-item" v-for="resume in resumes" :key="resume.id">
          <div class="resume-info">
            <h4 class="resume-name">{{ resume.name }}</h4>
            <span class="resume-size">{{ resume.size }}</span>
            <span class="resume-time">{{ resume.uploadTime }}</span>
          </div>
          <div class="resume-actions">
            <button class="view-btn" @click="viewResume(resume.id)">查看</button>
            <button class="download-btn" @click="downloadResume(resume.id)">下载</button>
            <button class="delete-btn" @click="deleteResume(resume.id)">删除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const resumes = ref([
  {
    id: 1,
    name: '个人简历.pdf',
    size: '2.3MB',
    uploadTime: '2026-02-01 10:30',
  },
  {
    id: 2,
    name: '前端开发简历.docx',
    size: '1.8MB',
    uploadTime: '2026-02-02 14:20',
  },
])

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  if (e.dataTransfer?.files.length) {
    const file = e.dataTransfer.files[0]
    if (file) {
      selectedFile.value = file
    }
  }
}

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]
    if (file) {
      selectedFile.value = file
    }
  }
}

const uploadFile = () => {
  if (selectedFile.value) {
    // 模拟上传
    const newResume = {
      id: resumes.value.length + 1,
      name: selectedFile.value.name,
      size: `${(selectedFile.value.size / 1024 / 1024).toFixed(1)}MB`,
      uploadTime: new Date().toLocaleString('zh-CN'),
    }
    resumes.value.push(newResume)
    selectedFile.value = null
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  }
}

const viewResume = (id: number) => {
  console.log('查看简历，ID:', id)
}

const downloadResume = (id: number) => {
  console.log('下载简历，ID:', id)
}

const deleteResume = (id: number) => {
  resumes.value = resumes.value.filter(resume => resume.id !== id)
}
</script>

<style scoped>
.resume-view {
  padding: 20px;
  width: 100%;
}

h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.resume-upload {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.resume-upload h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.upload-area {
  position: relative;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-area:hover {
  border-color: #409eff;
  background-color: #ecf5ff;
}

#resumeFile {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-label p {
  margin: 5px 0;
  color: #666;
}

.upload-hint {
  font-size: 12px;
  color: #909399;
}

.file-info {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  border: 1px solid #e4e7ed;
}

.upload-btn {
  padding: 5px 15px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #66b1ff;
}

.resume-list {
  margin-top: 30px;
}

.resume-list h3 {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}

.resume-items {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.resume-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  transition: box-shadow 0.3s;
}

.resume-item:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.resume-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.resume-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.resume-size,
.resume-time {
  font-size: 14px;
  color: #909399;
}

.resume-actions {
  display: flex;
  gap: 10px;
}

.view-btn,
.download-btn,
.delete-btn {
  padding: 5px 15px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.view-btn:hover {
  border-color: #409eff;
  color: #409eff;
}

.download-btn:hover {
  border-color: #67c23a;
  color: #67c23a;
}

.delete-btn:hover {
  border-color: #f56c6c;
  color: #f56c6c;
}
</style>