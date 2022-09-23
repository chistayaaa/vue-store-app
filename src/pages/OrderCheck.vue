<template>
  <ul class="cart__orders" v-for="item in products" :item="item" :key="item.productId">
    <li class="cart__order" >
      <h3>{{ item.product.title }}</h3>
      <b>{{(new Intl.NumberFormat().format(item.product.price * (item.amount || item.quantity)))}} ₽</b>
      <span>Артикул: {{ item.product.id }}</span>
    </li>
  </ul>
  <div class="cart__total">
    <p>Доставка: <b>{{ delivery }} ₽</b></p>
    <p v-if="totalAmount === 1">Итого: <b>{{ totalAmount }}</b> товар на сумму <b>{{ (new Intl.NumberFormat().format(totalPrice)) }} ₽</b></p>
    <p v-else>Итого: <b>{{ totalAmount }}</b> товара на сумму <b>{{ (new Intl.NumberFormat().format(totalPrice))}} ₽</b></p>
  </div>
</template>

<script>
export default {
  name: 'OrderCheck',
  props: ['products', 'totalAmount', 'totalPrice', 'delivery']
};
</script>


