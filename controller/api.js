class Api {
    getListApi() {
        const promise = axios({
            url: "https://68f22381b36f9750deeb8af6.mockapi.io/api/product",
            method: "get"
        })
        return promise;
    }
    getProduct(id) {

        const promise = axios({
            url: `https://68f22381b36f9750deeb8af6.mockapi.io/api/product/${id}`,
            method: "get"
        })
        return promise;

    }


}

export default Api