import mongoose from "mongoose";
import { mongoConnect } from "../config/mongoDB";

let TestModel: any = undefined;
let collection = "dbtests";

interface testModel {
  first_name: string;
  last_name: string;
}

describe("Prueba de conexión con MongoDB", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test("Se crea schema y collection para testear", async () => {
    let testSchema = new mongoose.Schema<testModel>({
      first_name: String,
      last_name: String,
    });

    TestModel = mongoose.model<testModel>(collection, testSchema);
  });

  test("Se inserta un usuario de prueba", async () => {
    let user = new TestModel({ first_name: "Bernardo", last_name: "Arrechea" });
    await user.save();
  });

  test("Se borra el usuario creado", async () => {
    let user = TestModel.find({});
    await user.deleteOne();
  });

  test("Se borra la colección para la prueba de este test", async () => {
    await mongoose.connection.db.dropCollection(collection);
  });
});

//how to center a div?
