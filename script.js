const URL = "https://jsonplaceholder.typicode.com/users/";
const fetchbtn = document.querySelector(".fetch");
const dialog = document.querySelector(".dialog");
let tbody = document.querySelector(".table-body");

let Usersdata;

let userData;

const updateDisplay = () => {
  tbody.innerHTML = "";
  Usersdata.forEach((user) => {
    let tr = document.createElement("tr");
    let html = `<td>${user.id}</td>
              <td>${user.name}</td>   
              <td>${user.username}</td>
              <td>${user.email}</td>
              <td>${user.address.city}</td>
              <td>${user.phone}</td>
              <td>${user.website}</td>
              <td>${user.company.name}</td>
              <td><button onclick="viewDetails(${user.id})">View Details</button></td>`;
    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
};

const fetchData = async () => {
  const data = await fetch(URL);
  Usersdata = await data.json();

  Usersdata.forEach((user) => {
    let tr = document.createElement("tr");
    let html = `<td>${user.id}</td>
             <td>${user.name}</td>
             <td>${user.username}</td>
             <td>${user.email}</td>
             <td>${user.address.city}</td>
             <td>${user.phone}</td>
             <td>${user.website}</td>
             <td>${user.company.name}</td>
             <td><button onclick="viewDetails(${user.id})">View Details</button></td>`;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
};

fetchbtn.addEventListener("click", fetchData);

async function viewDetails(userId) {
  const response = await fetch(`${URL}${userId}`);
  userData = await response.json();
  let html = `<h2>${userData.name}</h2>
<p>Username: ${userData.username}</p>
<p>Email: ${userData.email}</p>
<p>Phone: ${userData.phone}</p>
<p>Website: ${userData.website}</p>
<p>Company: ${userData.company.name}</p>
<p>Address: ${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}</p>
<button onclick="editRecord(${userId})">Edit</button>
<button onclick="closeDialog()">Close</button>`;
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
  <input type="text" id="name" name="name" value="${userData.name}"><br>
  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username" value="${userData.username}"><br>
  <label for="email">Email:</label><br>
  <input type="text" id="email" name="email" value="${userData.email}"><br>
  <label for="phone">Phone:</label><br>
  <input type="text" id="phone" name="phone" value="${userData.phone}"><br>
  <label for="website">Website:</label><br>
  <input type="text" id="website" name="website" value="${userData.website}"><br>
  <label for="company">Company:</label><br>
  <input type="text" id="company" name="company" value="${userData.company.name}"><br>
  <label for="address">Address:</label><br>
  <input type="text" id="address" name="address" value="${userData.address.street}, ${userData.address.suite}, ${userData.address.city}, ${userData.address.zipcode}"><br>
  <button onclick="updateRecord(${userId})">Update</button>
  <button onclick="closeDialog()">Close</button>
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
      company: {
        name: company,
      },
      address: {
        street: address,
      },
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  Usersdata[userId - 1].name = name;
  Usersdata[userId - 1].username = username;
  Usersdata[userId - 1].email = email;
  Usersdata[userId - 1].phone = phone;
  Usersdata[userId - 1].website = website;
  Usersdata[userId - 1].company.name = company;
  Usersdata[userId - 1].address.street = address;

  updateDisplay();

  closeDialog();
};
