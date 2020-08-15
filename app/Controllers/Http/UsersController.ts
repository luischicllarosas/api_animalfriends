// import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UsersController {
  public async index() {
    return { user: "Todos los usuarios" };
  }

  // public async create(ctx: HttpContextContract) {}

  // public async store(ctx: HttpContextContract) {}

  // public async show(ctx: HttpContextContract) {}

  // public async edit(ctx: HttpContextContract) {}

  // public async update(ctx: HttpContextContract) {}

  // public async destroy(ctx: HttpContextContract) {}
}
