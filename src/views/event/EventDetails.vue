<template>
  <div v-if="event">
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
    </div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
import EventService from "@/services/EventService";

export default {
  props: ["id"], // receive the id prop, use this to get event information from the api
  data() {
    return {
      event: null, // event data is stored here, inside of the event reactive object... event data comes from created function below
      // ^ this updates our template to show the event information
    };
  },
  created() {
    // fetch event (by id) and set local data
    EventService.getEvent(this.id) // getting event information from api, via the eventService
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
