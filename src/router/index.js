import {createWebHistory, createRouter} from "vue-router";
import Home from "@/views/home/Home.vue";
import StoreInfo from "@/views/store/StoreInfo.vue";

const routes = [
  {
    // 主页的重定向
    path:"/",
    redirect:"/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children : [
      {
        path: "",
        name: "StoreHome",
        component: StoreInfo
      },
      {
        path: "/store-info",
        name: "StoreInfo",
        component: StoreInfo
      },
      {
        path: "/goods-add",
        name: "GoodsAdd",
        component: () => import("@/views/goods/GoodsAdd.vue")
      },
      {
        path: "/goods-info",
        name: "GoodsInfo",
        component: () => import("@/views/goods/GoodsInfo.vue")
      },
      {
        path: "/store-add",
        name: "StoreAdd",
        component: () => import("@/views/store/StoreAdd.vue")
      },

      {
        path : "/type-info",
        name : "TypeInfo",
        component : () => import("@/views/type/TypeInfo.vue")
      },
      {
        path : "/type-add",
        name : "TypeAdd",
        component : () => import("@/views/type/TypeAdd.vue")
      },
    ]
  },

]

const router = createRouter({
  //参考:https://router.vuejs.org/zh/api/#history
  //import.meta.env.BASE_URL 就是base 也就是指定的根路径.
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
