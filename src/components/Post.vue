<template>
  <div class="image-text-block">
    <div class="user-info">
      <img :src="userAvatar" alt="User Avatar" class="avatar" />
      <span class="username">{{ userName }} говорит:</span>
    </div>
    <div v-for="(item, index) in itemsList" :key="index" class="item">
      <img v-if="item.type === 'image'" :src="item.src" :alt="item.alt" class="image" />
      <p v-if="item.type === 'text'" class="text">{{ item.content }}</p>
    </div>
    <div class="post-footer">
      <button class="like-button" @click="likePost">❤</button>
      <span class="view-count">{{ viewCount }} просмотров</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Item } from '../types.ts';

export default defineComponent({
  name: 'Post',
  props: {
    itemsList: {
      type: Array as PropType<Item[]>,
      required: true,
    },
    userAvatar: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    viewCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    likePost() {
      console.log('Post liked');
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

</style>
