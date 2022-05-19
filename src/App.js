import React,{useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {

  const [imageVisible,setImageVisible] = useState(false);
  const [imageSrc,setImageSrc] = useState("");
  const [userInfo, setuserInfo] = useState({
    filepreview:null,
    filepreview2:null,
   });
   const [b64imgData1,setB64imgData1] = useState("");
   const [b64imgData2,setB64imgData2] = useState("");
   const handleSubmit = (e) => {
     e.preventDefault();
     axios.post('http://127.0.0.1:8000/merge_two_images', {
       "grayscale_img":b64imgData1,
       "blur_img":b64imgData2,
     })
    .then(response => {
      console.log("Response: ",response);
      setImageVisible(true);
      setImageSrc(response.data.merged_image)
    });
   }
  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        // Use a regex to remove data url part
        let base64String = "data:image/jpeg;base64,"
        base64String += reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        setB64imgData1(base64String);
        // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
  }

  const handleInputChange2 = (event) => {
    setuserInfo({
      ...userInfo,
      filepreview2:URL.createObjectURL(event.target.files[0]),
    });
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
        // Use a regex to remove data url part
        let base64String = "data:image/jpeg;base64,"
        base64String += reader.result
            .replace('data:', '')
            .replace(/^.+,/, '');

        setB64imgData2(base64String);
        // Logs wL2dvYWwgbW9yZ...
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
    <div className="container mr-60">
      <h3 className="text-white">Image Interpolation</h3>

      <div className="formdesign">
        <div className="form-row">
          <label className="text-white">Select Black and White Image :</label>
          <input type="file" className="form-control" name="upload_image"  onChange={handleInputChange} />
        </div>
      </div>

      {userInfo.filepreview !== null ?
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null}

      <div className="formdesign">
        <div className="form-row">
          <label className="text-white">Select Color Image :</label>
          <input type="file" className="form-control" name="upload_image"  onChange={handleInputChange2} />
        </div>
      </div>

      {userInfo.filepreview2 !== null ?
        <img className="previewimg"  src={userInfo.filepreview2} alt="UploadImage" />
      : null}
      
    </div>
    <a href="#" onClick={handleSubmit} className="button greenround">Merge Images</a>
    {imageVisible && <img className="centreImage" src={imageSrc}/>}
    </>
  );
}

export default App;
