// Here we define the routes between URL and controller, then controller calls listevent methods
// Example: HTTP request (e.g. GET localhost:8080/api/events) -> controllers -> controller calls listevent methods

module.exports = app => {
    const events = require("../controllers/event.controller.js");
    var router = require("express").Router();
    
    // Create a new Event
    router.post("/", events.create);
    
    // Retrieve all events
    router.get("/", events.findAll);
    
    // Retrieve all finished/unfinished event
    router.get("/finished/:finished", events.findAllStatus);

    // Retrieve a single Event with id
    router.get("/:id", events.findOne);
    
    // Update a Event with id
    router.put("/:id", events.update);
    
    // Delete a Event with id
    router.delete("/:id", events.delete);
    
    // Delete all Events
    router.delete("/", events.deleteAll);
    
    // Access API through localhost:PORT/api/events
    app.use('/api/events', router);
  };