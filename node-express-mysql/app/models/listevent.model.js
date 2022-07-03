const sql = require("./db.js");
//Event class contructor
const ListEvent = function(event) {
  this.title = event.title;
  this.finished = event.finished;
};

// Methods
ListEvent.create = (newEvent, result) => {
    sql.query("INSERT INTO to_do_list SET ?", newEvent, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Added event: ", { id: res.insertId, ...newEvent });
        result(null, { id: res.insertId, ...newEvent });
    });
};

ListEvent.findById = (id, result) => {
    sql.query(`SELECT * FROM to_do_list WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Found event: ", res[0]);
            result(null, res[0]);
            return;
        }
      // If event not found
      result({ kind: "Not found" }, null);
    });
};

ListEvent.getAll = (title, result) => {
    let query = "SELECT * FROM to_do_list";
    
    sql.query(query, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Events: ", res);
        result(null, res);
    });
};

ListEvent.findAllStatus = (finished , result) => {
    sql.query(`SELECT * FROM to_do_list WHERE finished = ${finished}`, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        console.log("Events: ", res);
        result(null, res);
    });
};

ListEvent.updateById = (id, listevent, result) => {
    
    sql.query("UPDATE to_do_list SET title = ?, finished = ? WHERE id = ?",
        [listevent.title, listevent.finished, id], (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // Event not found
            result({ kind: "Not found" }, null);
            return;
        }
        console.log("Updated event: ", { id: id, ...listevent });
        result(null, { id: id, ...listevent });
      }
    );
};

ListEvent.delete = (id, result) => {
    sql.query("DELETE FROM to_do_list WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        if (res.affectedRows == 0) {
            // Event not found
            result({ kind: "Not found" }, null);
            return;
        }
        console.log("Deleted event with id: ", id);
        result(null, res);
    });
};

ListEvent.deleteAll = result => {
    sql.query("DELETE * FROM to_do_list", (err, res) => {
        if (err) {
            console.log("Error: ", err);
            result(err, null);
            return;
        }
        
        console.log(`${res.affectedRows} event(s) deleted`);
        result(null, res);
    });
};

module.exports = ListEvent;

