import React from "react";

async function demoImage(file) {
  const formData = new FormData();
  formData.append("img", file, file.name);

  const response = await fetch(
    "http://127.0.0.1:8000/demo_image",
    {
      // Your POST endpoint
      method: "POST",
      body: formData, // This is your file object
    },
    { mode: "cors" }
  );

  if (response.ok) {
    return response.blob();
  } else {
    console.log(response.status);
    return null;
  }
}

export default demoImage;
