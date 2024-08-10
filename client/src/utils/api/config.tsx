export const API_URL = "http://localhost:5500";

export const api = {
  API_URL: {
    auth: {
      login: "api/v1/login",
    },
    fleet: {
      add: "api/v1/addfleet",
      getall: "api/v1/getallfleet",
      delete: "/api/v1/deletefleet/{id}",
      update: "/api/v1/updatefleet/{id}",
    },
  },
};
