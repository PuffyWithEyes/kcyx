<template>
    <div class="auth">
      <div class="auth-card">
        <h1 class="auth-title">Добро пожаловать</h1>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="username">Имя пользователя</label>
            <input id="username" v-model="username" type="text" required />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input id="password" v-model="password" type="password" required />
          </div>
          <button type="submit" class="btn">{{ isLogin ? 'Войти' : 'Зарегистрироваться' }}</button>
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
  
  export default {
    data() {
      return {
        isLogin: true,
        username: "",
        password: "",
      };
    },
    methods: {
      toggleMode() {
        this.isLogin = !this.isLogin;
      },
      async onSubmit() {
        const url = this.isLogin ? "/login" : "/register";
        const payload = {
          username: this.username.trim(),
          password: this.password,
        };
  
        if (!payload.username || !payload.password) {
          alert("Пожалуйста, заполните все поля.");
          return;
        }
  
        try {
          const response = await axios.post(`http://127.0.0.1:8000/api${url}`, payload, {
            withCredentials: true,
          });
  
          if (response.status === 201 && !this.isLogin) {
            alert("Регистрация прошла успешно! Пожалуйста, войдите.");
            this.toggleMode();
          } else if (response.status === 200 && this.isLogin) {
            alert("Вход выполнен успешно!");
          } else {
            alert("Неизвестный статус ответа от сервера.");
          }
        } catch (error) {
            console.log(error);
          if (error.response) {
            const { status, data } = error.response;
  
            if (status === 400) {
              alert(`Ошибка: ${data.detail}`);
            } else if (status === 401){
                alert(`Ошибка: пользователь с таким логином и паролем не зарегистрирован`);
            }else if (status === 500) {
              alert("Серверная ошибка. Пожалуйста, попробуйте позже.");
            } else {
              alert(`Ошибка ${status}: ${data?.detail || "Неизвестная ошибка"}`);
            }
          } else {
            alert("Ошибка соединения с сервером. Проверьте интернет соединение.");
          }
        }
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
  