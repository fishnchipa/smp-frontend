import { validatedWithUserGet } from "../auth/middleware";
import { setRecordSchema, setSchema } from "../schema/SetSchema";

export async function getCollectionList() {
  return await validatedWithUserGet(setRecordSchema.array(), `collection/list`)
}

export async function getCollection(setId: string) {
  return await validatedWithUserGet(setSchema, `collection?id=${setId}`)
}

