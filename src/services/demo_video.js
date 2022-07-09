import React from "react";
import Global from "../globals";

async function demoVideo(file) {
  const formData = new FormData();
  formData.append("video", file, file.name);

  const response = await fetch(
    Global.api_url + "demo_video",
    {
      // Your POST endpoint
      method: "POST",
      body: formData, // This is your file object
    },
    { mode: "cors" }
  );

  if (response.ok) {
    // console.log(await response.headers.get('Content-Disposition').split('filename=')[1]);
    return response.blob();
  } else {
    console.log(response.status);
    return null;
  }
}

export default demoVideo;
