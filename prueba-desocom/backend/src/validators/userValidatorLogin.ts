import vine, { errors } from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

export type UserRequestLogin = Infer<typeof schema>;

const schema = vine.object({
  email: vine.string().trim().email().toLowerCase(),
  password: vine.string().minLength(8).maxLength(32),
});

const validator = vine.compile(schema);

export async function userValidatorLogin(data: any) {
  try {
    const output = await validator.validate(data);

    return output;
  } catch (error) {
    const messages = error.messages as { message: string }[];

    throw messages.map((item) => item.message);
  }
}
