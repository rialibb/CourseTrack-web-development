import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {                //change it with the name of my database
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

export { sql };