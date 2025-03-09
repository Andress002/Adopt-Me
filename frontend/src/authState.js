import { reactive } from "vue";

const authState = reactive({
  isAuthenticated: !!localStorage.getItem("token"),
  userRole: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : "user",
});

export default authState;
