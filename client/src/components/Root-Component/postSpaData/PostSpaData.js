import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './PostSpaData.css'

function PostForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    details: "",
    imgUrl: "",
  });
  const [image, setImage] = useState("");

  //handle inputs
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  //post data form
  const postData = async () => {
    await axios
      .post("https://cuba-goa-z4hl.onrender.com/addspa", form)
      .then((resp) => {
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
      });

    navigate("/spa");
  };

  useEffect(() => {
    if (form.imgUrl) {
      postData();
    }
  }, [form.imgUrl]);

  const uploadImage = async () => {
    const imgData = new FormData();
    imgData.append("file", image);
    imgData.append("upload_preset", "insta_clone");
    await axios
      .post(
        "https://api.cloudinary.com/v1_1/harshada0611/image/upload",
        imgData
      )
      .then((resp) => {
        console.log(resp.data.url);
        setForm({ ...form, imgUrl: resp.data.url });
      })
      .catch((err) => {
        console.log("something went wrong", err);
      });
  };

  return (
    <div id="UserFormWrapper">
      <div
        id="formWrapper"
       
      >
        <h4
          style={{ textAlign: "center", marginBottom: "1.5rem", color: "#888" }}
        >
          ADD YOUR SPA
        </h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              border: "1px solid #ccc",
            }}
          >
            <label
              htmlFor="fileUpload"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "130px",
                cursor: "pointer",
                width:'130px'
              }}
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  style={{ objectFit: "cover", width: "100%" }}
                  alt="preview"
                />
              ) : (
                <span style={{ fontSize: "1.2rem" }}>Choose  image</span>
              )}
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setImage(e.target.files[0]);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0,
                width: "100%",
                height: "100%",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
        <div style={{ marginTop: "1.5rem" }}>
          <input
            type="text"
            placeholder="SPA Name"
            name="name"
            value={form.name}
            onChange={handleInputs}
            id="firstinput"
            
          />
        </div>
        <div style={{ marginTop: "1.5rem" }} id='details'>
          <textarea
            type="text"
            placeholder="SPA Details"
            name="details"
            value={form.details}
            onChange={handleInputs}
            
          
          />
        </div>
        <div style={{ marginTop: "1.5rem" }} id='details'>
          <textarea
            type="text"
            placeholder="SPA Benefits"
            name="benefits"
            value={form.benefits}
            onChange={handleInputs}
        
          />
        </div> 
        <div
          id="button"
         
        >
          <button
            className="btn btn-warning"
            onClick={uploadImage}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostForm;