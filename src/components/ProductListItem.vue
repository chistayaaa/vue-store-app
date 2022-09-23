<template>
  <li class="catalog__item">
    <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id} }">
      <img :src="product.image"  :alt="product.title" style="object-fit: contain">
    </router-link>

    <h3 class="catalog__title">
      <a href="#">{{ product.title }}</a>
    </h3>

    <span class="catalog__price">{{ numberFormat }}₽</span>

    <ul class="colors colors--black">
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="product.color" v-model="color">
          <span class="colors__value" :style="{'background-color': product.colors[0].code}">
                  </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="product.color" v-model="color">
          <span class="colors__value" :style="product.colors[1] ? {'background-color' : product.colors[1].code} : false">
                  </span>
        </label>
      </li>
      <li class="colors__item">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" value="product.color" v-model="color">
          <span class="colors__value" :style="product.colors[2] ? {'background-color' : product.colors[2].code} : false">
                  </span>
        </label>
      </li>
    </ul>
  </li>
</template>



<script>
export default {
  data() {
    return{
      color: '#73B6EA'
    };
  },
  props: ['product'],
  computed: {
    numberFormat() {
      return new Intl.NumberFormat().format(this.product.price);
    }
  }
}
</script>
