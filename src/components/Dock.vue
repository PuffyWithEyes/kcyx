<template>
    <div class="dock">
      <input v-model="newPostText" type="text" placeholder="Ваш текст..." class="dock-input" />
      <label for="file-upload" class="file-label">
        <input id="file-upload" type="file" @change="handleFileUpload" class="file-input" />
        <span>Добавить собачку</span>
      </label>
      <button @click="createPost" class="create-button">Опубликовать пост</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Dock',
    data() {
      return {
        newPostText: '',
        selectedFile: null as File | null,
      };
    },
    methods: {
      handleFileUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
          this.selectedFile = input.files[0];
        }
      },
      createPost() {
        if (this.newPostText || this.selectedFile) {
          const newPost = {
            type: this.selectedFile ? 'image' : 'text',
            src: this.selectedFile ? URL.createObjectURL(this.selectedFile) : '',
            alt: this.selectedFile ? 'New Image' : '',
            content: this.newPostText,
          };
          this.$emit('create-post', newPost);
          this.newPostText = '';
          this.selectedFile = null;
        }
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
    align-items: center;
    justify-content: space-between;
    z-index: 1000;
    border-radius: 15px; /* Закругления */
  }
  
  .dock-input {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #C79ECF;
    border-radius: 5px;
    margin-right: 10px;
    background-color: #F0F8FF;
  }
  
  .file-input {
    display: none;
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
    margin-right: 10px;
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
  