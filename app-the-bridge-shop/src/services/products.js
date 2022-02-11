const url = "/api"

export const getProducts = async (pageN = 1, orderField = "", order = 1, productName = "", manufacterId = "") => {
    const urlPath = `${url}/products?`;
    const urlQueryParams = urlPath + new URLSearchParams({
        pageN, orderField, order, productName, manufacterId
    });
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(urlQueryParams, options);
    const responseJSON = await response.json();
    return responseJSON;
}

export const findProductById = async (id) => {
    const urlPath = `${url}/products/${id}`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(urlPath, options);
    const responseJSON = await response.json();
    return responseJSON;
}