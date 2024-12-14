<template>
    <Header avaPath="/src/assets/dog.png" />
    <div class="container-posts">
      <Post
      :id="postId"
      :current-time="currentTime"
      :itemsList="itemsList"
      :userName="username"
      :likes="likes"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import Header from '../components/Header.vue';
  import Post from '../components/Post.vue';
  import Dock from '../components/Dock.vue';
  import type { Item, PostItem } from '../types.ts'
  import axios from 'axios';
  
  export default defineComponent({
    name: 'App',
    components: {
      Header,
      Post,
      Dock,
    },
    props: {
      username: {
        type: String,
        required: true,
      },
      postId: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        currentTime: "1970-01-01T00:00:00Z",
        itemsList: [] as Item[],
        likes: 0,
      };
    },
    async created() {
      try {
        const response =
          await axios.get(`/users/${this.username}/posts/${this.postId}`);        
        if (response.status !== 200) {
          this.$router.clearRoutes();  // Возвращение на главную страницу
          return;
        }
                
        let msg = response.data.content.split("\\end");

        for (let m of msg) {
          if (m === "[/src/assets/dog.png]") {
            this.itemsList.push({
              type: "image",
              src: "/src/assets/dog.png",
              alt: "САБАЧКА!"
            });
          } else {
            this.itemsList.push({ type: "text", content: m  });
          }
        }

        this.itemsList.pop();

        this.likes = response.data.likes;
        console.log(this.likes);
        this.currentTime = response.data.created_at;
      } catch (error) {
        console.error('Error fetching username:', error);
        this.$router.clearRoutes();  // Возвращение на главную страницу
        return;
      }
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
  </style>
  