import Global from "../globals";

async function getNumDistractionByUser(userid) {
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
      "get-total-distraction?userid="+userid +"&date=" +
      currentDay.getFullYear() +
      "-" +
      (currentDay.getMonth()+1) +
      "-" +
      currentDay.getDate(),
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

export default getNumDistractionByUser;
