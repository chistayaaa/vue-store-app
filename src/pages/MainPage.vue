<template>

  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{ countProducts }} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo" v-model:category-id="filterCategoryId" v-model:color-id="filterColorId"/>
      <section class="catalog">

        <div v-if="productsLoading">Загрузка товаров...
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <path fill="none" stroke="#8be000" stroke-width="8" stroke-dasharray="42.76482137044271 42.76482137044271" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" stroke-linecap="round" style="transform:scale(0.8);transform-origin:50px 50px">
              <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1s" keyTimes="0;1" values="0;256.58892822265625"></animate>
            </path>
          </svg>
        </div>
        <div v-if="productsLoadingFailed"> Произошла ошибка при загрузке товаров
          <button type="button" class="button button--primery" @click.prevent="loadProducts">Попробовать еще раз</button></div>

        <ProductList :products="products" />
        <Pagination v-model:page="page" :count="countProducts" :per-page="productsPerPage" />

      </section>

    </div>
  </main>

</template>

<script>
import ProductList from '@/components/ProductList';
import Pagination from '@/components/Pagination';
import ProductFilter from '@/components/ProductFilter';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: 'MainPage.vue',
  components: {ProductList, Pagination, ProductFilter},
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,

      page: 1,
      productsPerPage: 3,

      productsData: null,

      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map(product => {
          return {
            ...product,
          image: product.image.file.url,
          }
        })
        : [];
    },
    countProducts(){
      return this.productsData ? this.productsData.pagination.total : 0;
    }
  },
  methods: {
    loadProducts(){
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(API_BASE_URL + `/api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId
          }
        })
          .then(response => this.productsData = response.data)
          .catch(() => this.productsLoadingFailed = true)
          .then(() => this.productsLoading = false)
      }, 0)
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo(){
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    }
  },
  created() {
    this.loadProducts();
  }
};
</script>


