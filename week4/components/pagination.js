export default {
  props: ['pagination'],
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{ disabled: !pagination.has_pre }">
      <a class="page-link" href="#" 
      @click.prevent="$emit('emit-page', pagination.current_page - 1)" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" :class="{ active : page === pagination.current_page }"
        v-for="page in pagination.total_pages" :key="page + 'pages'">
        <a class="page-link" href="#"
        @click.prevent="$emit('emit-page', page)">{{page}}
        </a>
    </li>
    <li class="page-item" :class="{ disabled: !pagination.has_next }">
      <a class="page-link" href="#" 
      @click.prevent="$emit('emit-page', pagination.current_page + 1)" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
