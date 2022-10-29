<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>
    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
    </div>
    <router-view :event="GStore.event"></router-view>
  </div>
</template>

<script>
// import EventService from "@/services/EventService";

export default {
  inject: ["GStore"],
  props: ["id"],
  //   props: ["id"], // receive the id prop, use this to get event information from the api
  //   data() {
  //     return {
  //       event: null, // event data is stored here, inside of the event reactive object... event data comes from created function below
  //       // ^ this updates our template to show the event information
  //     };
  //   },
  //   created() {
  // // fetch event (by id) and set local data
  // EventService.getEvent(this.id) // getting event information from api, via the eventService
  //   .then((response) => {
  //     this.event = response.data;
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //     if (error.response && error.response.status == 404) {
  //       this.$router.push({
  //         name: "404Resource",
  //         params: { resource: "event" },
  //       });
  //     } else {
  //       this.$router.push({ name: "NetworkError" });
  //     }
  //   });
  //   },
};
</script>
