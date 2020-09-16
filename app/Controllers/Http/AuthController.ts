import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User";
import UserDatum from "App/Models/UserDatum";
import ImageKit from "imagekit";
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

    /**
     * Create data for new User
     */
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
    try {
      const email = request.input("email");
      const password = request.input("password");
      // const rememberUser = !!request.input("remember_me");
      const token = await auth.use("api").attempt(email, password);
      return token.toJSON();
    } catch (error) {
      if (error.code === "E_INVALID_AUTH_UID") {
        return {
          error: false,
          body: "email invalid",
        };
      }

      if (error.code === "E_INVALID_AUTH_PASSWORD") {
        return {
          error: false,
          body: "password invalid",
        };
      }

      return {
        error: true,
        body: error?.message,
      };
    }
  }
  /**
   * user
   */
  public async user({ auth }) {
    const user = await auth.authenticate();
    let { id, email } = user;

    const data = await UserDatum.findBy("user_id", id);
    return {
      user: {
        id,
        email,
        name: data?.name,
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
  /**
   * Imagekit authenticationEndpoint
   */
  public async imagekit() {
    var imagekit = new ImageKit({
      publicKey: "public_t6UeKKcEy6g778ZK3+vb7MTHkow=",
      privateKey: "private_xJ9caAzz5/QHLEvPQNgwy4KaZZE=",
      urlEndpoint: "https://ik.imagekit.io/uhm4mfi8fp",
    });

    var authenticationParameters = imagekit.getAuthenticationParameters();
    return authenticationParameters;
  }
}
