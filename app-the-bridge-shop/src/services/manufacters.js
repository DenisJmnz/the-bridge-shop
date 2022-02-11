const url = "/api"

export const getManufacters = async () => {
    const urlPath = `${url}/manufacters`;
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const response = await fetch(urlPath,options);
    const responseJSON = await response.json();
    return responseJSON;
}