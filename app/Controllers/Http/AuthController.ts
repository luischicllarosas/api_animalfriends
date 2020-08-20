import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class AuthController {
  /**
   * Register
   */
  public async register({ request }: HttpContextContract) {
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

    return "Your account has been created";
  }
  /**
   * Login
   */
  public async login({ auth, request }: HttpContextContract) {
    // try {
      const email = request.input("email");
      const password = request.input("password");
      // const rememberUser = !!request.input("remember_me");

      // await auth.attempt(email, password, rememberUser);
      // // await auth.login(user, rememberUser)
      // response.redirect("/dashboard");
      const token = await auth.use("api").attempt(email, password);
      return token.toJSON();
    // } catch (error) {
    //   if (error.code === "E_INVALID_AUTH_UID") {
    //     console.log('// unable to find user using email address');
    //   }
    //   if (error.code === "E_INVALID_AUTH_PASSWORD") {
    //     console.log('// password mis-match');
    //   }
    // }
  }
  /**
   * user
   */
  public async user({ auth }) {
    const user = await auth.authenticate();
    let { id, email } = user;
    return {
      user: {
        id,
        email,
      },
    };
  }
  /**
   * Logout
   */
  public async logout({ auth }) {
    const user = await auth.authenticate();
    let userId = user.id;

    await Database.from("api_tokens").where("user_id", userId).delete();
  }
}
