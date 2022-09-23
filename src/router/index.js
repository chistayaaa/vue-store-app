import MainPage from '@/pages/MainPage';
import ProductPage from '@/pages/ProductPage';
import NotFoundPage from '@/pages/NotFoundPage';
import  { createRouter, createWebHashHistory } from 'vue-router';
import CartPage from '@/pages/CartPage';
import OrderPage from '@/pages/OrderPage';
import OrderInfoPage from '@/pages/OrderInfoPage';

const routes = [
  {
    path: "/",
    name: "main",
    component: MainPage,
  },
  {
    path: '/product/:id',
    name: "product",
    component: ProductPage,
  },
  {
    path: '/cart',
    name: "cart",
    component: CartPage,
  },
  {
    path: "/order",
    name: "order",
    component: OrderPage,
  },
  {
    path: "/order/info:id",
    name: "orderInfo",
    component: OrderInfoPage,
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
