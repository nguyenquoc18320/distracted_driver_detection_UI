import React from "react";
import "../styles/manage_users.css";
import "../styles/distraction.css";
import "../styles/infor.css";
import distractionUser from "../services/distraction_user";
import totalDistractionUser from "../services/total_distraction_user";
import { useNavigate, useLocation } from "react-router-dom";
import Menu from "../components/menu";
import ShowImage from "../components/show_img";
import getImage from "../services/get_image";
import { FaRegListAlt, FaImage } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";

function Predict() {
  var [data, setData] = React.useState([]);
  const location = useLocation();
  var [user, setUser] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);
  const onClickMenu = () => setShowResults(true);
  const [showImage, setShowImage] = React.useState(false);
  const onClickImage = () => setShowImage(true);
  const [resultImage, setResultImage] = React.useState([]);
  var [distractionPage, setDistractionPage] = React.useState(1);
  var [totalDistractionPage, setTotalDistractionPage] = React.useState();
  var [distracList, setDistracList] = React.useState([]);
  var today = new Date();
  var [selectedDate, setSelectedDate] = React.useState(today);
  const items_per_page = 3;
  const getImagegbyPath = async (path) => {
    var result = await getImage(path);

    if (result != null) {
      const imageObjectURL = URL.createObjectURL(result);
      return imageObjectURL;
      //   setResultImage((images) => [
      //     ...images,
      //     {
      //       img: imageObjectURL,
      //     },
      //   ]);
    } else {
      console.log("error");
      return null;
    }
  };
  React.useEffect(() => {
    // console.log(location.state);
    async function loadData() {
      setUser(location.state);     
      var distractionList = await distractionUser(location.state.id, today, 1, items_per_page);
      setDistracList(distractionList);
      var distractionTotalPages = await totalDistractionUser(location.state.id, today, 1, items_per_page);
      setDistractionPage(1);
      setSelectedDate(today);
      setTotalDistractionPage(distractionTotalPages);
      if (distractionList != null) {
        const lengthImg = distractionList.length;
        console.log("length: " + lengthImg);
        var images = [];
        if (lengthImg > 0) {
          for (var i = 0; i < lengthImg; i++) {
            var a = JSON.stringify(distractionList[i]);
            var b = JSON.parse(a);

            let img = await getImagegbyPath(b.image_path);
            images.push(img);
            console.log(images.length);
          }
        }
        setResultImage(images);
      }
    }
    loadData();
    
  }, []);
  
  //change page
  const changeDistractionPage = (event) => {
    const selectedPage = event.selected + 1;
    async function loadDistractionList() {
      var distractionList = await distractionUser(user.id, selectedDate, selectedPage, items_per_page);
      setDistracList(distractionList);
      var distractionTotalPages = await totalDistractionUser(user.id, selectedDate, selectedPage, items_per_page);
      setDistractionPage(selectedPage);
      setSelectedDate(selectedDate);
      setTotalDistractionPage(distractionTotalPages);
      if (distractionList != null) {
        const lengthImg = distractionList.length;
        console.log("length: " + lengthImg);
        var images = [];
        if (lengthImg > 0) {
          for (var i = 0; i < lengthImg; i++) {
            var a = JSON.stringify(distractionList[i]);
            var b = JSON.parse(a);

            let img = await getImagegbyPath(b.image_path);
            images.push(img);
            console.log(images.length);
          }
        }
        setResultImage(images);
      }
    }
    loadDistractionList();
  };
  const changeDate = (date) => {
    async function loadDistractionListbyDate() {
      var distractionList = await distractionUser(user.id, date, 1, items_per_page);
      setDistracList(distractionList);
      var distractionTotalPages = await totalDistractionUser(user.id, date, 1, items_per_page);
      setDistractionPage(1);
      setSelectedDate(date);
      setTotalDistractionPage(distractionTotalPages);
      if (distractionList != null) {
        const lengthImg = distractionList.length;
        console.log("length: " + lengthImg);
        var images = [];
        if (lengthImg > 0) {
          for (var i = 0; i < lengthImg; i++) {
            var a = JSON.stringify(distractionList[i]);
            var b = JSON.parse(a);

            let img = await getImagegbyPath(b.image_path);
            images.push(img);
            console.log(images.length);
          }
        }
        setResultImage(images);
      }
    }
    loadDistractionListbyDate();
  };
  return (
    <div className="div_dashboard_distraction">
      <div className="div-menu-icon">
        <FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
        {showResults ? <Menu state={user} /> : null}
      </div>
      <div className="div_header_distrac">
        <div className="div_name_product_distrac">User Distraction</div>
      </div>

      <div className="div_content_dashboard_distraction">
        <div className="div_manage_user">
          <DatePicker
            className="div_datepicker"
            selected={selectedDate}
            onChange={(date) => {
              changeDate(date);
            }}
          />
          <table>
            <thead>
              <tr>
                <th className="id">ID</th>
                <th className="time">Time</th>
                <th className="category">Category</th>
                <th className="image">Image</th>
              </tr>
            </thead>
            <tbody>            
              {distracList.map((item, idx) => {
                // console.log(data.length)
                var stringDistrac = JSON.stringify(item);

                var distraction = JSON.parse(stringDistrac);
                console.log(distractionPage);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{distraction.time}</td>
                    <td>{distraction.category}</td>
                    <td>
                      <img src={resultImage[idx]} height={150} width={200} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={changeDistractionPage}
            pageRangeDisplayed={5}
            pageCount={totalDistractionPage}
            forcePage = {distractionPage-1}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            disabledClassName={null}
          />
        </div>
      </div>
    </div>
  );
}
export default Predict;
