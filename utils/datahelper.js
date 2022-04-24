import * as client1   from "../utils/client1.json";
import * as client2   from "./data_client2.js";



export const clientData =  async (clientId) => {
    if (clientId === 1) {
        console.log(client1)
        const json = await returnFile();
        return json;

    } else
        return client2
}

async function returnFile (){
    return client1;
}

//import * as data from './example.json';
//const {name} = data;
//console.log(name); // output 'testing'