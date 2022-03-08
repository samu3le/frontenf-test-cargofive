export default [
  {
    name: "Login",
    path: "/login",
    text: "Login",
    component: "auth/SignIn",
    isActive: true,
    hiddenInTheSidebar: true,
  },
  {
    name: "Register",
    path: "/register",
    text: "Register",
    component: "auth/SignUp",
    // divider: true,
    isActive: true,
    hiddenInTheSidebar: true,
  },
  {
    name: "user",
    path: "/users",
    text: "User",
    component: "user/Management",
    isActive: true,
    requiresAuth: true,
  },
];
