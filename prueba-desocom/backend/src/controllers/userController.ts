import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel, {
  UserRequestCreate,
  UserRequestLogin,
} from "../models/userModel";
import { jwtSigner } from "../utils/jwtSigner";
import { jwtVerifier } from "../utils/jwtVerifier";

export const getAll = async (cli: Request, res: Response) => {
  const jwtToken = cli.headers.authorization?.split(" ")[1];

  let payload: { _id: string; iat: number };

  try {
    payload = await jwtVerifier<{ _id: string; iat: number }>(jwtToken);
  } catch (error) {
    res.status(401).send("el jwt token es invalido, debes iniciar sesion");
    return;
  }

  const user = await userModel.findById(payload._id);

  if (null === user) {
    res
      .status(401)
      .send("el usuario no existe, crea una cuenta y luego inicia sesion");
    return;
  }

  if (true !== user.isAdmin) {
    res
      .status(403)
      .send("solo los administradores pueden ver la lista de usuarios");
    return;
  }

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
