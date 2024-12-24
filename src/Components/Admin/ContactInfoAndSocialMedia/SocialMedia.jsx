import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostNewCommercialProperty = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [Data1, setData1] = useState("");
  const [image, setImage] = useState("");

  let name, value;
  const [user, setUser] = useState({
    facebookId: "",
    instagramId: "",
    twitterId: "",
    linkedInId: "",
    dateOfFormSubmission: "",
  });
  const UserDetails = async () => {
    try {
      const res = await fetch("/api/userProfile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setData(data);

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }
    } catch (err) {
      console.log(`Error during catch of User's Data -  ${err}`);
    }
  };
  useEffect(() => {
    UserDetails();
  }, []);

  const SocialMediaAPIData = async () => {
    try {
      const res = await fetch("/api/socialMediaAPI", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      setData1(data);

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }
    } catch (err) {
      console.log(`Error during catch of User's Data -  ${err}`);
    }
  };
  useEffect(() => {
    SocialMediaAPIData();
  }, []);

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    if (Data1.length > 0) {
      setUser({
        facebookId: Data1[0].facebookId,

        instagramId: Data1[0].instagramId,

        twitterId: Data1[0].twitterId,

        linkedInId: Data1[0].linkedInId,

       
      });
    }
  }, [Data1]);
  console.log(Data1)

  const handleSubmit = async (e) => {
    e.preventDefault();

    var bodyFormData = new FormData();

    bodyFormData.append("facebookId", user.facebookId);
    bodyFormData.append("instagramId", user.instagramId);

    bodyFormData.append("twitterId", user.twitterId);

    bodyFormData.append("linkedInId", user.linkedInId);

  

    try {
      const response = await axios.post(
        "/api/changeSocialMedia",

        bodyFormData,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Social Media Ids Changed Successfully");

      // request successful, refresh the page

      window.location.reload();
    } catch (error) {
      //handle error

      console.log(error);
    }
  };
  if (Data.userType !== "Admin") {
    return <div></div>;
  }

  return (
    <>
      <div
        className="addLocation"
        style={{
          // zIndex: "20",
          width: "100%",
          // margin: "7% auto",
          marginTop: "2rem",
          // position: "absolute",
          textAlign: "left",
        }}
      >
        <div
          className="container"
          style={{ backgroundColor: "#808080", marginTop: "1rem" }}
        >
          <div className="row justify-content-center">
            <div
              className="col-lg-12"
              style={{
                paddingTop: "0.5rem",
                paddingLeft: "1rem",
                paddingRight: "1rem",
                paddingBottom: "3rem",
                borderRadius: "5px",
              }}
            >
              <h3
                className="text-center"
                style={{ marginBottom: "1rem", color: "white" }}
              >
                Official Social Media ID
              </h3>
              <div
                className="innerDiv container"
                style={{
                  backgroundColor: "white",
                  padding: "4rem 5rem 2rem 1rem",
                  borderRadius: "5px",
                }}
              >
                <div className="row">
                  <div className="col-12 col-lg-3 mt-2 ">
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      Facebook Id :
                    </h6>
                    <h6 style={{ marginBottom: "2.7rem", fontSize: "1rem" }}>
                      Instagram Id :
                    </h6>
                    <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                      Twitter (X) Id :
                    </h6>
                    <h6 style={{ marginBottom: "2.3rem", fontSize: "1rem" }}>
                      LinkedIn Id :
                    </h6>
                    
                  </div>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      name="facebookId"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.facebookId}
                    />
                    <input
                      type="text"
                      name="instagramId"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.instagramId}
                    />
                    <input
                      type="text"
                      name="twitterId"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.twitterId}
                    />

                    <input
                      type="text"
                      name="linkedInId"
                      style={{ fontWeight: "400" }}
                      onChange={inputHandler}
                      placeholder=""
                      className="form-control mb-4"
                      value={user.linkedInId}
                    />  
                   
                    <br />
                    <button
                      className="btn  me-4"
                      style={{ background: "#4681f4", color: "white" }}
                      onClick={handleSubmit}
                    >
                      {" "}
                      Submit
                    </button>
                    <button
                      className="btn"
                      style={{ background: "#dd7973", color: "white" }}
                      type="reset"
                    >
                      {" "}
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostNewCommercialProperty;
