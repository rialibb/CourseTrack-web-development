import { sql } from "../database/database.js";

const createItem = async (shopping_list_id, name) => {
  await sql`INSERT INTO
  shopping_list_items (shopping_list_id, name)
    VALUES (${shopping_list_id}, ${name})`;
};

const findNoCollectedItems = async (shopping_list_id) => {
  const rows = await sql`SELECT * FROM shopping_list_items
    WHERE shopping_list_id = ${ shopping_list_id } AND collected = false
    ORDER BY name`;

  if (rows && rows.length > 0) {
    return rows;
  }

  return false;   
};


const findCollectedItems = async (shopping_list_id) => {
    const rows = await sql`SELECT * FROM shopping_list_items
      WHERE shopping_list_id = ${ shopping_list_id } AND collected = true
      ORDER BY name`;
  
    if (rows && rows.length > 0) {
      return rows;
    }
  
    return false; 
};


const markCollected = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected = true WHERE id = ${ id }`;
};

export { createItem, findNoCollectedItems, findCollectedItems, markCollected };