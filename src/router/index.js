import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (route) => ({ page: parseInt(route.query.page) || 1 }),
  },
  {
    path: "/events/:id",
    name: "EventLayout",
    props: true,
    component: EventLayout,
    children: [
      // <-----
      {
        path: "",
        name: "EventDetails",
        component: EventDetails,
      },
      {
        path: "register",
        name: "EventRegister",
        component: EventRegister,
      },
      {
        path: "edit",
        name: "EventEdit",
        component: EventEdit,
      },
    ],
  },
  // {
  //   path: "/event/:id",
  //   name: "EventDetails",
  //   props: true,
  //   component: EventDetailsVue,
  // },
  // {
  //   path: "/event/:id/register",
  //   name: "EventRegister",
  //   props: true,
  //   component: EventRegisterVue,
  // },
  // {
  //   path: "/event/:id/edit",
  //   name: "EventEdit",
  //   props: true,
  //   component: EventEditVue,
  // },
  {
    path: "/event/:id",
    // redirect: (to) => {
    //   return { name: "EventDetails", params: { id: to.params.id } }; // pass the id through in redirect
    // }, refactor -->
    redirect: () => {
      return { name: "EventDetails" }; // don't need to pass in id b/c same parameter name
    },
    children: [
      { path: "register", redirect: () => ({ name: "EventRegister" }) },
      { path: "edit", redirect: () => ({ name: "EventEdit" }) },
    ],
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
