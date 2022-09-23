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
        Корзина
      </h1>
      <span v-if="totalAmount === 1" class="content__info">
        {{ totalAmount }} товар
      </span>
      <span v-else class="content__info">
        {{ totalAmount }} товара
      </span>

    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" :error="formError.name" title="ФИО" placeholder="Введите ваше полное имя" />
            <BaseFormText v-model="formData.address" :error="formError.address" title="Адрес доставки" placeholder="Введите ваш адрес" />
            <BaseFormText v-model="formData.phone" :error="formError.phone" title="Телефон" placeholder="Введите ваш телефон" />
            <BaseFormText v-model="formData.email" :error="formError.email" title="Email" placeholder="Введи ваш Email" />
            <BaseFormTextarea title="Комментарий к заказу" :error="formError.comment" v-model="formData.comment" placeholder="Ваши пожелания"/>

          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>

            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" v-model="delivery" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" v-model="delivery" value="500" >
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="Картой при получении" checked="" v-model="payment">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="Наличными при получении" v-model="payment">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">

          <OrderCheck :total-amount="totalAmount" :products="products" :total-price="totalPrice" :delivery="delivery" />

          <button v-if="totalAmount > 0" class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
          <button v-else disabled class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>

        <div class="cart__error form__error-block" v-if="formSending">
          <h4>Заказ оформляется...</h4>
        </div>

        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
            {{formErrorMessage}}
          </p>
        </div>


      </form>
    </section>
  </main>

</template>

<script>
import BaseFormField from '@/components/BaseFormField';
import BaseFormText from '@/components/BaseFormText';
import BaseFormTextarea from '@/components/BaseFormTextarea';
import { mapGetters } from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import OrderCheck from '@/pages/OrderCheck';

export default {
  name: 'OrderPage',
  components: {BaseFormField, BaseFormText, BaseFormTextarea, OrderCheck},
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
      formSending: false,
      delivery: 0,
      payment: 'Картой при получении'
    }
  },
  computed: {
    ...mapGetters ({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalAmount: 'cartTotalAmount'}),
  },
  methods: {
    order(){
      this.formError = {};
      this.formErrorMessage = '';
      this.formSending = true;

      this.$store.commit('updateDeliveryInfo',{ delivery: this.delivery });
      this.$store.commit('updatePaymentInfo',{ payment: this.payment });

      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
             return axios
               .post(API_BASE_URL + '/api/orders' , {
                ...this.formData
                  }, {
                             params: {
                                userAccessKey: this.$store.state.userAccessKey
                                      }})
               .then(response => {
                   this.$store.commit('resetCart');
                   this.formSending = false;
                   this.$store.commit('updateOrderInfo', response.data);
                   this.$router.push({name: 'orderInfo', params: {id: response.data.id}});
               })
               .catch(error => {
                  this.formSending = false;
                  this.formError = error.response.data.error.request || {};
                  this.formErrorMessage = error.response.data.error.message;
               })
              })
    },
  },
};
</script>


