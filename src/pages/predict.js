import React from "react";
import "../styles/manage_users.css";
import "../styles/distraction.css";
import "../styles/infor.css"
import distractionUser from "../services/distraction_user";
import { useNavigate, useLocation} from "react-router-dom";
import Menu from '../components/menu'
import ShowImage from "../components/show_img";
import getImage from "../services/get_image";
import { FaRegListAlt,FaImage } from "react-icons/fa";
function Predict(){
	var [data, setData] = React.useState([]);
	const location = useLocation();
    var [user, setUser] = React.useState([]);
    const [showResults, setShowResults] = React.useState(false)
    const onClickMenu = () => setShowResults(true)
	const [showImage, setShowImage] = React.useState(false)
	const onClickImage = () => setShowImage(true
		 
	)
	const getImagegbyPath = async (path) => {		
		var result = await getImage(path);
		if (result != null) {
			const imageObjectURL = URL.createObjectURL(result);
			setResultImage(imageObjectURL);
		} else {
			console.log("error");
		}		
	  };
	const [resultImage, setResultImage] = React.useState("");
	
	React.useEffect(() => {
		setUser(location.state)
		distractionUser(location.state.id)
		.then((res) => {
			setData(res);
		})
		.catch((e) => {
			console.log(e.message);
		});
	}, []);
	return (

			<div className="div_dashboard_distraction">
		
				<div className="div-menu-icon">
					<FaRegListAlt className="div-menu-icon2" onClick={onClickMenu} />
					{ showResults ? <Menu state={user} /> : null }               
				</div>
			<div className="div_header_distrac">
				<div className="div_name_product_distrac">User Distraction</div>
			</div>
			
			<div className="div_content_dashboard">
				
				<div className="div_manage_user">
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
					{data.map((item, idx) => {
						var stringDistrac = JSON.stringify(item);
						
						var distraction = JSON.parse(stringDistrac);
						// getImage(distraction.image_path);
						// var result = getImage(distraction.image_path);
						// img = getImagegbyPath(result)
						// console.log(result);
						// if (result != null) {
						// 	var imageObjectURL = URL.createObjectURL(result);
						// 	setResultImage(imageObjectURL);
						// 	imageObjectURL = "";
						// } else {
						// 	console.log("error");
						// }
						// const imageObjectURL = URL.createObjectURL(getImage(distraction.image_path));
						// setResultImage(imageObjectURL);
						// var date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(distraction.time)
						
						return (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{distraction.time}</td>
								<td >{distraction.category}</td>						
								<td>					
									<img
										src={getImagegbyPath(distraction.image_path)}
										height={250}
									/>
								
									{/* <FaImage
										color="green"
										onClick={onClickImage(distraction)}
									>
									</FaImage> */}
									{/* { showImage ? <ShowImage state={distraction} /> : null } */}
									
								</td>
							</tr>
						);
					})}
					</tbody>
				</table>
				</div>
			</div>
			</div>
		
	);
}
export default Predict;