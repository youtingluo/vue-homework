import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'youting',
      products: [],
      tempProduct: {}
    }
  },
  methods: {
    getProducts() {
      axios.get(`${this.url}/api/${this.path}/admin/products`)
        .then(res => {
          this.products = res.data.products
        })
    },
    getProductDetail(product) {
      this.tempProduct = product
    },
    checkLogin() {
      axios.post(`${this.url}/api/user/check`)
        .then(() => {
          this.getProducts()
        })
        .catch(err => {
          console.dir(err);
          alert(err.response.data.message)
          window.location = './login.html'
        })
    }
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin()
  },
}
createApp(app)
  .mount('#app')