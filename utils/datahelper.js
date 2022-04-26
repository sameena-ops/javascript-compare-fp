import * as client1   from "../utils/client1.json";



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

export const getStoresToBeSelected =  async (allStoreIds, numberOfStoresToSelect) => {

    return allStoreIds.slice(0,numberOfStoresToSelect);
}

function selectFromDropDown(randomStoreNames) {
    ///
    ///
    return true;
}

function selectRadioButtonFromDropdown(randomStoreNames) {
    //
    //
    return true;

}

function selectCheckboxFromDropdown(randomStoreNames) {
    //
    //
    return true;
}

export const selectStore =  async (clientId, randomStoreNames) => {
   if(clientId===1) {
       // .click
       // .click
       console.log(`Selected ${randomStoreNames} value from dropdown`)
       return true;

   }
    else if(clientId===2)
   {
       // .click
       // .click
       console.log(`Selected ${randomStoreNames} radio button from dropdown `)
       return true;

   }   else if(clientId===3)
   {
       // .click
       // .click
       console.log(`Selected ${randomStoreNames} checkboxes from dropdwon`)
       return true;

   }
}
