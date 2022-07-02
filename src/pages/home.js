import React, { useRef, useState } from "react";
import "../styles/home.css";
import demoImage from "../services/demo_image";
import { useNavigate } from "react-router-dom";

function Home() {
  const inputImageRef = useRef();
  const [inputImage, setInputImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  const [isImage, setIsImage] = useState(true);
  var [file, setFile] = useState("");

    const navigate = useNavigate();

  //delet all image
  const onBtnDelete = () => {
    setInputImage("");
    setResultImage("");
    setFile(null);
  };

  //when input imagechange
  const onFileChange = (e) => {
    var url = URL.createObjectURL(e.target.files[0]);
    setInputImage(url);
    setFile(e.target.files[0]);
    // Would see a path?
    // TODO: concat files// Would see a p
  };

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    inputImageRef.current.click();
  };

  const onBtnImage = () => {
    /*Collecting node-element and performing click*/
    setIsImage(true);
  };

  const onBtnVideo = () => {
    /*Collecting node-element and performing click*/
    setIsImage(false);
  };

  //predict
  const onBtnPredict = async () => {
    if (file != null && file) {
      var result = await demoImage(file);
      if (result != null) {
        const imageObjectURL = URL.createObjectURL(result);
        setResultImage(imageObjectURL);
      } else {
        console.log("error");
      }
    } else {
      alert("Please choose an image!");
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
            onClick={() => {navigate("/login")}}
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
                <header className="info-drag">
                  Drag &amp; Drop to Upload File
                </header>
                <span className="info-drag">OR</span>
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
                  onChange={onFileChange}
                />{" "}
              </>
            ) : null}

            {inputImage === "" ? (
              <img src={inputImage} id="in_img" style={{ display: "none" }} alt='Input' />
            ) : (
              <img src={inputImage} id="in_img" alt='Input'/>
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
          {resultImage === "" ? (
            <header id="header_result">Result</header>
          ) : (
            <img
              id="out_image"
              src={resultImage}
              alt="Result"
              height={300}
            />
          )}
        </div>
      </div>
    </form>
  );
}

export default Home;
