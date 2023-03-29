const addToLocalDB = (id, quantity) => {
    let dataObj = localStorage.getItem("dataObj");
    if(dataObj) {
        dataObj = JSON.parse(localStorage.getItem("dataObj"));
    }else {
        dataObj = {};
    }
    dataObj[id] = quantity;
    localStorage.setItem("dataObj", JSON.stringify(dataObj));
}

export const getDataFromLocalDB = () => {
    let dataObj = JSON.parse(localStorage.getItem("dataObj"));
    return dataObj;
}

export const removeAllDataFromLocalDB = () => {
    localStorage.removeItem("dataObj");
}

export default addToLocalDB;