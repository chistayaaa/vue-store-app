import { createStore } from 'vuex';
import { API_BASE_URL } from '@/config';
import axios from 'axios';

const store = createStore({
  state : {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
    deliveryInfo: null,
    paymentInfo: null
  },
  mutations: {
    updatePaymentInfo(state, paymentInfo){
      state.paymentInfo = paymentInfo;
    },
    updateDeliveryInfo(state, deliveryInfo){
      state.deliveryInfo = deliveryInfo;
    },
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state){
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount}) {
      const item = state.cartProducts.find(item => item.productId === productId);

      if(item){
        item.amount = amount;
      }

    },
    deleteCardProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter(item => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey){
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items){
      state.cartProductsData = items;
    },
    syncCartProducts(state){
      state.cartProducts = state.cartProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity
        }
      });
    }
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map(item => {
        const product = state.cartProductsData.find( p => p.product.id === item.productId).product;

        return {
          ...item,
          product: {
            ...product,
            image: product.image.file.url
          }
        }
      })
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((total, item) => (item.product.price * item.amount) + total, 0)
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((amount, item) =>  item.amount + amount, 0)
    },
    cartInfoDelivery(state){
      return state.cartProductsData.map((info) => {
        return {
          ...info,
          delivery: {
            way: info.way,
            pay: info.pay
          }
        }
      })
    }
  },
  actions: {
    loadOrderInfo(context, orderId){
      return axios
        .get(API_BASE_URL + '/api/orders/' + orderId, {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateOrderInfo', response.data)
        })
    },
    loadCart(context){
      return axios
        .get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          if(!context.state.userAccessKey){
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
    },
    addProductToCart(context, {productId, amount}){
      return (new Promise(resolve => setTimeout(resolve, 2000)))
        .then(() => {
          return axios.post(API_BASE_URL + '/api/baskets/products', {
              productId: productId,
              quantity: amount
            },
            {
              params: {
                userAccessKey: context.state.userAccessKey
              }
            })
            .then(response => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            })
        })
    },
    updateCartProductAmount(context,{ productId, amount} ){
      context.commit('updateCartProductAmount', { productId, amount});

      if(amount < 1) {
         return;
      }

      return axios.put(API_BASE_URL + '/api/baskets/products', {
          productId: productId,
          quantity: amount
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        })
    },
    deleteCardProduct(context, productId){
      context.commit('deleteCardProduct', productId);

      return axios.delete(API_BASE_URL + '/api/baskets/products',  {
          params: {
            userAccessKey: context.state.userAccessKey
          }, data: {
          productId: productId,
        }
        }).then(response => {
          context.commit('updateCartProductsData', response.data.items);
        }).catch(() => {
          context.commit('syncCartProducts');
        })
    }
  }
});

export default store;

