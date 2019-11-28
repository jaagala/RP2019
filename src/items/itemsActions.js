export const getItems = () => {
    return fetch("/api/v1/products")
        .then(res => {
            //console.log("res", res);
            return res.json();
        });
};