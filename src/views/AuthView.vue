<template>
  <div class="auth">
    <div class="auth-card">
      <h1 class="auth-title">Добро пожаловать</h1>
      <form @submit.prevent="onSubmit">
        <div class="form-group" :class="{ 'has-error': errorMessage }">
          <label for="username">Имя пользователя</label>
          <input id="username" v-model="username" type="text" ref="usernameInput" required />
          <span v-if="errorMessage" class="error-text">{{ errorMessage }}</span>
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? "Загрузка..." : isLogin ? 'Войти' : 'Зарегистрироваться' }}
        </button>
      </form>
      <p class="switch-text">
        {{ isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?" }}
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? "Зарегистрируйтесь" : "Войдите здесь" }}
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

axios.defaults.baseURL = "http://25.31.195.44:8000/api";
axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
      this.errorMessage = "";
      this.$nextTick(() => this.$refs.usernameInput.focus());
    },
    async onSubmit() {
      const url = this.isLogin ? "/login" : "/register";
      const payload = {
        username: this.username.trim(),
        password: this.password,
      };

      if (!payload.username || !payload.password) {
        this.errorMessage = "Пожалуйста, заполните все поля.";
        return;
      }

      if (payload.username.length < 3 || payload.password.length < 8) {
        this.errorMessage = "Имя пользователя должно быть не короче 3 символов, пароль — не короче 8.";
        return;
      }

      this.loading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post(url, payload);

        if (response.status === 201 && !this.isLogin) {
          alert("Регистрация прошла успешно! Пожалуйста, войдите.");
          this.toggleMode();
        } else if (response.status === 204 && this.isLogin) {
          await axios.get("/me");  // Этот костыль нужен потому что login не проводит Basic Authentification
          this.$router.push("/");
        }
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          if (status === 401) {
            this.errorMessage = "Ошибка: неверный логин или пароль.";
          } else if (status === 409) {
            this.errorMessage = "Ошибка: имя пользователя уже занято.";
          } else if (status === 422) {
            this.errorMessage = "Ошибка: некорректные данные. Проверьте введённые значения.";
          } else {
            this.errorMessage = `Ошибка ${status}: ${data?.detail || "Неизвестная ошибка"}`;
          }
        } else {
          this.errorMessage = "Ошибка соединения с сервером. Проверьте интернет.";
        }
      } finally {
        this.loading = false;
      }
    },
    goToProfile() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #FEF0FF;
  padding: 0 1rem;
}

.auth-card {
  background-color: #D6C8FF;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  text-align: center;
}

.auth-title {
  font-size: 2.5rem;
  color: #7E6BC4;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.has-error input {
  border-color: #ff4d4f;
}

.error-text {
  color: #ff4d4f;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #7E6BC4;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #C79ECF;
  border-radius: 6px;
  font-size: 1.2rem;
}

input:focus {
  outline: none;
  border-color: #7E6BC4;
  box-shadow: 0 0 6px rgba(126, 107, 196, 0.6);
}

.btn {
  width: 100%;
  padding: 1rem;
  background-color: #7E6BC4;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #5d50a8;
}

.switch-text {
  margin-top: 2rem;
  font-size: 1rem;
  color: #7E6BC4;
}

.switch-text a {
  color: #C79ECF;
  text-decoration: underline;
  cursor: pointer;
}

.switch-text a:hover {
  color: #7E6BC4;
}
</style>
