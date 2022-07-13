import Global from "../globals";

async function getTotalUsers(accountid) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  const currentDay = new Date();
  //send to Api
  const response = await fetch(
    Global.api_url +
      "get-total-users",
    requestOptions
  );
  const json = await response.json();

  if (response.ok) {
    // setData(json);
    return json.total;
  } else {
    return null;
  }
}

export default getTotalUsers;
