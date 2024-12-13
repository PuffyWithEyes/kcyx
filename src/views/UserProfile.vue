<template>
    <router-link to="/" class="back-button">&larr; Назад</router-link>
    <div class="user-profile">
      <div class="user-info">
        <img src="/src/assets/dog.png" alt="User Avatar" class="avatar" />
        <span class="username">{{ getUsername }}</span>
      </div>
      <div class="stats-container">
        <div class="stat">
          <span class="stat-label">Посты:</span>
          <span class="stat-value">{{ getUserPosts.length }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Лайки:</span>
          <span class="stat-value">{{ totalLikes }}</span>
        </div>
        <div class="stat">
          <span class="stat-label">Просмотры:</span>
          <span class="stat-value">{{ totalViews }}</span>
        </div>
      </div>
      <div class="container-posts">
        <Post
        v-for="(post, index) in getUserPosts"
        :key="index"
        :itemsList="post.itemsList"
        :userName="post.userName"
        :viewCount="post.viewCount"
        />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import Post from '../components/Post.vue';
  import type { Item } from '../types'
  import axios from 'axios';
  
  axios.defaults.baseURL = "http://25.31.195.44:8000/api";
  axios.defaults.withCredentials = true;

  export default defineComponent({
    name: 'UserProfile',
    props: {
      userData: {
        type: Array,
        required: true,
      },
      posts: {
        type: Array as PropType<typeof Post[]>,
        required: true,
      },
    },
    components: {
      Post,
    },
    computed: {
      totalLikes() {
        return this.getUserPosts.reduce((total, post) => total + (post.itemsList.filter(item => item.type === 'image').length || 0), 0);
      },
      totalViews() {
        return this.getUserPosts.reduce((total, post) => total + post.viewCount, 0);
      },
      getUsername() {
        return "puffy_with_eyes";
      },
      getUserPosts() {
        return [
          {
            itemsList: [
              { type: 'image', src: '/src/assets/dog.png', alt: 'Image 1' },
              { type: 'text', content: 'This is some text between images.' },
              { type: 'image', src: '/test/image copy.png', alt: 'Image 2' },
            ] as Item[],
            userName: this.getUsername,
            viewCount: 1,
          }
        ]
      },
    },
  });
  </script>
  
  <style scoped>
.container-posts {
  display: flex;
  flex-direction: column;
  align-items: 0px; /* Центрирование по горизонтали */
  padding: 20px; /* Отступы по краям */
  margin-top: 30px; /* Отступ сверху */
  margin-bottom: 30px;
}

.user-profile {
  padding: 20px;
  background-color: #F0F8FF;
  border-radius: 10px;
  width: 80%;
  margin: 20px auto;
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  top: 0;
  left: 0;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #7E6BC4;
}

.back-button:hover {
  color: #5A4A82;
}

.avatar {
  width: 100px; /* Увеличенный размер аватарки */
  height: 100px; /* Увеличенный размер аватарки */
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 24px;
  font-weight: bold;
}

.stats-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  border-radius: 15px; /* Закругленные края */
  background-color: #C79ECF;
  padding: 10px;
}

.stat {
  text-align: center;
}

.stat-label {
  font-weight: bold;
}

.stat-value {
  display: block;
  font-size: 20px;
}

.post {
  margin-bottom: 20px;
  width: 100%;
}
  </style>
  