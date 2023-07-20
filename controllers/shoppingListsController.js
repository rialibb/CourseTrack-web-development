import { renderFile } from "../deps.js";
import * as shoppingListsService from "../services/shoppingListsService.js";
import * as shoppingListItemsService from "../services/shoppingListItemsService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await shoppingListsService.create(name);

  return requestUtils.redirectTo("/lists");
};
/////////////////////////////////////////////////////// Completed (but is can be is shoppingListItemsController)
const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  
  const data = {
    list: await shoppingListsService.findById(urlParts[2]),
    NoCollectedItems: await shoppingListItemsService.findNoCollectedItems(urlParts[2]),
    CollectedItems : await shoppingListItemsService.findCollectedItems(urlParts[2]),
  };
  
  return new Response(await renderFile("shoppingList.eta", data), responseDetails);
};
////////////////////////////////////////////
const viewLists = async (request) => {
  const data = {
    lists: await shoppingListsService.findAllNonCompletedLists(),
  };

  return new Response(await renderFile("shoppingLists.eta", data), responseDetails);
};

const finishList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListsService.deactivate(urlParts[2]);
  
    return requestUtils.redirectTo(`/lists`);
};

export { addList, viewList, viewLists, finishList };