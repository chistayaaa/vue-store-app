<template>

  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderInfo.id }}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfo.name }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{ orderInfo.address }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfo.phone }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{orderInfo.email }}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{ paymentInfo.payment }}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">

          <OrderCheck :total-amount="basketInfo.length" :products="basketInfo" :total-price="orderInfo.totalPrice" :delivery="deliveryInfo.delivery"/>

        </div>
      </form>
    </section>
  </main>

</template>

<script>
import OrderCheck from '@/pages/OrderCheck';
export default {
  components: { OrderCheck },
  computed: {
   paymentInfo(){
     return this.$store.state.paymentInfo;
   },
   deliveryInfo(){
     return this.$store.state.deliveryInfo;
   },
   orderInfo(){
     return this.$store.state.orderInfo;
   },
   basketInfo(){
     return this.$store.state.orderInfo.basket.items;
    }
  },
  created(){
    if(this.$store.state.orderInfo && this.$store.state.orderInfo.id === this.$route.params.id){
      return;
    }
    this.$store.dispatch('loadOrderInfo', this.$route.params.id)
  }
};
</script>


