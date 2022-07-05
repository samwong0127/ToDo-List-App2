<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <div class="input-col">
        <label for="title">Title</label>
        <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="event.title"
            name="title"
        />
        </div>
        <div class="input-col">
        <label for="status"> Finished?: </label>
        <select v-model="event.selected">
          <option disabled value=""> Please select one</option>
          <option>Yes</option>
          <option>Not yet</option>
        </select>
        </div>
      </div>
      <button @click="saveEvent" class="btn btn-success" style="{{padding:10px}}">Submit</button>
    </div>
    <div v-else>
      <h4>New event added!</h4>
      Click Refresh to see the full list or click
      <button class="btn btn-success" @click="newEvent">here</button> to add another event
    </div>
  </div>
</template>
<script>
import ToDoListServices from "../services/ToDoListServices";
export default {
    name: "add-event",
    data() {
        return {
        event: {
            id: null,
            title: "",
            finished: false
        },
        submitted: false
        };
    },
    methods: {
        saveEvent() {
        var data = {
            title: this.event.title,
            finished: (this.event.selected == "Yes") ? true: false
        };
        ToDoListServices.create(data)
            .then(response => {
                this.event.id = response.data.id;
                console.log(response.data);
                this.submitted = true;
            })
            .catch(e => {
                console.log(e);
            });
        },
        
        newEvent() {
            this.submitted = false;
            this.event = {};
        }
    }

};
</script>
<style>
.submit-form {
  max-width: 500px;
  margin: auto;
}
.input-col {
  margin:10px;
}

</style>