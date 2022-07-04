//
// Combine base URL from http-common.js with `events` and send requests 
//
import http from "../http-common";
class ToDoListDataServices {
    getAll() {
        return http.get("/events");
    }
	
	getAllStatus(finished){
        return http.get(`/events/finished/${finished}`)
    }
	
    get(id) {
        return http.get(`/events/${id}`);
    }
    create(data) {
        return http.post("/events", data);
    }

    update(id, data) {
        return http.put(`/events/${id}`, data);
    }
    delete(id) {
        return http.delete(`/events/${id}`);
    }
    deleteAll() {
        return http.delete(`/events`);
    }
    
}
export default new ToDoListDataServices();