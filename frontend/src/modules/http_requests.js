import {getCookie} from "./cookies";

const baseURL = "https://bundle-edinburgh-gathered-treating.trycloudflare.com/ssys/backend";

const imagePostReq = async (url, image, email) => {
    url = baseURL + url;
    try {
        let body = new FormData();
        body.append('image', image);
        body.append('email', email);
        body.append('submit', true);
        let response = await fetch(url, {
            method: 'POST',
            body: body
        })
        const data = await response.json();
        if (!response.ok) {
            return Promise.resolve(JSON.stringify(data));
        }
        return Promise.resolve(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
}

const httpReq = async (url, method = "GET", params = {}) => {
    const token = getCookie("token");
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.error("invalid method");
        return false;
    }
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {
                cache: 'no-cache',
                headers: {
                    //Authorization: "Bearer " + token
                }
            });
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache',
                // mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: "Bearer " + token
                },
                body: JSON.stringify(params) // body data type must match "Content-Type" header
            });
        }
        const data = await response.json();
        if (!response.ok) {
            return Promise.resolve(JSON.stringify(data));
        }
        return Promise.resolve(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
}

export {httpReq, imagePostReq, baseURL};