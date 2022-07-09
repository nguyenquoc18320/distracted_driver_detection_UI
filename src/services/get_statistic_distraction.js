import Global from "../globals";

async function getDistractionStatistic(date, page, items_per_page) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

//   const currentDay = new Date();
  //send to Api
  const response = await fetch(
    Global.api_url +
      "get-statistic-distraction?date=" +
      date.getFullYear() +
      "-" +
      (date.getMonth()+1) +
      "-" +
      date.getDate() 
        +"&page=" + page + "&items_per_page=" +items_per_page ,
    requestOptions
  );
  const json = await response.json();

  if (response.ok) {
    // setData(json);
    return json;
  } else {
    return null;
  }
}

export default getDistractionStatistic;
