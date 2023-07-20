import * as shoppingListItemsService from "../services/shoppingListItemsService.js";
import * as requestUtils from "../utils/requestUtils.js";


const createItemName = async (request) => {

  const formData = await request.formData();
  const name = formData.get("name");

  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  
  await shoppingListItemsService.createItem(urlParts[2], name);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const finishItem = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListItemsService.markCollected(urlParts[4]);
  
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createItemName, finishItem };