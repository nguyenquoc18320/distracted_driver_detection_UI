import React from "react";
import Global from "../globals";
async function getImage(imgPath) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            img_path: imgPath
        }),
        };
    const response = await fetch(Global.api_url + "get-image-imagepath", requestOptions);

    if (response.ok) {
        return response.blob();
      } else {
        console.log(response.status);
        return null;
      }
}

export default getImage;