import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import UserDatum from "App/Models/UserDatum";
// import Database from "@ioc:Adonis/Lucid/Database";

export default class AuthController {
  /**
   * Register
   */
  public async register({ request }: HttpContextContract) {
    /**
     * Validate email exist
     */
    let email = request.input("email"); // let registered = await Database.from('users').where('email',email);
    let registered = await User.findBy("email", email);

    if (registered) {
      return {
        error: false,
        body: "email exists",
      };
    }
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
    let newUser = await user.save();

    let uData = new UserDatum();
    uData.user_id = newUser.id;
    uData.name = request.input("name");
    await uData.save();

    return {
      error: false,
      body: "created",
    };
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
    const { id } = await auth.authenticate();
    // User id
    await Database.from("api_tokens").where("user_id", id).delete();
  }
}
