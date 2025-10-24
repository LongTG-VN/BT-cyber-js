import Product from "../models/product.js";
import apiService from "../services/apiServices.js";

console.log(1);


const api = new apiService();

const getListAPI = () => {
  const promise = api.getListApi();
  promise
    .then((result) => {
      console.log(result.data);
      renderTable(result.data);
    }).catch((err) => {

    });




}

getListAPI();


const renderTable = (array) => {
  let contentHTML = "";
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    contentHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${element.Name}</td>
        <td>${element.price}</td>
        <td><img src="./../../../img/${element.img}.jpg" width="50"/></td>
        <td>${element.des}</td>
        <td><button class="btn btn-danger" onclick="handleDelete(${element.id})">Xoá</button>
       <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="handleEdit(${element.id})">Update</button></td>
      </tr>
    `;
  }

  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};


const handleDelete = (id) => {
  const promise = api.Delete(id);
  promise
    .then((result) => {
      getListAPI();
    }).catch((err) => {
    });

}

window.handleDelete = handleDelete


const displayProduct = (product) => {

  document.getElementsByClassName("modal-title")[0].innerHTML = "edit";


  document.getElementById("TenSP").value = product.Name;
  document.getElementById("GiaSP").value = product.price;
  document.getElementById("HinhSP").value = product.img;
  document.getElementById("Mota").value = product.des;

  document.getElementsByClassName("modal-footer")[0].innerHTML = `<button class="btn btn-success" onclick="handleEditForm(${product.id})">edit</button>`

}


const handleEditForm = (id) => {


  const Name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const des = document.getElementById("Mota").value;

  const product = new Product(id, Name, price, des, img);

  const promise = api.EditApi(product);

  promise
    .then((result) => {
      getListAPI();
      document.getElementsByClassName("close")[0].click();

    }).catch((err) => {

    });
}


window.handleEditForm = handleEditForm;



const handleEdit = (id) => {
  const promise = api.getProduct(id);

  promise
    .then((result) => {
      console.log(result.data);
      displayProduct(result.data);

    }).catch((err) => {

    });

}



window.handleEdit = handleEdit


document.getElementById("btnThemSP").onclick = function () {
  document.getElementsByClassName("modal-title")[0].innerHTML = "add";

  document.getElementById("TenSP").value = "";
  document.getElementById("GiaSP").value = "";
  document.getElementById("HinhSP").value = "";
  document.getElementById("Mota").value = "";

  document.getElementsByClassName("modal-footer")[0].innerHTML = `<button class="btn btn-success" onclick="handleAdd()">Add</button>`
}

const handleAdd = () => {


  const Name = document.getElementById("TenSP").value;
  const price = document.getElementById("GiaSP").value;
  const img = document.getElementById("HinhSP").value;
  const des = document.getElementById("Mota").value;

  const product = new Product("", Name, price, des, img);

  const promise = api.addAPI(product);

  promise
    .then((result) => {
      getListAPI();
      document.getElementsByClassName("close")[0].click();
    }).catch((err) => {

    });


}

window.handleAdd = handleAdd;


