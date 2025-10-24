import Api from "../controller/api.js";
import productManagement from "../module/ProductManagement.js";

const api = new Api();
const arr = new productManagement();

const getList = () => {
    api.getListApi()
        .then((result) => {
            genderList(result.data);
        })
        .catch((err) => console.log(err));
};
getList();

const genderList = (array) => {
    let contentHTML = "";
    array.forEach((element) => {
        contentHTML += `
      <div class="col flex d-flex justify-content-center">
        <div class="card" style="width: 18rem">
          <img src="../img/${element.img}.jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h5 class="card-title">${element.Name}</h5>
            <p class="card-text">${element.price}</p>
            <button class="btn btn-success" onclick="handleAdd(${element.id})">Add</button>
          </div>
        </div>
      </div>
    `;
    });
    document.getElementById("tableProduct").innerHTML = contentHTML;
};

const handleAdd = (id) => {
    api.getProduct(id)
        .then((result) => {
            arr.Add(result.data);
            renderCate(arr.getList());
            alert("✅ Thêm vào giỏ hàng thành công!");
        })
        .catch((err) => console.log(err));
};
window.handleAdd = handleAdd;

const renderCate = (array) => {
    SetLocalStore(array);
    let contentHTML = "";
    let total = 0;

    array.forEach((element, i) => {
        total += Number(element.price);
        contentHTML += `
      <tr>
        <th scope="row">${i + 1}</th>
        <td>${element.Name}</td>
        <td>${element.price}</td>
        <td><button class="btn btn-danger" onclick="handleDelete(${element.id})">Delete</button></td>
      </tr>
    `;
    });
    contentHTML += renderFooterTable(total);
    document.getElementById("tbody").innerHTML = contentHTML;
};

const renderFooterTable = (total) => `
  <p>Total: ${total}</p>
  <button class="btn btn-success" onclick="ThanhToan(${total})">Thanh Toán</button>
`;

const handleDelete = (id) => {
    arr.delete(id);
    renderCate(arr.getList());
};
window.handleDelete = handleDelete;

const ThanhToan = (total) => {
    const isConfirm = confirm("Bạn có chắc muốn thanh toán sản phẩm này không?");
    if (isConfirm) {
        arr.clear();
        SetLocalStore(arr.getList());
        renderCate(arr.getList());
    }
};
window.ThanhToan = ThanhToan;

const SetLocalStore = (arr) => {
    const value = JSON.stringify(arr);
    localStorage.setItem("listCate", value);
};

const getLocal = () => {
    const data1 = localStorage.getItem("listCate");
    if (data1) {
        console.log(" Có data trong LocalStorage");
        const arrData = JSON.parse(data1);
        arr.arr = arrData;
        renderCate(arr.getList());
    } else {
        console.log(" LocalStorage trống");
    }
};
getLocal();
