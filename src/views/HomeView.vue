<template>
  <Header avaPath="/src/assets/dog.png" />
  <div class="container-posts">
    <Post
    v-for="(post, index) of posts"
    :id="post.id"
    :current-time="post.currentTime"
    :key="index"
    :itemsList="post.itemsList"
    :userName="post.userName"
    :likes="post.likes"
    />
  </div>
  <Dock @create-post="addPost" />
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
  data() {
    return {
      posts: [
        {
          id: "0",
          currentTime: "1970-01-01T00:00:00Z",
          itemsList: [
            {
              type: 'text',
              content: 'Здравствуйте, Вас приветсвует администрация сервера. Правила => Собачку можно лайкать много раз. За читы - бан. За оскорбление - бан. За оскорбление собачки - расстрел, а потом бан. Всем удачи!',
            },
            { type: 'image', src: '/src/assets/dog.png', alt: 'Image 0' },
          ] as Item[],
          userName: 'Admins',
          likes: 1337,
        },
      ],
    };
  },
  methods: {
    async addPost(newPostItems: PostItem[]) {
      // Создаем массив itemsList на основе newPostItems
      const itemsList: Item[] = newPostItems.map(item => ({
        type: item.type,
        src: item.src,
        content: item.content
      }));

      let msg = '';
        
      for (let block of newPostItems) {
        if (block.type === "text") {
          msg += block.content + "\\end";
        } else {
          msg += `[${block.src}]` + "\\end";
        }
      }

      const payload = {
        content: msg,
      };

      try {
        const meResponse = await axios.get('/me');
        const postResponse = await axios.post(`/users/${meResponse.data.username}/posts`, payload);
        this.posts.unshift({
          id: postResponse.data.id,
          currentTime: postResponse.data.created_at,
          itemsList: itemsList,
          userName: postResponse.data.author.username,
          likes: 0,
        });
      } catch(error) {
        alert("Не удалось создать новый пост!");
        return;
      }      
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
