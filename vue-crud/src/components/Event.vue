<template>
  <div v-if="currentEvent" class="edit-form">
    <h4>Event</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" class="form-control" id="title" v-model="currentEvent.title"
        />
      </div>
      <div class="form-group">
        <label><strong>Status:</strong></label>{{ currentEvent.finished ? " Finished" : " Pending" }}
      </div>
    </form>

    <button class="btn btn-primary mr-2"
      v-if="currentEvent.finished"
      @click="updateStatus(false)"
    >
      Renew
    </button>
    <button v-else class="btn btn-primary mr-2"
      @click="updateStatus(true)"
    >
      Finish
    </button>
    <button class="btn btn-danger mr-2"
      @click="deleteEvent"
    >
      Delete
    </button>
    <button type="submit" class="btn btn-success mr-2"
      @click="updateEvent"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p class="event-details">Please click on an Event </p>
  </div>
</template>

<script>
import ToDoListServices from "../services/ToDoListServices";
export default {
  name: "list-event",
  data() {
    return {
      currentEvent: null,
      message: ''
    };
  },
  methods: {
    getEvent(id) {
      ToDoListServices.get(id)
        .then(response => {
          this.currentEvent = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateStatus(status) {
      var data = {
        id: this.currentEvent.id,
        title: this.currentEvent.title,
        finished: status
      };
      ToDoListServices.update(this.currentEvent.id, data)
        .then(response => {
          console.log(response.data);
          this.currentEvent.finished = status;
          this.message = 'Status updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateEvent() {
      ToDoListServices.update(this.currentEvent.id, this.currentEvent)
        .then(response => {
          console.log(response.data);
          this.message = 'Event title updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteEvent() {
      ToDoListServices.delete(this.currentEvent.id)
        .then(response => {
          console.log(response.data);
          this.message = 'This event is deleted! Please Refresh.';
          this.$router.push({ name: "events" });
          
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getEvent(this.$route.params.id);
  }
};
</script>
<style>
.event-details {
  border-style: double;
  border-width: 5px;
}

.submit-form {
  max-width: 500px;
  margin: auto;
}


</style>