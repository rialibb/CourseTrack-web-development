import { renderFile } from "../deps.js";
import * as mainService from "../services/mainService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

const statistics = async (request) => {
    const data = {
      lists: await mainService.numbLists(),
      items : await mainService.numbItems(),
    };
  
    return new Response(await renderFile("main.eta", data), responseDetails);
};


export { statistics };