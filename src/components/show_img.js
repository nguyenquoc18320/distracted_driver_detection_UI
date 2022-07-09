import React from "react";
import "../styles/menu.css";
import { useNavigate, useLocation } from "react-router-dom";
import getImage from "../services/get_image";
import { FaList, FaWindowClose} from "react-icons/fa";
const ShowImage = function(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = React.useState();
  const [resultImage, setResultImage] = React.useState("");
  React.useEffect(() => {
    console.log(props.state)
    console.log(getImage(props.state.image_path))
    // getImage(props.state.image_path)
    // .then((res) => {
    //     setResult(res);
    // })
    // .catch((e) => {
    //     console.log(e.message);
    // });
    
    // if (result != null) {
    // const imageObjectURL = URL.createObjectURL(getImage(props.state.image_path));
    // setResultImage(imageObjectURL);
    // } else {
    // console.log("error");
    // }
    
}, []);
    return (
        <div className="bm-wrap">
        <div className="bm-show">
            
            {resultImage === "" ? (
                <header>Result</header>
            ) : (
                <img
                src={resultImage}
                height={300}
                />
            )}
            
            <div className="bm-close" >
            <FaWindowClose className="btn-close" onClick={() => window.reload()} ></FaWindowClose>
            </div>
        </div> 
        </div>
    )
}
 
export default ShowImage;