import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";
import AboutView from "../views/AboutView.vue";
import EventLayout from "@/views/event/EventLayout.vue";
import EventDetails from "@/views/event/EventDetails.vue";
import EventRegister from "@/views/event/EventRegister.vue";
import EventEdit from "@/views/event/EventEdit.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";
import NProgress from "nprogress";
import EventService from "@/services/EventService";
import GStore from "@/store";

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
    beforeEnter: (to) => {
      // fetch event (by id) and set local data
      return EventService.getEvent(to.params.id) // getting event information from api, via the eventService
        .then((response) => {
          // this.event = response.data;
          GStore.event = response.data;
        })
        .catch((error) => {
          // console.log(error);
          if (error.response && error.response.status == 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
    },
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
  {
    path: "/:catchAll(.* )", //match all routes that don't match an existing route
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/404/:resource",
    name: "404Resource",
    component: NotFound,
    props: true,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(() => {
  NProgress.start(); //start the progress bar before navigation
});

router.afterEach(() => {
  NProgress.done(); //finish the progress bar after navigation
});

export default router;
