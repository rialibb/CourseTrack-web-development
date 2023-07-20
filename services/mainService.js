import { sql } from "../database/database.js";


const numbLists = async () => {
    const rows = await sql`SELECT COUNT(name) AS count
        FROM shopping_lists`;
  
    if (rows && rows[0] && rows[0].count>0) {
      return rows[0].count;
    }
  
    return false ;
};


const numbItems = async () => {
    const rows = await sql`SELECT COUNT(name) AS count
        FROM shopping_list_items`;
  
    if (rows && rows[0] && rows[0].count) {
      return rows[0].count;
    }
  
    return 0;
};


export { numbLists, numbItems };