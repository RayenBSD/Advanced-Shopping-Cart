let result: null | any = null;

const store:any = async () => {
    await fetch('https://fakestoreapi.com/products')
    .then(async (res) => {
        return await res.json()
    })
    .then(js => result = js)
    .catch(e => console.error(e));
}

const storeJSON:any = async () => {

    await store();

    //console.log(result);
    
    if (result) {
        //console.log(JSON.stringify(result));
        return JSON.stringify(result)
    } 
    return JSON.stringify([]);
}
    
export default storeJSON;
//console.log(storeJSON);                           