<template>
  <Header avaPath="/src/assets/dog.png" />
  <div class="container-posts">
    <Post
    v-for="(post, index) in posts"
    :key="index"
    :itemsList="post.itemsList"
    :userName="post.userName"
    :viewCount="post.viewCount"
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
          itemsList: [
            { type: 'image', src: '/src/assets/dog.png', alt: 'Image 1' },
            { type: 'text', content: 'This is some text between images.' },
            { type: 'image', src: '/test/image copy.png', alt: 'Image 2' },
          ] as Item[],
          userName: 'puffy_with_eyes',
          viewCount: 1,
        },
        {
          itemsList: [
            { type: 'image', src: '/src/assets/dog.png', alt: 'Image 3' },
            { type: 'image', src: '/src/assets/dog.png', alt: 'Image 4' },
            { type: 'text', content: 'Another text between images.' },
          ] as Item[],
          userName: 'Agenteec',
          viewCount: 2,
        },
      ],
    };
  },
  methods: {
    addPost(newPostItems: PostItem[]) {
      // Создаем массив itemsList на основе newPostItems
      const itemsList: Item[] = newPostItems.map(item => ({
        type: item.type,
        src: item.src,
        content: item.content
      }));

      // Добавляем новый пост в начало массива posts
      this.posts.unshift({
        itemsList: itemsList,
        userName: 'User', // Замените на имя пользователя
        viewCount: 1,
      });
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
