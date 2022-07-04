<template>
<div class="list row">
    <div class="col-md-6">
        <h4>To-Do List</h4>
		<button class="m-3 btn btn-sm btn-success" @click="fetchAllStatusEvents(true)">
          View Finished events
        </button>
        <button class="m-3 btn btn-sm btn-warning" @click="fetchAllStatusEvents(false)">
          View Pending events
        </button>
        
        <ul class="list-group">
        <li class="list-group-item"
         :class="{ active: index == currentIndex }"
          v-for="(event, index) in events"
            :key="index"
            @click="setActiveEvent(event, index)"
        >
          {{ event.title }}

        </li>
        </ul>
      <button class="m-3 btn btn-sm btn-danger" @click="removeAllEvents">
        Remove All
      </button>
    </div>
    
    <div class="col-md-6">
      <div v-if="currentEvent">
        <h4>Event details</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentEvent.title }}
        </div>
        <div>
          <label><strong>Status:</strong></label> {{ currentEvent.finished ? " Finished" : " Pending" }}
        </div>
        <router-link :to="'/events/' + currentEvent.id" class="btn btn-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Event...</p>
      </div>
    </div>

</div>

</template>
<script>
import ToDoListServices from "../services/ToDoListServices";
export default {
    name: "to-do-list",
    data() {
        return {
        events: [],
        currentEvent: null,
        currentIndex: -1,
        title: ""
        };
    },
    methods: {
        fetchAllEvents() {
            ToDoListServices.getAll()
            .then(response => {
                this.events = response.data;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        },
		
		fetchAllStatusEvents(status) {
            ToDoListServices.getAllStatus(status)
            .then(response => {
                this.events = response.data;
                console.log(response.data);
                //this.currentEvent = null;
                //this.currentIndex = -1;
            })
            .catch(e => {
                console.log(e);
            });
        },
        
        refreshToDoList() {
            this.fetchAllEvents();
            this.currentEvent = null;
            this.currentIndex = -1;
        },
        
        setActiveEvent(event, index) {
            this.currentEvent = event;
            this.currentIndex = event ? index : -1;
        },
        
        removeAllEvents() {
            ToDoListServices.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshToDoList();
            })
            .catch(e => {
                console.log(e);
            });
        }

    },
    
    mounted() {
        this.fetchAllEvents();
    }

};

</script>
<style>
.line-through {
    text-decoration: line-through;
}
</style>