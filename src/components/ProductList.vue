<template>
  <ul class="catalog__list">
   <ProductListItem v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<script>

import ProductListItem from '@/components/ProductListItem';

export default {
  components: {ProductListItem},
  props: ['products']
};

</script>
