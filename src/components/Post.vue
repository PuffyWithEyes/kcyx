<template>
  <div class="image-text-block">
    <div class="user-info">
      <router-link :to="routerLink">
        <img src="/src/assets/dog.png" alt="User Avatar" class="avatar" />
      </router-link>
      <span class="username">{{ userName }} говорит:</span>
      <span class="time">{{ currentTime }}</span>
    </div>
    <div v-for="(item, index) in itemsList" :key="index" class="item">
      <img v-if="item.type === 'image'" :src="item.src" :alt="item.alt" class="image" />
      <p v-if="item.type === 'text'" class="text">{{ item.content }}</p>
    </div>
    <div class="post-footer">
      <button
      :class="['like-button', { 'like-button-active': isLiked }]"
      @click="likePost">{{ localLikes }} ❤</button>
      <button class="like-button" @click="sharePost">÷</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Item } from '../types.ts';
import axios from 'axios';

export default defineComponent({
  name: 'Post',
  props: {
    id: {
      type: String,
      required: true,
    },
    currentTime: {
      type: String,
      required: true,
    },
    itemsList: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      routerLink: `/user/${this.userName}`,
      isLiked: false, // Состояние для отслеживания лайка
      localLikes: this.likes,
    }
  },
  async created() {
    try {
      if (this.id === "0") {  // Особый пост от админов
        return;
      }

      const post = await axios.get(`/users/${this.userName}/posts/${this.id}`);
      this.isLiked = post.data.is_liked;
    } catch(error) {
      alert("Не удалось получить пост!");
      return;
    }

  },
  methods: {
    async likePost() {
      if (this.id === "0") {
        this.localLikes += 1;
        return;
      }

      try {
        if (this.isLiked) {
          await axios.delete(`/users/${this.userName}/posts/${this.id}/like`);
          this.localLikes -= 1;
          this.isLiked = false;
        } else {
          await axios.put(`/users/${this.userName}/posts/${this.id}/like`);
          this.isLiked = true;
          this.localLikes += 1;
        }
      } catch(error) {
        alert("Не удалось обработать событие лайка!");
        return;
      }
    },
    async sharePost() {
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}/users/${this.userName}/posts/${this.id}`
        );
        alert("Ссылка была супешно скопирована в буффер обмена!");
      } catch (error) {
        console.error('Ошибка при копировании текста:', error);
      }
    },
  },
});
</script>

<style scoped>
.image-text-block {
  background-color: #FEF0FF;
  padding: 20px;
  border: 1px solid #D6C8FF;
  border-radius: 10px;
  width: 90%; /* Почти на всю ширину */
  margin: 20px auto; /* Центрирование по горизонтали */
  display: flex;
  flex-direction: column;
  align-items: center; /* Центрирование содержимого по горизонтали */
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  justify-content: flex-start; /* Выравнивание по левому краю */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.time {
  color: gray;
  margin-left: 10px;
}

.username {
  font-weight: bold;
}

.item {
  margin-bottom: 20px;
  width: 100%; /* Ширина элемента */
  display: flex;
  justify-content: center; /* Центрирование изображений по горизонтали */
  flex-direction: column; /* Элементы в столбец */
  align-items: center; /* Центрирование содержимого по горизонтали */
}

.image {
  max-width: 100%; /* Максимальная ширина изображения */
  height: auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.text {
  background-color: #C79ECF;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  width: 100%; /* Ширина текста */
}

.post-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}


.view-count {
  font-size: 14px;
  color: #555;
}

.like-button {
  background-color: #C79ECF;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}

.like-button:hover {
  background-color: #7E6BC4;
}

.like-button-active {
  background-color: white;
  color: #7E6BC4;;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
}

.like-button-active:hover {
  background-color: gainsboro;
}

</style>
