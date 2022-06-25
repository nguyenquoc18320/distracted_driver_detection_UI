import Global from "../globals";

 async function deactivateUser (accountid){
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Global.access_token,
      },
    };
  
    //send to Api
    const response = await fetch(Global.api_url + "deactivate-user?accountid=" + accountid, requestOptions);
    const json = await response.json();
    if (response.ok) {
      // setData(json);
      return json.data;
    }else{
      return null;
    }
  }

export default deactivateUser;