// import axios from "axios";

export async function createUsers(userData) {
  const res = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: { "content-type": "application/json" },
  });
  const data = await res.json();

  return data;
}

export async function checkUsers(loginInfo) {
  const email = loginInfo.email;
  const password = loginInfo.password;
  const res = await fetch(`http://localhost:8080/users?email=${email}`);
  const data = await res.json();
  // console.log(data);

  if (data.length) {
    if (password === data[0].password) {
      return { data: data[0] };
    } else console.log("Password is incorrect");
  } else console.log("User not found");

  return data;
}
