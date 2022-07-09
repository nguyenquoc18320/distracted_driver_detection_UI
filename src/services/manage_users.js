import Global from "../globals";

async function get_users(){
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json",
        "Authorization": "Bearer " + Global.access_token},

      };
  
      //send to Api
       fetch(Global.api_url + "get-users", requestOptions)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log(data.data);
            return data.data;
        })
        .catch(
          (error) => {
            console.log('getting users error');
            return null;
          } // Handle the error response object
        );
}

const loadUsers = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Global.access_token,
    },
  };

  //send to Api
  const response = await fetch(Global.api_url + "get-users", requestOptions);
  const json = await response.json();
  if (response.ok) {
    // setData(json);
    return json.data;
  }else{
    return null;
  }
};

export default loadUsers;