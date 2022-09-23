<template>

  <ul class="catalog__pagination pagination">
    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow pagination__link--disabled" aria-label="Предыдущая страница" @click.prevent="$emit('update:page', page-= 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <li class="pagination__item" v-for="pageN in pages" >
      <a href="#" class="pagination__link" :class="{'pagination__link--current' : pageN === page}" @click.prevent="$emit('update:page', pageN)">
       {{pageN}}
      </a>
    </li>


    <li class="pagination__item">
      <a class="pagination__link pagination__link--arrow" href="#" aria-label="Следующая страница" @click.prevent="$emit('update:page', page+= 1)">
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>

</template>

<script>
export default {
  name: 'Pagination',
  props: ['count', 'perPage', 'page'],
  computed: {
    pages() {
      return Math.ceil(this.count / this.perPage);
    },
  },
};
</script>


