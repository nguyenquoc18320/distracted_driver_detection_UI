import Global from "../globals";

const totalDistractionUser = async (userid,date, page, items_per_page) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  //send to Api
  const response = await fetch(
    // Global.api_url + "get-list-distraction?userid=" + userid + "&page=" + page + "&items_per_page=" + items_per_page,
    Global.api_url + "get-list-distraction?userid=" + userid + "&date=" +
    date.getFullYear() +
    "-" +
    (date.getMonth()+1) +
    "-" +
    date.getDate() 
      +"&page=" + page + "&items_per_page=" + items_per_page,
    requestOptions
  );

  const json = await response.json();
  if (response.ok) {
    // setData(json);
    return json.total_pages;
  } else {
    return null;
  }
};

export default totalDistractionUser;