import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class AuthController {
  /**
   * Register
   */
  public async register({ request, auth, response }: HttpContextContract) {
    //
    /**
     * Validate user details
     */
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    });

    const userDetails = await request.validate({
      schema: validationSchema,
    });

    /**
     * Create a new user
     */
    const user = new User();
    user.email = userDetails.email;
    user.password = userDetails.password;
    await user.save();

    await auth.login(user);
    response.redirect("/dashboard");
  }
  /**
   * Login
   */
  public async login({ auth, request }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    // const rememberUser = !!request.input("remember_me");

    // await auth.attempt(email, password, rememberUser);
    // // await auth.login(user, rememberUser)
    // response.redirect("/dashboard");
    const token = await auth.use("api").attempt(email, password);
    return token.toJSON();
  }
  /**
   * user
   */
  public user({request}) {
    console.log("Estan llamando a user...");
    // console.log(request.requestBody);
    
    return request.requestBody;
  }
  /**
   * Logout
   */
  public async logout({ auth }) {
    // return auth;
    await auth.logout();
    // await Database.from("api_tokens").where("id", tokenId).delete();
  }
}
