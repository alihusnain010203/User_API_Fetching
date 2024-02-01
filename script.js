const URL = "https://jsonplaceholder.typicode.com/users/";
const fetchbtn = document.querySelector(".fetch");

let tbody = document.querySelector(".table-body");

const fetchData = async () => {
  const data = await fetch(URL);
  const users = await data.json();

  console.log(users);

  users.forEach((user) => {
    let tr = document.createElement("tr");
    let html = `<td>${user.id}</td>
             <td>${user.name}</td>
             <td>${user.username}</td>
             <td>${user.email}</td>
             <td>${user.address.city}</td>
              <td>${user.phone}</td>
             <td>${user.website}</td>
             <td>${user.company.name}</td>`;

    tr.innerHTML = html;
    tbody.appendChild(tr);
  });
};

fetchbtn.addEventListener("click", fetchData);
