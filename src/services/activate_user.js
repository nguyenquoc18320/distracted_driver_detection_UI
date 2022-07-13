import Global from "../globals";

 async function activateUser (accountid){
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    };
  
    //send to Api
    const response = await fetch(Global.api_url + "activate-user?accountid=" + accountid, requestOptions);
    const json = await response.json();
    if (response.ok) {
      // setData(json);
      return json.data;
    }else{
      return null;
    }
  }

export default activateUser;