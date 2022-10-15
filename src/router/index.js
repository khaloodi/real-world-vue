import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetailsVue from "@/views/EventDetails.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetailsVue,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
