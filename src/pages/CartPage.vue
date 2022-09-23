<template>

  <main class="content container" v-if="cartLoading"> Корзина загружается.. </main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
       Всего товаров: {{ totalAmount }}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">

          <ul class="cart__list">
         <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </ul>

        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ new Intl.NumberFormat().format(totalPrice) }} ₽</span>
          </p>

          <router-link :to="{name: 'order'}" custom v-slot="{ href, navigate }">
            <span v-if="totalAmount < 1" class="cart__button button button--primery button-disabled">Оформить заказ</span>
            <a v-else :href="href" @click="navigate"  class="cart__button button button--primery">Оформить заказ</a>
          </router-link>

        </div>
      </form>
    </section>
  </main>

</template>

<script>


import { mapGetters } from 'vuex';
import CartItem from '@/components/CartItem';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'CartPage',
  components: {CartItem},
  data() {
    return {
      cartLoading:  false,
      cartData: null,
  }
  },
  computed: {
    ...mapGetters ({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmount: 'cartTotalAmount'}),
  },
  methods: {
    loadCart(){
      this.cartLoading = true;

      axios.get(API_BASE_URL + '/api/baskets')
        .then(response => this.cartData = response.data)
        .then(()=> this.cartLoading = false)
    },
    },
  created(){
    this.loadCart();
  },
};
</script>

