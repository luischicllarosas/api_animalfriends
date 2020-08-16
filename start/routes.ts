/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

// Route.resource("users", "UsersController").apiOnly();
Route.group(() => {
  // Auth
  Route.group(() => {
    Route.post("register", "AuthController.register");
    Route.post("login", "AuthController.login");
    Route.post("logout", "AuthController.logout");
    Route.get("user", "AuthController.user");
  }).prefix("auth");
}).prefix("api/");

// Dashboard
Route.get("dashboard", async ({ auth }) => {
  await auth.authenticate(); //  👈 All you need to go
  const user = await auth.authenticate();
  return `Hello user! Your email address is ${user.email}`;
});
// Verify connection :
Route.get("health", async ({ response }) => {
  const report = await HealthCheck.getReport();

  return report.healthy ? response.ok(report) : response.badRequest(report);
});
Route.post("params", async ({ request }) => {
  // console.log(request);
});
