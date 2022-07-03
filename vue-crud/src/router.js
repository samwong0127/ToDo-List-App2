import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
        path: "/",
        alias:"/events",
        name: "to-do-list",
        component: () => import("./components/ToDoList")
    },
    {
        path: "/addevent",
        name: "addevent",
        component: () => import("./components/AddEvent")
    },
    {
        path: "/events/:id",
        name: "event-details",
        component: () => import("./components/Event")
      },
    

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;