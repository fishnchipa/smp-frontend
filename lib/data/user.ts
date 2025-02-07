import { validatedWithUserGet } from "../auth/middleware";
import { getUserSchema } from "../schema/UserSchema";



export async function getUser() {
  return await validatedWithUserGet(getUserSchema(), "user/info");
}
