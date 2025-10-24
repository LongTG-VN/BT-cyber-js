class apiService {
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

  Delete(id) {
    const promise = axios({
      url: `https://68f22381b36f9750deeb8af6.mockapi.io/api/product/${id}`,
      method: "delete"
    })
    return promise;

  }

  addAPI(product) {
    const promise = axios({
      url: "https://68f22381b36f9750deeb8af6.mockapi.io/api/product",
      method: "post",
      data: product,
    })
    return promise;
  }

  EditApi(product) {
    const promise = axios({
      url: `https://68f22381b36f9750deeb8af6.mockapi.io/api/product/${product.id}`,
      method: "put",
      data: product,
    })
    return promise;
  }


}

export default apiService;