import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/userModel";
import { jwtSigner } from "../utils/jwtSigner";
import { jwtVerifier } from "../utils/jwtVerifier";
import {
  UserRequestCreate,
  userValidatorCreate,
} from "../validators/userValidatorCreate";
import {
  UserRequestLogin,
  userValidatorLogin,
} from "../validators/userValidatorLogin";

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
  let data: UserRequestCreate;

  try {
    data = await userValidatorCreate(cli.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  let user;

  try {
    user = await userModel.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: await bcrypt.hash(data.password, 10),
      isAdmin: data.isAdmin,
    } satisfies UserRequestCreate);
  } catch (error) {
    if (error?.code === 11000) {
      res.status(400).send("este email ya esta en uso");
      return;
    }
    res.sendStatus(500);
    return;
  }

  res.status(201).json(user);
};

export const login = async (cli: Request, res: Response) => {
  let data: UserRequestLogin;

  try {
    data = await userValidatorLogin(cli.body);
  } catch (error) {
    res.status(400).json(error);
    return;
  }

  const user = await userModel.findOne({ email: data.email });

  if (null === user) {
    res.status(404).send("el usuario no existe");
    return;
  }

  if (false === (await bcrypt.compare(data.password, user.password))) {
    res.status(400).send("contraseña incorrecta");
    return;
  }

  const jwtToken = await jwtSigner({
    _id: user._id,
  });

  res.status(200).json({ jwt: jwtToken });
};
