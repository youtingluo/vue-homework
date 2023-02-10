const { createApp } = Vue;
const url = 'https://vue3-course-api.hexschool.io'
const apiPath = 'youting'
const productModal = {
  props: ['tempProduct', 'addToCart'],
  data() {
    return {
      modal: {},
      qty: 1
    }
  },
  template: `#userProductModal`,
  watch: {
    tempProduct() {
      this.qty = 1
      this.modal.show()
    }
  },
  methods: {
    hide() {
      this.modal.hide()
    }
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  }
}
const app = createApp({
  data() {
    return {
      carts: {},
      isActive: false,
      product: {},
      products: []
    }
  },
  components: {
    productModal
  },
  methods: {
    getProducts() {
      axios.get(`${url}/v2/api/${apiPath}/products`)
        .then(res => {
          this.products = res.data.products
        })
    },
    getProduct(id) {
      this.isActive = true
      axios.get(`${url}/v2/api/${apiPath}/product/${id}`)
        .then(res => {
          this.product = res.data.product;
          this.isActive = false
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    getCart() {
      axios.get(`${url}/v2/api/${apiPath}/cart`)
        .then(res => {
          this.carts = res.data.data;
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    addToCart(product_id, qty = 1) {
      this.isActive = true
      const data = {
          product_id,
          qty
        }
      axios.post(`${url}/v2/api/${apiPath}/cart`, { data })
        .then(() => {
          this.getCart()
          alert('已加入購物車')
          this.isActive = false
          this.$refs.productModal.hide()
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    removeCart(id) {
      this.isActive = true
      axios.delete(`${url}/v2/api/${apiPath}/cart/${id}`)
        .then(() => {
          this.getCart()
          this.isActive = false
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    updateCart(cart) {
      this.isActive = true
      const data = {
        product_id: cart.product_id,
        qty: cart.qty
      }
      axios.put(`${url}/v2/api/${apiPath}/cart/${cart.id}`, { data })
        .then(res => {
          this.getCart()
          this.isActive = false
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    removeAllCart() {
      axios.delete(`${url}/v2/api/${apiPath}/carts`)
        .then(() => {
          this.getCart()
          alert('已清空購物車')
        })
        .catch(err => {
          alert(err.data.message)
        })
    },
    onSubmit() {
      alert('表單驗證成功')
      this.$refs.form.resetForm()
    }
  },
  mounted() {
    this.getCart()
    this.getProducts()
  }
})
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});
// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});
app.mount('#app')