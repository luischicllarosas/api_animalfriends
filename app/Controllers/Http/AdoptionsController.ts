import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// const imagekit_private_key = "private_xJ9caAzz5/QHLEvPQNgwy4KaZZE=";

var ImageKit = require("imagekit");
// var fs = require("fs");

var imagekit = new ImageKit({
  publicKey: "public_t6UeKKcEy6g778ZK3+vb7MTHkow=",
  privateKey: "private_xJ9caAzz5/QHLEvPQNgwy4KaZZE=",
  urlEndpoint: "https://ik.imagekit.io/uhm4mfi8fp",
});
export default class AdoptionsController {
  // public async index (ctx: HttpContextContract) {
  // }

  // public async create (ctx: HttpContextContract) {
  // }

  public async store({ request }: HttpContextContract) {
    const avatar = request.file("images");

    if (!avatar) {
      return "Please upload file";
    }
    // imagekit_pkey;
    // await avatar.move(Application.tmpPath("uploads"));

    return "File uploaded successfully";
  }

  // public async show (ctx: HttpContextContract) {
  // }

  // public async edit (ctx: HttpContextContract) {
  // }

  // public async update (ctx: HttpContextContract) {
  // }

  // public async destroy (ctx: HttpContextContract) {
  // }
}
