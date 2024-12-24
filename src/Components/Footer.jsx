import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React, { useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";


const NewFooter = () => {

  const { state, dispatch } = useContext(UserContext);

  const [Profile, setProfile] = useState("");
  const [PhoneNosData, setPhoneNos] = useState({});
  const [SocialMediaData, setSocialMedia] = useState({});

  useEffect(() => {
    axios
      .get("/api/userProfile")
      .then(async (response) => {
        const data = await response.data;

        setProfile(data);

        console.log("data fetched successfully");
      })
      .catch((err) => {
        console.log(`Error during catch of setProfile -  ${err}`);
      });
  }, []);

  useEffect(() => {

    axios

      .get("/api/phoneAndEmailAPI")

      .then((response) => {
        const data = response.data;
        setPhoneNos(data[0]);
      })

      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios

      .get("/api/socialMediaAPI")

      .then((response) => {
        const data = response.data;
        setSocialMedia(data[0]);
      })

      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  const handleToggleFooter = () => {

    dispatch({ type: "TOGGLE_FOOTER" });

  };

  return (
    <>
      {Profile.userType === "Admin" && (

        <div className="footer-toggle-container">

          <button className="footer-toggle-button" onClick={handleToggleFooter}>

            {state.isFooterActive ? "Hide Footer" : "Show Footer"}

          </button>

        </div>

      )}

      {state.isFooterActive && (
        <footer>
          <div className="container mt-5" style={{ color: "white" }}>
            <div className="footer-top">
              <div className="row">
                <div className="col-md-6 col-lg-3 about-footer">
                  <h3 style={{ color: "white" }}>Weekly Markets </h3>
                  <ul>
                    <li>

                      <i className="fas fa-envelope"></i>
                      {PhoneNosData.email}

                    </li>

                    <li>
                      <i className="fas fa-map-marker-alt"></i>
                      1 / 105, Bay Lights,
                      <br />
                      Lakshmi Nagar,
                      <br />
                      Delhi-110032
                    </li>
                  </ul>
                  {/* <a href="" className="btn red-btn">
                  Book Now
                </a> */}
                </div>
                <div className="col-md-6 col-lg-2 page-more-info">
                  <div className="footer-title">
                    <h4 style={{ color: "white" }}>Page links</h4>
                  </div>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Loan Offers</a>
                    </li>
                    <li>
                      <a href="#">Circulars</a>
                    </li>

                  </ul>
                </div>

                <div className="col-md-6 col-lg-3 page-more-info">
                  <div className="footer-title">
                    <h4 style={{ color: "white" }}>Important Links</h4>
                  </div>
                  <ul>
                    <li>
                      <a href="https://www.rbi.org.in/">RBI</a>
                    </li>
                    <li>
                      <a href="https://rbikehtahai.rbi.org.in/">RBI Kehta Hai</a>
                    </li>
                    <li>
                      <a href="http://www.sebi.gov.in/sebiweb/">SEBI</a>
                    </li>
                    <li>
                      <a href="https://www.irdai.gov.in/">IRDA </a>
                    </li>

                  </ul>
                </div>
                <div className="col-md-6 col-lg-4 open-hours">
                  <div className="footer-title">
                    <h4 style={{ color: "white" }}>Contact</h4>
                    <ul className="footer-social">
                      <li>
                        <a href={"/" + SocialMediaData.facebookId} target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href={"/" + SocialMediaData.twitterId} target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href={"/" + SocialMediaData.instagramId} target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href={"/" + SocialMediaData.linkedInId} target="_blank">
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <table className="table">
                    <tbody>
                      <tr className="">
                        <td>
                          <i className="fas fa-phone fa-flip-horizontal"></i>Emergency No.
                        </td>
                        <td> +91 {PhoneNosData.emergencyNo}</td>
                      </tr>
                      <tr className="">
                        <td>
                          <i className="fas fa-phone fa-flip-horizontal"></i>Compalaint No.
                        </td>
                        <td> +91 {PhoneNosData.fraudComplaintNo}</td>
                      </tr>
                      <tr className="">
                        <td>
                          <i className="fas fa-phone fa-flip-horizontal"></i>Helpline No.
                        </td>
                        <td> +91 {PhoneNosData.technicalHelpNo}</td>
                      </tr>
                      <tr className="">
                        <td>
                          <i className="fas fa-phone fa-flip-horizontal"></i>Loan Enq. No.
                        </td>
                        <td> +91 {PhoneNosData.loanEnquiryNo}</td>
                      </tr>
                      <tr className="">
                        <td>
                          <i className="fas fa-phone fa-flip-horizontal"></i>New Offers No.
                        </td>
                        <td> +91 {PhoneNosData.newOffersNo}</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />

                  {/* <div className="footer-logo">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                        </td>
                        <td>
                          <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                        </td>
                        <td>
                          <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                        </td>
                        <td>
                          <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                        </td>
                        <td>
                          <img src="https://i.ibb.co/vxc577d/dummy-logo3.jpg" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                </div>


              </div>
            </div>
            <hr />
            <div className="footer-bottom">
              <div className="row">
                <div className="col-sm-4">
                  <a href="">Privacy policy</a>
                </div>
                <div className="col-sm-8">
                  <p>Indian Online Banking System @ 2024 All rights reserved</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

      )}

    </>
  );
};
export default NewFooter;
