import { serve } from "./deps.js";

import { configure } from "./deps.js";
import * as shoppingListsController from "./controllers/shoppingListsController.js";
import * as shoppingListItemsController from "./controllers/shoppingListItemsController.js";
import * as mainController from "./controllers/mainController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.statistics(request); 
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListsController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListsController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await shoppingListsController.viewList(request);
  } else if (url.pathname.match("lists/[0-9]+/deactivate") && request.method === "POST") {
    return await shoppingListsController.finishList(request);
  } else if (url.pathname.match("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await shoppingListItemsController.finishItem(request);
  } else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await shoppingListItemsController.createItemName(request);
  } else {
    return new Response("Not found", { status: 404 });///////////////////////////////////
  }
};

serve(handleRequest, { port: 7777 });