const express = require("express");
const app = express();
const routes = require("./routes");
const auth = require("./middlewares/auth");

require("dotenv").config();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
/* app.use(fileUpload()); for later */ 

// Routes
app.use('/', routes.auth);                     
app.use('/users', routes.users); 
app.use('/tasks', routes.tasks); 
app.use('/img', routes.img);
/* app.use('/tasks/:id/msg', routes.tasks);  */
/* app.use('/tasks/:id/img', routes.tasks);  */

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
}) 

