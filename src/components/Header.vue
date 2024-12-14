<template>
  <header class="header">
    <div class="header-left">
      <router-link to="/me">
        <img src="/src/assets/dog.png" alt="User Avatar" class="avatar" />
      </router-link>
      <div class="search-container">
        <img src="../assets/search.png"
        alt="Search Icon"
        class="search-icon"
        @click="toggleSearch" />
        <input v-if="showSearch"
        type="text"
        placeholder="Искать пользователя..."
        class="search-input"
        @keyup.enter="performSearch"
        v-model="searchQuery" />
        <span v-if="failedFind"
        style="color: red;">Не удалось найти пользователя!</span>
      </div>
    </div>
    <div class="header-right">
      <router-link to="/auth">
        <button>Регистрация</button>
      </router-link>
      <router-link to="/auth">
        <button>Вход</button>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppHeader',
  data() {
    return {
      showSearch: false,
      failedFind: false,
      searchQuery: '',
    };
  },
  methods: {
    toggleSearch(): void {
      this.showSearch = !this.showSearch;
      this.failedFind = false;
    },
    async performSearch() {
      try {
        const path = `/users/${this.searchQuery.trim()}`;
        const search = await axios.get(path);

        if (search.status === 200) {
          this.$router.push(`/user/${this.searchQuery.trim()}`);
          return;
        }
      } catch(error) {}
        alert("Не удалось найти пользователя!");
        this.showSearch = !this.showSearch;
        this.failedFind = true;
    },
  },
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #FEF0FF;
  border-bottom: 1px solid #D6C8FF;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
}

.header-left {
  display: flex;
  align-items: center;
  flex-grow: 1; /* Разрешаем элементу расти */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  flex-grow: 1; /* Разрешаем элементу расти */
}

.search-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.search-input {
  flex-grow: 1; /* Разрешаем элементу расти */
  padding: 5px 10px;
  border: 1px solid #D6C8FF;
  border-radius: 5px;
  margin-left: 10px;
  background-color: #FEF0FF;
  margin-right: 7.5px;
}

.header-right {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  background-color: #C79ECF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #7E6BC4;
}
</style>
