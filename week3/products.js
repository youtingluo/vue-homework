import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      path: 'youting',
      bsModal: '',
      isNew: true,
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
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    checkLogin() {
      axios.post(`${this.url}/api/user/check`)
        .then(() => {
          this.getProducts()
        })
        .catch(err => {
          alert(err.response.data.message)
          window.location = './login.html'
        })
    },
    openProductModal(isNew, product) {
      if(isNew) {
        this.tempProduct = {}
        this.isNew = true;
      } else {
        this.tempProduct = { ...product }
        this.isNew = false;
      }
      this.bsModal = new bootstrap.Modal(this.$refs.productModal);
      this.bsModal.show();
    },
    updateProduct() {
      let api = `${this.url}/api/${this.path}/admin/product`
      let method = 'post'
      if(!this.isNew) {
        api = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`
        method = 'put'
      }
      axios[method](api, { data: this.tempProduct })
        .then(() => {
          this.getProducts()
        })
        .catch((err) => {
          alert(err.message)
        })
        this.bsModal.hide()
    },
    openRemoveModal(item) {
      this.tempProduct = { ...item }
      this.bsModal = new bootstrap.Modal(this.$refs.delProductModal);
      this.bsModal.show();
    },
    removeProduct() {
      const result = confirm("確定刪除")
      if(result) {
        axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
          .then(() => {
            this.getProducts()
          })
          .catch((err) => {
            alert(err.message)
          })
      }
      this.bsModal.hide()
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin()

  },
}
createApp(app)
  .mount('#app')