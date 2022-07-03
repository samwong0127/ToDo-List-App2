<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">My To-Do List</router-link>
      
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Refresh</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addevent" class="nav-link">Add</router-link>
        </li>
      </div>

    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>


</template>

<script>

export default {
  name: 'App'
};
</script>

