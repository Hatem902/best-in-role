import z from "zod";

/* const roleSchemas = roles.map((role) =>
  z.object({ [`${role}Id` as keyof typeof roles]: z.number() }),
); */
//TODO: fix typescript errors (It has to do with new versions of dependencies?)
// @ts-ignore
/* export const userVoteSchema = z.union(roleSchemas); */

export const userRolePatchSchema = z.number();
