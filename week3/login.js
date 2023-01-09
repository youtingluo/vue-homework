import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'youting',
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      axios.post(`${this.url}/admin/signin`, this.user)
        .then(res=> {
          const { token, expired } = res.data
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)};`;
          window.location = './products.html'
        })
        .catch(err=> {
          alert(err.response.data.message)
        })
    }
  }
}
createApp(app)
  .mount('#app')