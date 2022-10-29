import { createStore } from "vuex";
// import { reactive } from "vue";

export default createStore({
  state: {
    user: "Adam Jahr",
    events: [],
  },
  getters: {},
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
  },
  actions: {},
  modules: {},
});

// export default reactive({ flashMessage: "", event: null });
