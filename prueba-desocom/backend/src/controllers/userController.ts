import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel, {
  UserRequestCreate,
  UserRequestLogin,
} from "../models/userModel";
import { jwtSigner } from "../utils/jwtSigner";

export const getAll = async (cli: Request, res: Response) => {
  const users = await userModel.find();

  if (0 === users.length) {
    res.status(404).send("todavia no hay ningun usuario");
    return;
  }

  res.json(users);
};

export const create = async (cli: Request, res: Response) => {
  let { email, name, password, isAdmin } = cli.body as UserRequestCreate;

  if (name.trim().length < 3) {
    res.status(400).send("el nombre debe tener 3 o mas caracteres");
    return;
  }

  // todo: check valid email

  if (password.length < 8) {
    res.status(400).send("la contraseña debe tener 8 o mas caracteres");
    return;
  }

  const user = await userModel.create({
    name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    isAdmin,
  } satisfies UserRequestCreate);

  res.status(201).json(user);
};

export const login = async (cli: Request, res: Response) => {
  let { email, password } = cli.body as UserRequestLogin;

  const user = await userModel.findOne({ email });

  if (null === user) {
    res.status(404).send("el usuario no existe");
    return;
  }

  if (false === (await bcrypt.compare(password, user.password))) {
    res.status(400).send("contraseña incorrecta");
    return;
  }

  const jwtToken = await jwtSigner({
    _id: user._id,
  });

  res.status(200).json({ jwt: jwtToken });
};
