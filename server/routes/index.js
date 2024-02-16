import AuthRoute from "./auth-route.js";
import UserRoute from "./user-route.js";
import ProjectRoute from "./project-route.js";
import TaskRoute from "./task-route.js";
import FileRoute from "./file-route.js";
import config from "../config/config.js";

// following are the routes and endpoint of specific sections
export default (app) => {
  app.use(`${config.version}/auth`, AuthRoute);
  app.use(`${config.version}/users`, UserRoute);
  app.use(`${config.version}/project`, ProjectRoute);
  app.use(`${config.version}/task`, TaskRoute);
  app.use(`${config.version}/file`, FileRoute);
};
