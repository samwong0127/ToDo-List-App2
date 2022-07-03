//
// This file defines the base URL where NodeJS Express server listening 
// `localhost:8080/api/events` in this case but `events` not added in here but in ToDoListServices.js
//
import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});