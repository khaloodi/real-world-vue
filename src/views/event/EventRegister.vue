<template>
  <!-- <div v-if="event">
    <h1>{{ event.title }}</h1>
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
    </div> -->
  <p>Register for the event here</p>
  <button @click="register">Register Me</button>
  <!-- </div> -->
</template>

<script>
// import EventService from "@/services/EventService";

export default {
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      //call to api
      // if registered then redirect to event details

      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;
      //reset flash message after 3 seconds
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);

      // programmatic navigation
      this.$router.push({
        name: "EventDetails",
        params: { id: this.event.id },
      });
    },
  },
  // props: ["id"], // receive the id prop, use this to get event information from the api
  // data() {
  //   return {
  //     event: null, // event data is stored here, inside of the event reactive object... event data comes from created function below
  //     // ^ this updates our template to show the event information
  //   };
  // },
  // created() {
  //   // fetch event (by id) and set local data
  //   EventService.getEvent(this.id) // getting event information from api, via the eventService
  //     .then((response) => {
  //       this.event = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
};
</script>
