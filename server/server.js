import app from "./app.js";

//Here we are giving the Port No where we are running our TaskTracker application
const port = 9000;

// the application is hosted on 9000 port
let server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default server;
