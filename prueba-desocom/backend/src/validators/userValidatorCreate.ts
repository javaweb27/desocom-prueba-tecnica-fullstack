import vine, { errors } from "@vinejs/vine";
import { Infer } from "@vinejs/vine/types";

export type UserRequestCreate = Infer<typeof schema>;

const schema = vine.object({
  name: vine.string().trim().minLength(3),
  email: vine.string().trim().email().toLowerCase(),
  password: vine.string().minLength(8).maxLength(32),
  isAdmin: vine.boolean(),
});

const validator = vine.compile(schema);

export async function userValidatorCreate(data: any) {
  try {
    const output = await validator.validate(data);

    return output;
  } catch (error) {
    const messages = error.messages as { message: string }[];

    throw messages.map((item) => item.message);
  }
}
