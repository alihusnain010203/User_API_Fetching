const URL = "https://jsonplaceholder.typicode.com/users/";
const fetchbtn = document.querySelector(".fetch");
const dialog = document.querySelector(".dialog");
let tbody = document.querySelector(".table-body");

let users_Data;

let selected_User;

const updateDisplay = () => {
  tbody.innerHTML = "";
  users_Data.forEach((user) => {
    let tr = document.createElement("tr");
    let html = `<td>${user.id}</td>
              <td>${user.name}</td>   
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.address.city}</td>
              <td>${user.phone}</td>
              <td>${user.website}</td>
              <td>${user.company.name}</td>
              <td><button class="btn" onclick="viewDetails(${user.id})">View Details</button></td>
              <td><button class="btn" onclick="deleteRecord(${user.id})">Delete</button></td>`;
    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
};

const fetchData = async () => {
  const data = await fetch(URL);
  users_Data = await data.json();

  users_Data.forEach((user) => {
    let tr = document.createElement("tr");
    let html = `<td>${user.id}</td>
             <td>${user.name}</td>
             <td>${user.username}</td>
             <td>${user.email}</td>
             <td>${user.address.city}</td>
             <td>${user.phone}</td>
             <td>${user.website}</td>
             <td>${user.company.name}</td>
             <td><button class="btn" onclick="viewDetails(${user.id})">View Details</button></td>
             <td><button class="btn" onclick="deleteRecord(${user.id})">Delete</button></td>
             `;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
};

fetchbtn.addEventListener("click", fetchData);

async function deleteRecord(userId) {
  await fetch(`${URL}${userId}`, {
    method: "DELETE",
  });

  users_Data.splice(userId - 1, 1);

  updateDisplay();
}

async function viewDetails(userId) {
  const response = await fetch(`${URL}${userId}`);
  selected_User = await response.json();
  let html = `<h2>${selected_User.name}</h2>
<p>Username: ${selected_User.username}</p>
<p>Email: ${selected_User.email}</p>
<p>Phone: ${selected_User.phone}</p>
<p>Website: ${selected_User.website}</p>
<p>Company: ${selected_User.company.name}</p>
<p>Address: ${selected_User.address.street}, ${selected_User.address.suite}, ${selected_User.address.city}, ${selected_User.address.zipcode}</p>
<button class="btn" onclick="editRecord(${userId})">Edit</button>
<button class="btn" onclick="closeDialog()">Close</button>`;
  dialog.innerHTML = html;

  dialog.removeAttribute("close");
  dialog.setAttribute("open", open);
}

let closeDialog = () => {
  dialog.removeAttribute("open");
  dialog.setAttribute("close", close);
};

let editRecord = (userId) => {
  let html = `<h2>Edit User</h2>
<form>
  <label for="name">Name:</label><br>
  <input type="text" id="name" name="name" value="${selected_User.name}"><br>
  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" value="${selected_User.username}"><br>
  <label for="email">Email:</label><br>
  <input type="text" id="email" name="email" value="${selected_User.email}"><br>
  <label for="phone">Phone:</label><br>
  <input type="text" id="phone" name="phone" value="${selected_User.phone}"><br>
  <label for="website">Website:</label><br>
  <input type="text" id="website" name="website" value="${selected_User.website}"><br>
  <label for="company">Company:</label><br>
  <input type="text" id="company" name="company" value="${selected_User.company.name}"><br>
  <label for="address">Address:</label><br>
  <input type="text" id="address" name="address" value="${selected_User.address.street}, ${selected_User.address.suite}, ${selected_User.address.city}, ${selected_User.address.zipcode}"><br>
  <button class="btn" onclick="updateRecord(${userId})">Update</button>
  <button class="btn" onclick="closeDialog()">Close</button>
  `;
  dialog.innerHTML = html;
};

let updateRecord = async (userId) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let website = document.getElementById("website").value;
  let company = document.getElementById("company").value;
  let address = document.getElementById("address").value;

  await fetch(`${URL}${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      id: userId,
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
      company: company,
      address: address,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  users_Data[userId - 1].name = name;
  users_Data[userId - 1].username = username;
  users_Data[userId - 1].email = email;
  users_Data[userId - 1].phone = phone;
  users_Data[userId - 1].website = website;
  users_Data[userId - 1].company.name = company;
  users_Data[userId - 1].address.street = address;

  updateDisplay();

  closeDialog();
};
