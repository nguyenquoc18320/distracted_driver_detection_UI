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
	const onClickImage = () => setShowImage(true)
	const [resultImage, setResultImage] = React.useState([]);

	const getImagegbyPath = async (path) => {		
		var result = await getImage(path);
		if (result != null) {
			const imageObjectURL = URL.createObjectURL(result);
			setResultImage((images) => [
				...images,
				{
					img: imageObjectURL,
				},
			]);
			
		} else {
			console.log("error");
		}		
	};	
	React.useEffect(() => {
		setUser(location.state)
		distractionUser(location.state.id)
		.then((res) => {
			setData(res);
		})
		.catch((e) => {
			console.log(e.message);
		});
		var lengthImg = data.length;
		if (lengthImg > 0 ) {
			for (var i = 0; i < lengthImg; i++) {
				var a = JSON.stringify(data[i]);
				var b = JSON.parse(a);
				console.log(b);
				getImagegbyPath(b.image_path);
			}
		}
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
					{
						data.map((item)=>{
							var stringDT = JSON.stringify(item);
						
							var distrac = JSON.parse(stringDT);
							// getImagegbyPath(distrac.image_path);
						})
					}
					{data.map((item, idx) => {
						var stringDistrac = JSON.stringify(item);
						
						var distraction = JSON.parse(stringDistrac);
						console.log(resultImage);
						return (
							<tr key={idx}>								
								<td>{idx + 1}</td>
								<td>{distraction.time}</td>
								<td >{distraction.category}</td>														
								<td>														
									<img										
										src={resultImage[idx].img}
										height={150}
										width={200}
									/>								
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