const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
  };
  // Secure Cross-Origin Requests and data transfers
  app.use(cors(corsOptions));
  // parse requests of JSON
  app.use(express.json());
  // parse requests of urlencoded
  app.use(express.urlencoded({ extended: true }));
  
  // Test page
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Sam's To-Do List application." });
  });

  // Routes
  require("./app/routes/event.routes.js")(app);
  
  // Server listen on port 8080 for in coming requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
