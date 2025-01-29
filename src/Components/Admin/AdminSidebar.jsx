import { useEffect, useRef } from "react";
// import $ from "jquery"; 
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import { useContext } from "react";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AddHomeIcon from '@mui/icons-material/AddHome';
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AppleIcon from '@mui/icons-material/Apple';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SettingsIcon from "@mui/icons-material/Settings";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SavingsIcon from "@mui/icons-material/Savings";
import FeedbackIcon from "@mui/icons-material/Feedback";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import GroupIcon from "@mui/icons-material/Group";

const AdminSidebar = () => {

  const contextValue = useContext(UserContext);

  console.log(contextValue);

  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();


  const [user, setUser] = useState("");
  const [sidebarActive, setSidebarActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [navSearchContents, setNavSearchContents] = useState({ post: [] });
  const [productsData, setProductsData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);




  const subBtnRefs = useRef([]);

  useEffect(() => {
    axios
      .get("/api/userProfile")
      .then(async (response) => {
        const data = await response.data;

        setUser(data);

        console.log("data fetched successfully");
      })
      .catch((err) => {
        console.log(`Error during catch of setProfile -  ${err}`);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/adminNavBarSettingsContentsList")
      .then((response) => {
        const data = response.data;

        setNavSearchContents({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/allUsersList")
      .then((response) => {
        const data = response.data;

        setAllUsers({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/productsList")
      .then((response) => {
        const data = response.data;

        setProductsData(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  const handleMenuBtnClick = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
    setSidebarActive(true);
  };

  const handleCloseBtnClick = () => {
    dispatch({ type: "CLOSE_SIDEBAR" });
    setSidebarActive(false);
  };

  const handleSubBtnClick = (index) => {
    subBtnRefs.current[index].parentNode.querySelector(
      ".sub-menu"
    ).style.display =
      subBtnRefs.current[index].parentNode.querySelector(".sub-menu").style
        .display === "block"
        ? "none"
        : "block";
    subBtnRefs.current[index]
      .querySelector(".dropdown")
      .classList.toggle("rotate");
  };

  const handleSearchChange = (e) => {

    setSearchTerm(e.target.value);

  };

  // console.log("all users are: ", allUsers)

  const filterResults = () => {

    if (!searchTerm) return []; // Return an empty array if search term is empty

    // Filter results from both navSearchContents and productsData

    const usersResults = allUsers.post.filter(item => {

      return (

        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.phoneNo).toLowerCase().includes(searchTerm.toLowerCase()) ||

        item.email.toLowerCase().includes(searchTerm.toLowerCase())

      );

    });

    const navResults = navSearchContents.post.filter(item => {

      return (

        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

        item.details.toLowerCase().includes(searchTerm.toLowerCase())

      );

    });


    const productResults = productsData.filter(item => {

      return item.name.toLowerCase().includes(searchTerm.toLowerCase());

    });


    // Combine both results

    return [...navResults, ...productResults, ...usersResults];

  };


  useEffect(() => {

    document.addEventListener('keydown', handleEscKey);

    return () => {


      document.removeEventListener('keydown', handleEscKey);

    };

  }, []);

  const handleEscKey = (event) => {

    if (event.key === 'Escape') {

      setSearchTerm(''); // Clear the search term to hide results

    }

  };


  useEffect(() => {

    document.addEventListener('keydown', handleEscKey);

    return () => {

      document.removeEventListener('keydown', handleEscKey);

    };

  }, []);


  if (user.userType !== "Admin") {
    return <div>
    </div>;
  }

  return (
    <>

      <div className="admin-navbar"
        style={{ marginLeft: sidebarActive ? "9rem" : "0rem" }}
      >

        <div
          className="menu-btn"
          onClick={handleMenuBtnClick}
          style={{ marginTop: "-3rem" }}
        >

          {!sidebarActive ? <i className="fas fa-bars"></i> : ""}

        </div>
        <header className="navbar-main">

          <div className="logo" style={{ marginLeft: "4rem", }}> {sidebarActive ? "" : "Admin Panel"}  </div>

          <nav className="nav-links">

            <NavLink to="#" className="logo"><b>{user.name} ({user.email}) </b></NavLink>



          </nav>

          <div className="search-bar">

            Search <input

              type="text"

              placeholder="Search..."

              value={searchTerm}

              onChange={handleSearchChange}
              style={{ marginRight: sidebarActive ? "285px" : "90px" }}

            />

          </div>

        </header>
      </div>
      <div className={`admin-sidebar-search-results ${searchTerm && filterResults().length > 0 ? 'show' : ''}`}>


        {searchTerm && (

          <div className="admin-sidebar-search-results-list d-flex justify-content-between">

            <div className="nav-search-results" style={{ flex: 1, marginRight: '10px' }}>

              <h4 style={{ fontSize: "1.2rem", paddingTop: "0.8rem", paddingLeft: "1.8rem" }}>Users Search Results:</h4>
              <hr />

              {allUsers.post.filter(item =>

                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

                item.userType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(item.phoneNo).toLowerCase().includes(searchTerm.toLowerCase())

              ).map((item, index) => (

                <div key={index} className="search-result-item">

                  <NavLink to={item.link} className="nav1-item" onClick={() => setSearchTerm("")}>

                    <h4 className="nav1-item-name">

                      <i className="fas fa-user me-2"></i>

                      {item.name} &nbsp; ( <span style={{ fontWeight: "bolder" }}>  {item.userType} </span> )

                    </h4>


                  </NavLink>

                </div>

              ))}

            </div>

            <div className="nav-search-results" style={{ flex: 1, marginRight: '10px' }}>

              <h4 style={{ fontSize: "1.2rem", paddingTop: "0.8rem", paddingLeft: "1.8rem" }}>Navigation Search Results:</h4>
              <hr />

              {navSearchContents.post.filter(item =>

                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

                item.details.toLowerCase().includes(searchTerm.toLowerCase())

              ).map((item, index) => (

                <div key={index} className="search-result-item">

                  <NavLink to={item.link} className="nav1-item" onClick={() => setSearchTerm("")}>

                    <h4 className="nav1-item-name">

                      <i className="fas fa-thumbtack me-2"></i>

                      {item.name}

                    </h4>


                  </NavLink>

                </div>

              ))}

            </div>

            <div className="product-search-results" style={{ flex: 1, marginLeft: '10px' }}>

              <h4 style={{ fontSize: "1.2rem", paddingTop: "0.8rem", paddingLeft: "1.8rem" }}>Product Search Results:</h4>
              <hr />
              {productsData.filter(item =>

                item.name.toLowerCase().includes(searchTerm.toLowerCase())

              ).map((item, index) => (

                <div key={index} className="search-result-item">

                  <a onClick={function () {
                    navigate(`/ProductProfile/${item.name}`, {
                      state: {
                        _id: item._id,
                        id: item.id,
                        name: item.name,
                      },
                    });
                    setSearchTerm("");
                  }} className="nav1-item">

                    <h4 className="nav1-item-name">

                      <i className="fas fa-search me-2"></i>

                      <span style={{ fontWeight: "bolder" }}> {item.name} &nbsp; </span>  ( {item.subCategory} )

                    </h4>

                  </a>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>


      <div
        className={`side-bar ${sidebarActive ? "active" : "sidebarNotActive"}`}
        style={{ marginTop: "6rem" }}
      >
        <header onClick={handleCloseBtnClick} style={{ padding: !sidebarActive ? "0px" : "1rem" }}>

          {!sidebarActive ? "" : <>
            <div className="close-btn mt-3">

              <i className="fas fa-arrow-left"></i>
            </div>
          </>}

          {
            !sidebarActive ? "" : <img
              className="sidebar-image"
              src={user.userImage.data}
              alt=""
            />
          }

        </header>
        <div className="menu">
          <div className="item">

            <a

              href={sidebarActive ? "/Dashboard" : "/Dashboard"}

            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >

              <DashboardIcon />

              {sidebarActive ? "Dashboard" : ""}

            </a>

          </div>

          <div className="item">


            <a

              href={sidebarActive ? "/" : "/"}

            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}


            >

              <HomeIcon />

              {sidebarActive ? "Home Page" : ""}

            </a>

          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}

              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(0)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >
              <GroupIcon />   {!sidebarActive ? "" : "Accounts Info."}

              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/AdminCustomersList" className="sub-item">
                Customers A/c
              </a>
              <a href="/AdminSellerList" className="sub-item">
                Sellers A/c
              </a>
              <a href="/AdminsList" className="sub-item">
                Admins A/c
              </a>
            </div>
          </div>


          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}

              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(1)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >
              <CurrencyRupeeIcon />    {!sidebarActive ? "" : "Transactions Info."}

              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/AdminCustomersList" className="sub-item">
                Customers A/c
              </a>
              <a href="/AdminSellerList" className="sub-item">
                Sellers A/c
              </a>
              <a href="/AdminsList" className="sub-item">
                Admins A/c
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(2)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >
              <LocalOfferIcon /> {!sidebarActive ? "" : "Tags"}

              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/NewTag" className="sub-item">
                Add New Tag
              </a>
              <a href="/ShowAllTags" className="sub-item">
                Show All Tags
              </a>

            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(3)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <MyLocationIcon /> {!sidebarActive ? "" : "Navbar Items"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/NewNavbarItem" className="sub-item">
                Add Navbar Item
              </a>
              <a href="/ShowAllNavbarItems" className="sub-item">
                Show Navbar Items
              </a>

            </div>
          </div>

          {/* <div className="item"><a href="#"> <GroupIcon />New A/C Requests</a></div> */}

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(4)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >
              <LocalGroceryStoreIcon />  {!sidebarActive ? "" : "Markets"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/AddMarketData" className="sub-item">
                Add New Market
              </a>
              <a href="/ShowMarketData" className="sub-item">
                Show All Markets
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(5)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <i className="fas fa-gift admin-sidebar-icons"></i>  &nbsp; &nbsp;{!sidebarActive ? "" : " Products"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/AddProductData" className="sub-item">
                Add New Product
              </a>
              <a href="/ShowProductsData" className="sub-item">
                Show All Products
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(6)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <AppleIcon />  {!sidebarActive ? "" : "Brands / Companies"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/NewBrand" className="sub-item">
                Add New Brand
              </a>
              <a href="/ShowAllBrands" className="sub-item">
                Show All Brands
              </a>
            </div>
          </div>



          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(7)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <DirectionsCarIcon /> {!sidebarActive ? "" : "Categories"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/NewCategory" className="sub-item">
                Add New Category
              </a>
              <a href="/NewSubCategory" className="sub-item">
                Add New Sub-Category
              </a>
              <a href="/ShowAllCategories" className="sub-item">
                Show All Categories
              </a>
            </div>
          </div>




          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(8)}
            //               onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <SavingsIcon />  {!sidebarActive ? "" : "Bank Offers"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/AddBankOffer" className="sub-item">
                Add Bank Offer
              </a>
              <a href="/ViewAllBankOffers" className="sub-item">
                Show Bank Offers
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(9)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <NotificationsActiveIcon /> {!sidebarActive ? "" : "Notifications"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/NewCategory" className="sub-item">
                Add New Notification
              </a>

              <a href="/ShowAllCategories" className="sub-item">
                Show All Notifications
              </a>
            </div>
          </div>


          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(10)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}

            >
              <NewspaperIcon />  {!sidebarActive ? "" : "Advertisement"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="AddAdvertisement" className="sub-item">
                Add New Advt.
              </a>
              <a href="/ViewAllAdvertisements" className="sub-item">
                Show All Advt.s
              </a>
            </div>
          </div>





          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(11)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <i className="fas fa-search admin-sidebar-icons"></i>  &nbsp; &nbsp; {!sidebarActive ? "" : "Nav Search Contents"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>

            <div className="sub-menu">

              <a href="/NewAdminNavBarSettingsContents" className="sub-item">
                Add New Nav Content
              </a>
              <a href="/ShowAdminNavBarSettingsContents" className="sub-item">
                Show All Nav Contents
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(12)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <ContactPageIcon /> {!sidebarActive ? "" : "Contact Info"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/PhoneAndEmailAddress" className="sub-item">
                Phone No. & Email
              </a>

              <a href="/SocialMedia" className="sub-item">
                Social Media
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(13)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <AddHomeIcon /> {!sidebarActive ? "" : "HomePage Config."}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>

            <div className="sub-menu">

              <a href="/FDRateInterest" className="sub-item">
                Top Carousel
              </a>
              <a href="/LoanInterestPercentage" className="sub-item">
                Middle Ist Carousel
              </a>
              <a href="/LoanInterestPercentage" className="sub-item">
                Middle IInd Carousel
              </a>
              <a href="/MainSiteSettings" className="sub-item">
                Bottom Carousel
              </a>
              <a href="/FDRateInterest" className="sub-item">
                Top Grid
              </a>
              <a href="/LoanInterestPercentage" className="sub-item">
                Middle Ist Grid
              </a>
              <a href="/LoanInterestPercentage" className="sub-item">
                Middle IInd Grid
              </a>
              <a href="/MainSiteSettings" className="sub-item">
                Bottom Grid
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(13)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <SettingsIcon /> {!sidebarActive ? "" : "Settings"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>

            <div className="sub-menu">

              <a href="/FDRateInterest" className="sub-item">
                FD Rate %
              </a>
              <a href="/LoanInterestPercentage" className="sub-item">
                Loan %
              </a>
              <a href="/MainSiteSettings" className="sub-item">
                Main Settings
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={!sidebarActive ? handleMenuBtnClick : () => handleSubBtnClick(14)}
            // onMouseEnter={(e) => {

            //   if (!sidebarActive) {

            //     e.preventDefault(); // Prevent default link behavior

            //     handleMenuBtnClick(); // Call the onClick function

            //   }

            // }}
            >
              <QueryStatsIcon /> {!sidebarActive ? "" : "Enquiries"}
              {!sidebarActive ? "" : <i className="fas fa-angle-right dropdown"></i>}

            </a>
            <div className="sub-menu">
              <a href="/LoanEnquiryList" className="sub-item">
                Questions List
              </a>
              {/* <a href="#" className="sub-item">
                Project Enquiry
              </a>
              <a href="#" className="sub-item">
                Loan Enquiry
              </a> */}
            </div>
          </div>

          <div className="item">
            <a href={!sidebarActive ? "#" : "/Reviews"}>
              <FeedbackIcon /> {!sidebarActive ? "" : "Reviews"}
            </a>
          </div>
          <div className="item">
            <a href="/Logout">
              <LogoutIcon /> {!sidebarActive ? "" : "Logout"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
