import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventDetailsVue from "@/views/event/EventDetails.vue";
import EventRegisterVue from "@/views/event/EventRegister.vue";
import EventEditVue from "@/views/event/EventEdit.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    props: true,
    component: EventDetailsVue,
  },
  {
    path: "/event/:id/register",
    name: "EventRegister",
    props: true,
    component: EventRegisterVue,
  },
  {
    path: "/event/:id/edit",
    name: "EventEdit",
    props: true,
    component: EventEditVue,
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
