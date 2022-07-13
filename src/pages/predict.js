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
	var [loadImage, setLoadImage] = React.useState()
	// const onClickImage = () => setShowImage(true)
	const [resultImage, setResultImage] = React.useState([]);

	
	// const loadImageFormData = () => {
	// 	console.log(data);
	// 	var lengthImg = data.length;
	// 	// if (lengthImg > 0 ) {
	// 	// for (var i = 0; i < lengthImg; i++) {
	// 	var i=0;
	// 	while (i<lengthImg){
	// 		var a = JSON.stringify(data[i]);
	// 		var b = JSON.parse(a);
	// 		console.log(b);
	// 		getImagegbyPath(b.image_path);
	// 		i++;
	// 	}	
	// 	setLoadImage(false)
	// }
	React.useEffect(() => {
		setUser(location.state)
		
		distractionUser(location.state.id)
		.then((res) => {
			setData(res);
			// var a = JSON.stringify(res[i]);
			// var lengthImg = res.length;
			// console.log(resultImage.length, lengthImg);
			// var i=0;
			// if(resultImage.length<lengthImg){
			// 	while (i<lengthImg){
			// 		var a = JSON.stringify(res[i]);
			// 		var b = JSON.parse(a);
			// 		console.log(b);
			// 		// getImagegbyPath(b.image_path);
			// 		getImage(b.image_path)
			// 		.then((res2) => {
			// 			console.log(res2);
			// 			const imageObjectURL = URL.createObjectURL(res2);
			// 			setResultImage((image) => [
			// 				...image,
			// 				{
			// 					image: imageObjectURL,
			// 				},
			// 			]);
						
			// 		})
			// 		.catch((e) => {
			// 			console.log(e.message);
			// 		});
					
			// 		i++;
			// 	};
			// }

			// console.log(resultImage);
			
		})
		.catch((e) => {
			console.log(e.message);
		});

	}, []);	
	
	// var lengthImg = data.length;
	// 	// if (lengthImg > 0 ) {
	// for (var i = 0; i < lengthImg; i++) {
	// 	var a = JSON.stringify(data[i]);
	// 	var b = JSON.parse(a);
	// 	console.log(b);
	// 	getImagegbyPath(b.image_path);
	// };

	//////////////////////////////////////////////////////////////////////
	// console.log(data);
	// var lengthImg = data.length;
	// // if (lengthImg > 0 ) {
	// // for (var i = 0; i < lengthImg; i++) {
	// var i=0;
	// while (i<lengthImg){
	// 	var a = JSON.stringify(data[i]);
	// 	var b = JSON.parse(a);
	// 	console.log(b);
	// 	// getImagegbyPath(b.image_path);
	// 	getImage(b.image_path)
	// 	.then((res) => {
	// 		const imageObjectURL = URL.createObjectURL(res);
	// 		setResultImage((image) => [
	// 			...image,
	// 			{
	// 				image: imageObjectURL,
	// 			},
	// 		]);
			
	// 	})
	// 	.catch((e) => {
	// 		console.log(e.message);
	// 	});
		
	// 	i++;
	// };	
	const getImagegbyPath = async (path) => {		
		var result = await getImage(path);
		if (result != null) {
			const imageObjectURL = URL.createObjectURL(result);
			setLoadImage(imageObjectURL);
			
		} else {
			console.log("error");
		}
		
	};			
	return (

			<div className="div_dashboard_distraction">
				{/* {loadImage ? loadImageFormData: null} */}
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
						console.log(data[1])
						// data.get((item)=>{
						// 	var stringDT = JSON.stringify(item);
							
						// 	var distrac = JSON.parse(stringDT);
						// 	console.log(item);
						// 	// getImagegbyPath(distrac.image_path);
						// })
					}
					{data.map((item, idx) => {
						var stringDistrac = JSON.stringify(item);
						
						var distraction = JSON.parse(stringDistrac);
					
						// console.log(distraction);
						// getImagegbyPath(distraction.image_path);
						return (
							<tr key={idx}>								
								<td>{idx + 1}</td>
								<td>{distraction.time}</td>
								<td >{distraction.category}</td>														
								<td >
									
									<img										
										src={loadImage}
										height={150} 
										width={200}
									/>
									{/* ) : (	
										<img										
										alt="Result"
										height={150} 
										width={200}
									/>
									)}							 */}
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