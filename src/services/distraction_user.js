import Global from "../globals";

// const distractionUser = async (userid) => {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("access_token"),
//       },
//     };
//     //send to Api
//     const response = await fetch(Global.api_url + "getdistractions?userid=" + userid, requestOptions);
//     const json = await response.json();
//     if (response.ok) {
//         // setData(json);
//         return json.data;
//     }else{
//         return null;
//     }
// };

// export default distractionUser;
const distractionUser = async (userid, date, page, items_per_page) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  };

  //send to Api
  const response = await fetch(
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
    // return json.data, json.page, json.total_pages;
    return json.data;
  } else {
    return null;
  }
};

export default distractionUser;