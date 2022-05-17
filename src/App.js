import React,{useState } from 'react';
import './App.css';

function App() {

  const [userInfo, setuserInfo] = useState({
    filepreview:null,
    filepreview2:null,
   });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      filepreview:URL.createObjectURL(event.target.files[0]),
    });
  }

  const handleInputChange2 = (event) => {
    setuserInfo({
      ...userInfo,
      filepreview2:URL.createObjectURL(event.target.files[0]),
    });
  }

  return (
    <div className="container mr-60">

      <h3 className="text-white">Image Interpolation</h3>

      <div className="formdesign">
        <div className="form-row">
          <label className="text-white">Select Image 1 :</label>
          <input type="file" className="form-control" name="upload_image"  onChange={handleInputChange} />
        </div>
      </div>

      {userInfo.filepreview !== null ?
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null}

      <div className="formdesign">
        <div className="form-row">
          <label className="text-white">Select Image 2 :</label>
          <input type="file" className="form-control" name="upload_image"  onChange={handleInputChange2} />
        </div>
      </div>

      {userInfo.filepreview2 !== null ?
        <img className="previewimg"  src={userInfo.filepreview2} alt="UploadImage" />
      : null}

    </div>
  );
}

export default App;
