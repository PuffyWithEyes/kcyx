<template>
  <router-link to="/" class="back-button">&larr; Назад</router-link>
  <div class="user-profile">
    <div class="user-info">
      <img src="/src/assets/dog.png" alt="User Avatar" class="avatar" />
      <span class="username">{{ username }}</span>
    </div>
    <div class="stats-container">
      <div class="stat">
        <span class="stat-label">Посты:</span>
        <span class="stat-value">{{ postsList.length }}</span>
      </div>
      <div class="stat">
        <span class="stat-label">Лайки:</span>
        <span class="stat-value">{{ totalLikes }}</span>
      </div>
    </div>
    <div class="container-posts">
      <Post
      v-for="(post, index) in postsList"
      :id="post.id"
      :currentTime="post.currentTime"
      :key="index"
      :itemsList="post.itemsList"
      :userName="post.userName"
      :likes="post.likes as number"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import Post from '../components/Post.vue';
import type { Item, Post as PostItem } from '../types'
import axios from 'axios';

export default defineComponent({
  name: 'UserProfile',
  components: {
    Post,
  },
  props: {
    username: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      postsList: [] as PostItem[],
      totalLikes: 0,
    };
  },
  async created() {
    try {
      const response = await axios.get(`/users/${this.username}`);
      if (response.status !== 200) {
        alert("Такой пользователь не существует!");
        return;
      }
    } catch (error) {
      console.error('Error fetching username:', error);
      return;
    }

    const posts = await axios.get(`/users/${this.username}/posts`);

    for (let post of posts.data) {
      let finalPost = { id: post.id, currentTime: post.created_at, itemsList: [] as Item[], userName: this.username, likes: post.likes };
      
      let msg = post.content.split("\\end");
      this.totalLikes += post.likes;

      for (let m of msg) {
        if (m === "[/src/assets/dog.png]") {
          finalPost.itemsList.push({ type: "image", src: "/src/assets/dog.png", alt: "САБАЧКА!" });
        } else {
          finalPost.itemsList.push({ type: "text", content: m  });
        }
      }

      finalPost.itemsList.pop();

      this.postsList.push(finalPost);
    }

    console.log(this.postsList);
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
