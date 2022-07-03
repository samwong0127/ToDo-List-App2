const ListEvent = require("../models/listevent.model.js");
// Create and Save a new Event
exports.create = (req, res) => {
    if (!req.body){
        // 400 Bad request
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create an Event
    const event = new ListEvent({
        title: req.body.title,
        finished: req.body.finished || false
    });
    // Save Event in the database
    ListEvent.create(event, (err, data) => {
        if (err)
            // 500 
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Event."
        });
        else res.send(data);
    });
};


// Retrieve all Events from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    ListEvent.getAll(title, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
        });
        else res.send(data);
    });
};

// find all finished/unfinished Events
exports.findAllStatus = (req, res) => {
    const finished = req.params.finished;
    ListEvent.findAllStatus(finished, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving events."
        });
        else res.send(data);
    });
};

// Find an Event with an ID
exports.findOne = (req, res) => {
    ListEvent.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Not found") {
                res.status(404).send({message: `Event with id ${req.params.id} not Found.`});
            } 
            else {
                res.status(500).send({message: "Error when retrieving Event with id " + req.params.id});
            }
        } 
        else res.send(data);
    });
};

// Update an Event with an ID
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
    console.log(req.body);
    ListEvent.updateById(req.params.id, new ListEvent(req.body), (err, data) => {
        if (err) {
            if (err.kind === "Not found") {
                res.status(404).send({message: `Event with id ${req.params.id} not Found.`});
            } else {
                res.status(500).send({message: "Error when updating Event with id " + req.params.id});
            }
        } else res.send(data);
        }
    );
};
// Delete an Event that with an ID
exports.delete = (req, res) => {
    ListEvent.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "Not found") {
                res.status(404).send({message: `Event with id ${req.params.id} not Found.`});
            } 
            else {
                res.status(500).send({message: "Could not delete Event with id " + req.params.id});
            }
        }
        else res.send({ message: `Event deleted successfully!` });
    });
};
// Delete all Events from the database
exports.deleteAll = (req, res) => {
    ListEvent.deleteAll((err, data) => {
        if (err) {
            res.status(500).send({message: "Could not delete all Events"});
        }
        else res.send({ message: `All Events deleted successfully!` });
    });
};