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
          console.log(res.data);
          const { token, expired } = res.data
          document.cookie = `hexschoolToken=${token}; expires=${new Date(expired)};`;
          window.location = './products.html'
        })
        .catch(err=> {
          console.dir(err)
        })
    }
  }
}
createApp(app)
  .mount('#app')