import React, { useRef, useState } from "react";
import "../styles/home.css";
import demoImage from "../services/demo_image";
import { useNavigate } from "react-router-dom";
import demoVideo from "../services/demo_video";

function Home() {
  const inputImageRef = useRef();
  const videoRef = useRef();
  const [inputImage, setInputImage] = useState("");
  const [outputResult, setOutputResult] = useState("");
  const [isImage, setIsImage] = useState(true);
  const [resultText, setResultText] = useState("Result");

  var [file, setFile] = useState("");
  var [video, setVideo] = useState();


  const navigate = useNavigate();

  //delet all image
  const onBtnDelete = () => {
    setInputImage("");
    setOutputResult("");
    setResultText("Result");
    setFile(null);
  };

  //when input imagechange
  const onFileChange = (e) => {
    var url = URL.createObjectURL(e.target.files[0]);
    setInputImage(url);
    console.log(url);
    setFile(e.target.files[0]);
  };

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputImageRef.current.click();
  };

  const onBtnImage = () => {
    /*Collecting node-element and performing click*/
    setIsImage(true);
    setInputImage("");
    setOutputResult("");
    setResultText("Result");
    setFile(null);
  };

  const onBtnVideo = () => {
    /*Collecting node-element and performing click*/
    setIsImage(false);
    setInputImage("");
    setOutputResult("");
    setResultText("Result");
    setFile(null);
  };

  //predict
  const onBtnPredict = async () => {
    if (file != null && file) {
      setResultText("Loading...");

      //is image
      if (isImage) {
        var result = await demoImage(file);
        if (result != null) {
          const imageObjectURL = URL.createObjectURL(result);
          setOutputResult(imageObjectURL);
        } else {
          console.log("error");
          setResultText("ERROR...");
          alert("Cannot process!");
        }
      } else {
        //is video
        var result = await demoVideo(file);

        if (result != null) {
          const myFile = new File(
            [result],
            "demo.mp4",
            { type: 'video/mp4' }
        );

        setVideo(myFile);

          // const videoObjectURL = URL.createObjectURL(result, {
          //   type: "video/mp4",
          // });
          const videoObjectURL = URL.createObjectURL(video);
          // console.log(myFile);

          setOutputResult(videoObjectURL);
          // let a = document.createElement("a");
          // a.href = videoObjectURL;
          // a.download = "demo.mp4";
          // a.click();
        } else {
          console.log("error");
          setResultText("ERROR...");
          alert("Cannot process!");
        }
      }
    } else {
      alert("Please choose an image or a video!");
    }
  };

  return (
    <form id="form1" runat="server" encType="multipart/form-data">
      <div className="div_header">
        <div className="div_name_product">Predict Driver Status - AI</div>
        <div className="div_button_login">
          <input
            type="button"
            className="button_format_data"
            id="button_login"
            onClick={() => {
              navigate("/login");
            }}
            defaultValue="Login"
          />
        </div>
      </div>
      <div className="div_info_student">
        The Product created by Nguyễn Anh Quốc and Nguyễn Phan Sự
      </div>
      <div className="div_guide">
        <p style={{ fontSize: 16, fontWeight: 600 }}>User guide</p>
        <p id="guide">
          Hãy chọn loại dữ liệu (hình ảnh/video) mà bạn muốn dự đoán, sau đó
          upload dữ liệu vào ô bên dưới, cuối cùng nhấn nút "Dự đoán" để xem kết
          quả
        </p>
      </div>

      <div className="div_selection_info">
        <h3>Data format</h3>
        <div className="div_selection">
          <input
            type="button"
            style={
              isImage
                ? { backgroundColor: "#FB7185" }
                : { backgroundColor: "#D1D5DB" }
            }
            // id={isImage == true ? "selected_button" : ""}
            className="button_format_data"
            onClick={onBtnImage}
            defaultValue="Image"
          />

          <input
            type="button"
            style={
              isImage === false
                ? { backgroundColor: "#FB7185" }
                : { backgroundColor: "#D1D5DB" }
            }
            className="button_format_data"
            onClick={onBtnVideo}
            defaultValue="Video"
          />
        </div>
      </div>

      <div className="div_content">
        <div className="div_input_info">
          <div className="drag-area">
            {inputImage === "" ? (
              <>
                <div id="div_icon" className="info-drag">
                  <i className="fa fa-cloud" />
                </div>
                <input
                  onClick={onBtnClick}
                  className="info-drag"
                  type="button"
                  id="button_browser"
                  defaultValue="Browse File"
                />
                <input
                  ref={inputImageRef}
                  type="file"
                  id="input_image"
                  alt="image"
                  hidden
                  accept={isImage ? ".jpg" : ".mp4"}
                  onChange={onFileChange}
                />
              </>
            ) : null}

            {isImage ? (
              inputImage === "" ? (
                <img
                  src={inputImage}
                  id="in_img"
                  style={{ display: "none" }}
                  alt="Input"
                />
              ) : (
                <img src={inputImage} id="in_img" alt="Input" />
              )
            ) : inputImage === "" ? (
              <video
                ref={videoRef}
                width="750"
                height="500"
                controls
                src={inputImage}
                type="video/mp4"
                style={{ display: "none" }}
              />
            ) : (
              <video
                ref={videoRef}
                width="750"
                height="500"
                controls
                src={inputImage}
                type="video/mp4"
              />
            )}
          </div>
        </div>
        <div className="div_predict_button">
          <input
            onClick={onBtnPredict}
            type="button"
            className="button_format_data"
            id="button_predict"
            defaultValue="Predict"
          />
          <input
            onClick={onBtnDelete}
            type="button"
            className="button_format_data"
            id="button_delete"
            defaultValue="Delete"
          />
        </div>
        <div className="div_output">
          {outputResult === "" ? (
            <header id="header_result">{resultText}</header>
          ) : isImage ? (
            <img id="out_image" src={outputResult} alt="Result" height={300} />
          ) : (
            <a href={outputResult} download='demo.mp4'>Download Result</a>
          )}
        </div>
       
      </div>
    </form>
  );
}

export default Home;
