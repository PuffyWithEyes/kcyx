<template>
  <div class="dock">
    <div class="preview-container" ref="previewContainer">
      <div v-for="(item, index) in previewItems" :key="index" class="preview-item">
        <img v-if="item.type === 'image'" :src="item.src" alt="Image" class="preview-image" />
        <p v-else class="preview-text">{{ item.content }}</p>
      </div>
    </div>
    <div class="input-container">
      <input
        v-model="newPostText"
        type="text"
        placeholder="Ваш текст..."
        class="dock-input"
        @keyup.enter="addTextItem"
      />
    </div>
    <div class="button-container">
      <button @click="insertDogImage" class="file-label">
        <span>Вставить собачку</span>
      </button>
      <button @click="createPost" class="create-button">Опубликовать пост</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { PostItem } from '../types';

export default defineComponent({
  name: 'Dock',
  data() {
    return {
      newPostText: '',
      selectedFile: null as File | null,
      previewItems: [] as PostItem[],
    };
  },
  mounted() {
    this.scrollToBottom();
  },
  updated() {
    this.scrollToBottom();
  },
  methods: {
    addTextItem() {
      if (this.newPostText.trim()) {
        this.previewItems.push({
          type: 'text',
          content: this.newPostText,
        });
        this.newPostText = '';
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      }
    },
    insertDogImage() {
      const dogImageSrc = '/src/assets/dog.png';
      this.previewItems.push({
        type: 'image',
        src: dogImageSrc,
      });
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    createPost() {
      if (this.previewItems.length > 0) {
        this.$emit('create-post', this.previewItems);
        this.previewItems = [];
      }
    },
    scrollToBottom() {
      const previewContainer = this.$refs.previewContainer as HTMLElement;
      previewContainer.scrollTop = previewContainer.scrollHeight;
    },
  },
});
</script>

<style scoped>
.dock {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 33.33%); /* Отступы по краям примерно 1/3 экрана */
  background-color: #F0F8FF;
  border-top: 1px solid #C79ECF;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;
  border-radius: 15px; /* Закругления */
}

.preview-container {
  width: 100%;
  max-height: 200px; /* Максимальная высота */
  overflow-y: auto; /* Прокрутка */
  margin-bottom: 10px;
  border: 1px solid #C79ECF;
  border-radius: 5px;
  background-color: #F0F8FF;
  padding: 10px;
}

.preview-item {
  width: 100%;
  margin-bottom: 5px;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  display: block;
  margin: 0 auto; /* Центрирование изображения */
}

.preview-text {
  background-color: #C79ECF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 100%; /* Ширина текста */
}

.input-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.dock-input {
  width: calc(100% - 220px); /* Ширина ввода текста */
  padding: 10px;
  border: 1px solid #C79ECF;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #F0F8FF;
  outline: none; /* Убираем контур при фокусе */
  min-height: 40px; /* Минимальная высота */
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #7E6BC4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 40px; /* Высота кнопки */
}

.file-label:hover {
  background-color: #5A4A82;
}

.create-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #7E6BC4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 40px; /* Высота кнопки */
}

.create-button:hover {
  background-color: #5A4A82;
}
</style>
