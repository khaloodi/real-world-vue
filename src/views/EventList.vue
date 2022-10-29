<template>
  <h1>Events for Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&#60; Previous</router-link
      >

      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
// import { watchEffect } from "vue";
export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    // created() {
    // watchEffect(() => {
    // this.events = null;
    // EventService.getEvents(2, this.page)
    EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        //comp says continue routing and once component is loaded,
        //set these values (totalEvent, and Events)
        // note they use vm instead of comp inside of documentation
        // vm stands for view model
        next((comp) => {
          comp.totalEvents = response.headers["x-total-count"];
          comp.events = response.data;
        });
        // this.events = response.data;
        // this.totalEvents = response.headers["x-total-count"];
      })
      .catch(() => {
        // console.log(error);
        // this.$router.push({ name: "NetworkError" });
        next({ name: "NetworkError" }); //if the api fails, load the network error page
      });
    // });
  },
  computed: {
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages; // returns whether or not this page is in fact the last page
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}
#page-prev {
  text-align: left;
}
#page-next {
  text-align: right;
}
</style>
