export default {
  props: ['isNew', 'tempProduct'],
  template: `<div class="modal-dialog modal-xl">
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="productModalLabel" class="modal-title">
        <span>新增產品</span>
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-2">
            <div class="mb-3">
              <label for="imageUrl" class="form-label"
                >輸入圖片網址</label
              >
              <input
                type="text"
                class="form-control"
                placeholder="請輸入圖片連結"
                v-model="tempProduct.imageUrl"
              />
            </div>
            <img class="img-fluid" :src="tempProduct.imageUrl"/>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
            <input
              id="title"
              type="text"
              class="form-control"
              placeholder="請輸入標題"
              v-model="tempProduct.title"
            />
          </div>

          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類<span class="text-danger">*</span></label>
              <input
                id="category"
                type="text"
                class="form-control"
                placeholder="請輸入分類"
                v-model="tempProduct.category"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="unit" class="form-label">單位<span class="text-danger">*</span></label>
              <input
                id="unit"
                type="text"
                class="form-control"
                placeholder="請輸入單位"
                v-model="tempProduct.unit"
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價<span class="text-danger">*</span></label>
              <input
                id="origin_price"
                type="number"
                min="0"
                class="form-control"
                placeholder="請輸入原價"
                v-model="tempProduct.origin_price"
              />
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價<span class="text-danger">*</span></label>
              <input
                id="price"
                type="number"
                min="0"
                class="form-control"
                placeholder="請輸入售價"
                v-model="tempProduct.price"
              />
            </div>
          </div>
          <hr />
          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea
              id="description"
              type="text"
              class="form-control"
              placeholder="請輸入產品描述"
              v-model="tempProduct.description"
            >
            </textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea
              id="content"
              type="text"
              class="form-control"
              placeholder="請輸入說明內容"
              v-model="tempProduct.content"
            >
            </textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                id="is_enabled"
                class="form-check-input"
                type="checkbox"
                v-model="tempProduct.is_enabled"
                :true-value="1"
                :false-value="0"
              />
              <label class="form-check-label" for="is_enabled"
                >是否啟用</label
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        data-bs-dismiss="modal"
      >
        取消
      </button>
      <button type="button" class="btn btn-primary" @click="$emit('update')">確認</button>
    </div>
  </div>
</div>`
}