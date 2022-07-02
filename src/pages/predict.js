import React, { useState } from "react";
import Global from "../globals";
import {useLocation} from 'react-router-dom';
function Predict(){
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [pre, setPre] = useState()
  	const [probability, setProbability] = useState(0);
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setPre('');
		setProbability(null);
		setIsSelected(false);
	};

	const location = useLocation();
    var [data, setData] = React.useState([]);
	React.useEffect(() => {
        setData(location.state)
    },[]);


	const handleSubmission = () => {
		const formData = new FormData();
		formData.append('userid', data.id);
		formData.append('img', selectedFile);
		
		const requestOptions = {
			method: "POST",
			
			body: formData
		  };
		fetch(
			Global.api_url + "add-distraction", requestOptions
		)
    .then((response) => {
      return response.json();
    })
    // .then((data) => {
    //   setPre(data.data["class_name"])
    //   setProbability(data.data["probability"])
    // })
    .catch(
      (error) => console.log(error)
    );
		setIsSelected(true);
	};


	return(
   <div>
		<h3>{data.id}</h3>
			<input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
          
          <p >Predict: { pre }</p>
          <p>Probability: {Math.round(probability * 100)}%</p>
          <p> Time: {new Date().toLocaleString() + ""}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
        <p>Select a file to show details</p>
				
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
      
		</div>
	)
}

// function Predict(){
  // const navigate = useNavigate();
//   const [pic, SetPic] = React.useState();
//   function changePic(e) {
//     SetPic(e.target.files[0]);
//   }
//   // state = { 
//   //   pictures: [],
//   //   predict: 0
//   //  };
//   // const uploadPicture = (e) => {
//   //   SetPic({
//   //     /* contains the preview, if you want to show the picture to the user
//   //          you can access it with this.state.currentPicture
//   //      */
//   //     picturePreview: URL.createObjectURL(e.target.files[0]),
//   //     /* this contains the file we want to send */
//   //     pictureAsFile: e.target.files[0],
//   //   });
//   // };


//   const formData = new FormData();
//   formData.append("img",  pic);
//   async function SubmitButton() {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/form-data" },
//       // body: JSON.stringify({
//       //   img: pic,
//       // }),
//       body: formData
//     };
//     fetch(Global.api_url + "demo_image", requestOptions)
//       // .then((response) => {
//       //   return response.json();
//       // })
//       // .then((data) => {
//       //   Global.updateAccessToken(data.data["access_token"]);
//       //   // <Navigate to="/manage-user" />;
//       //   navigate("/manage-user");
//       // })
//       // .catch(
//       //   (error) => console.log(error) // Handle the error response object
//       // );
//   }


  
//   // class predict extends Component {
//   //   constructor(props) {
//   //     super(props);
//   //     this.state = { 
//   //       pictures: [],
//   //       predict: 0
//   //      };
//   //     // this.onDrop = this.onDrop.bind(this);
//   //   }
//     // onDrop(pictureFiles, pictureDataURLs) {
//     //   this.setState({
//     //     pictures: this.state.pictures.concat(pictureFiles)
//     //   });
//     // }
//     // render() { 
//   return (
//     <div>
//       <h1>Predict</h1>
//       <form onSubmit={SubmitButton}>
//         <input type="file" name="pic" onChange={(e) => changePic(e)} required/>
//         <br />
//         <br />
//         <button type="submit" name="upload">
//           Upload
//         </button>
//       </form>
//   </div>
//   );
//     // }
//   // }
// };
// export default Predict;



// class Predict extends React.Component {
  
//   state = {
//     title: '',
//     content: '',
//     image: null
//   };

//   handleChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   };

//   handleImageChange = (e) => {
//     this.setState({
//       image: e.target.files[0]
//     })
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     // const navigate = useNavigate();
//     const form_data = new FormData();
//     form_data.append('img', this.state.image);
//     // let url = 'http://127.0.0.1:8000/predict';
//     // axios.post(url, form_data, {
//     //   headers: {
//     //     'content-type': 'multipart/form-data'
//     //   }
//     // })

//     const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "multipart/form-data" },
//         // body: JSON.stringify({
//         //   img: pic,
//         // }),
//         body: form_data
//       };
//       fetch(Global.api_url + "demo_image", requestOptions)
//         // .then((response) => {
//         //     console.log(response.data);
//         // })
//         // .then((data) => {
//         //   Global.updateAccessToken(data.data["access_token"]);
//         //   // <Navigate to="/manage-user" />;
//         //   navigate("/manage-user");
//         // })
//         // .catch(
//         //   (error) => console.log(error) // Handle the error response object
//         // );
//         // .then(res => {
//         //   console.log(res.data);
//         // })
//         // .catch(err => console.log(err))
//   };

//   render() {
//     return (
//       <div className="App">
//         <form onSubmit={this.handleSubmit}>

//           <p>
//             <input type="file"
//                    id="image"
//                   onChange={this.handleImageChange} required/>
//           </p>
//           <input type="submit"/>
//         </form>
//       </div>
//     );
//   }
// }

export default Predict;


// // class App extends React.Component {
//   function Predict{
//     // constructor(props) {
//     //   super(props);
//       // this.state = { 
//       //   pictures: [],
//       //   predict: 0
//       //  };
//     //   this.onDrop = this.onDrop.bind(this);
//     // }
//     const [pic, pictureFiles] = React.useState();
//     // this.state = { 
//     //   pictures: [],
//     //   predict: 0
//     //  };
//     onDrop(pictureFiles, pictureDataURLs) {
//       this.setState({
//         pictures: this.state.pictures.concat(pictureFiles)
//       });
//     }
  
//     async function clickRegisterButton() {
//       const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/application" },
//         body: JSON.stringify({
//          img: pic,
//         }),
//       };
//       fetch(Global.api_url + "register", requestOptions)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           Global.updateAccessToken(data.data["access_token"]);
//           // <Navigate to="/manage-user" />;
//           navigate("/predict");
//         })
//         .catch(
//           (error) => console.log(error) // Handle the error response object
//         );
//     }
  
//     render() {
//       return (
//         <ImageUploader
//           withIcon={false}
//           withPreview={true}
//           buttonText="Choose images"
//           onChange={this.onDrop}
//           imgExtension={[".jpg", ".gif", ".png", ".gif"]}
//           maxFileSize={5242880}
//         />
//       );
//     }
//   }
//   export default Predict;
//   // const rootElement = document.getElementById("root");
//   // ReactDOM.render(<App />, rootElement);
  