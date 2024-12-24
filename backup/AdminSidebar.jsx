import { useEffect, useRef } from "react";
import $ from "jquery"; // import jQuery
import { useState } from "react";
import axios from "axios";

import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RedeemIcon from "@mui/icons-material/Redeem";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import FestivalIcon from "@mui/icons-material/Festival";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import SettingsIcon from "@mui/icons-material/Settings";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import SavingsIcon from "@mui/icons-material/Savings";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FeedbackIcon from "@mui/icons-material/Feedback";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import FacebookIcon from "@mui/icons-material/Facebook";
import GroupIcon from "@mui/icons-material/Group";

const AdminSidebar = () => {
  const [user, setUser] = useState("");
  const [sidebarActive, setSidebarActive] = useState(false);

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

  const handleMenuBtnClick = () => {
    setSidebarActive(true);
  };

  const handleCloseBtnClick = () => {
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



  if (user.userType !== "Admin") {
    return <div></div>;
  }
  return (
    <>
      <div
        className="menu-btn"
        onClick={handleMenuBtnClick}
        style={{ marginTop: "-3rem" }}
      >



        <div
          className={"side-bar1 active"}
          style={{ marginTop: "6rem" }}
        >
          <header onClick={handleCloseBtnClick}>
          <i className="fas fa-bars ms-3"></i>
            
           
          </header>
          <div className="menu">
            <div className="item">
              <a  onClick={handleMenuBtnClick}>
                <DashboardIcon />
              </a>
            </div>

            <div className="item"  onClick={handleMenuBtnClick}>
              <a >
                <HomeIcon /> 
              </a>
            </div>

            <div className="item" >
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={handleMenuBtnClick}              >
                <GroupIcon /> 
              </a>
              <div className="sub-menu">
                <a href="AdminCustomersList" className="sub-item">
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
                onClick={() => handleSubBtnClick(1)}
              >
                <GroupIcon /> 
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
                onClick={() => handleSubBtnClick(2)}
              >
                <GroupIcon /> 
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
                onClick={() => handleSubBtnClick(3)}
              >
                <PersonAddIcon /> 
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
                onClick={() => handleSubBtnClick(4)}
              >
                <ThumbDownIcon />
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
                onClick={() => handleSubBtnClick(5)}
              >
                <ReceiptLongIcon />
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
                onClick={() => handleSubBtnClick(6)}
              >
                <CurrencyRupeeIcon />
              </a>
              <div className="sub-menu">
                <a href="/CustomerSavingCreditDebitAmount" className="sub-item">
                  Saving A/C
                </a>

                <a href="/CustomerCurrentCreditDebitAmount" className="sub-item">
                  Current A/C
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(7)}
              >
                <DirectionsCarIcon /> 
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
                onClick={() => handleSubBtnClick(8)}
              >
                <SavingsIcon /> 
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
                onClick={() => handleSubBtnClick(9)}
              >
                <LocalMallIcon /> 
              </a>
              <div className="sub-menu">
                <a href="/AddLoanOffer" className="sub-item">
                  Add New Loan Scheme
                </a>
                <a href="/ViewAllLoanOffers" className="sub-item">
                  Show All Loan Schemes
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(10)}
              >
                <RedeemIcon />
                
              </a>
              <div className="sub-menu">
                <a href="/FarmersCompensation" className="sub-item">
                  Farmers
                </a>
                <a href="/PrivateJobCompensation" className="sub-item">
                  Private Jobs
                </a>
                <a href="/DefenceForcesCompensation" className="sub-item">
                  Defence Forces (Active)
                </a>
                <a href="/PensionHoldersCompensation" className="sub-item">
                  Pension Holders
                </a>
                <a href="/GovtJobCompensation" className="sub-item">
                  Govt. Jobs
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(11)}
              >
                <NewspaperIcon />
              </a>
              <div className="sub-menu">
                <a href="NewCicular" className="sub-item">
                  Add New Circular
                </a>
                <a href="/ShowAllCirculars" className="sub-item">
                  Show All Circulars
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(12)}
              >
                <FestivalIcon />
              </a>
              <div className="sub-menu">
                <a href="/AddNewBranches" className="sub-item">
                  Add New Branches
                </a>
                <a href="/ViewAllBranches" className="sub-item">
                  Show All Branches
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(13)}
              >
                <NoteAddIcon /> 
              </a>
              <div className="sub-menu">
                <a href="/add-new-page" className="sub-item">
                  Credit Card Requests
                </a>
                <a href="/view-pages-list" className="sub-item">
                  Debit Card Requests
                </a>
              </div>
            </div>

            <div className="item">
              <a
                className="sub-btn"
                ref={(ref) => subBtnRefs.current.push(ref)}
                onClick={() => handleSubBtnClick(14)}
              >
                <SettingsIcon /> 
              </a>

              <div className="sub-menu">
                <a href="/IFSCCode" className="sub-item">
                  IFSC Code
                </a>
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
                onClick={() => handleSubBtnClick(15)}
              >
                <ContactPageIcon /> 
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
                onClick={() => handleSubBtnClick(16)}
              >
                <QueryStatsIcon /> 
              </a>
              <div className="sub-menu">
                <a href="/LoanEnquiryList" className="sub-item">
                  Loan Enquiry
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
              <a href="#">
                <FeedbackIcon /> 
              </a>
            </div>
            <div className="item">
              <a href="/Logout">
                <LogoutIcon /> 
              </a>
            </div>
          </div>
        </div>


      </div>



      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}
      {/*                 Previous Data Of Sidebar            */}



      

      <div
        className={`side-bar ${sidebarActive ? "active" : ""}`}
        style={{ marginTop: "6rem" }}
      >
        <header onClick={handleCloseBtnClick}>

          <div className="close-btn">

            <i className="fas fa-times"></i>
          </div>
          <img
            id="sidebar-image"
            src={user.userImage.data}
            alt=""
          />
        </header>
        <div className="menu">
          <div className="item">
            <a href="/Dashboard">
              <DashboardIcon /> Dashboard
            </a>
          </div>

          <div className="item">
            <a href="/">
              <HomeIcon /> Home Page
            </a>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(0)}
            >
              <GroupIcon /> Accounts Info.
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="AdminCustomersList" className="sub-item">
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
              onClick={() => handleSubBtnClick(1)}
            >
              <GroupIcon /> Tags
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(2)}
            >
              <GroupIcon /> Navbar Items
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(3)}
            >
              <PersonAddIcon /> Markets
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(4)}
            >
              <ThumbDownIcon /> Products
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(5)}
            >
              <ReceiptLongIcon /> Brands / Companies
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(6)}
            >
              <CurrencyRupeeIcon /> Credit / Debit Amount
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/CustomerSavingCreditDebitAmount" className="sub-item">
                Saving A/C
              </a>

              <a href="/CustomerCurrentCreditDebitAmount" className="sub-item">
                Current A/C
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(7)}
            >
              <DirectionsCarIcon /> Categories
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(8)}
            >
              <SavingsIcon /> Bank Offers
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(9)}
            >
              <LocalMallIcon /> Loans Schemes
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/AddLoanOffer" className="sub-item">
                Add New Loan Scheme
              </a>
              <a href="/ViewAllLoanOffers" className="sub-item">
                Show All Loan Schemes
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(10)}
            >
              <RedeemIcon /> Compensation
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/FarmersCompensation" className="sub-item">
                Farmers
              </a>
              <a href="/PrivateJobCompensation" className="sub-item">
                Private Jobs
              </a>
              <a href="/DefenceForcesCompensation" className="sub-item">
                Defence Forces (Active)
              </a>
              <a href="/PensionHoldersCompensation" className="sub-item">
                Pension Holders
              </a>
              <a href="/GovtJobCompensation" className="sub-item">
                Govt. Jobs
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(11)}
            >
              <NewspaperIcon /> Circulars
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="NewCicular" className="sub-item">
                Add New Circular
              </a>
              <a href="/ShowAllCirculars" className="sub-item">
                Show All Circulars
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(12)}
            >
              <FestivalIcon /> Branches
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/AddNewBranches" className="sub-item">
                Add New Branches
              </a>
              <a href="/ViewAllBranches" className="sub-item">
                Show All Branches
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(13)}
            >
              <NoteAddIcon /> Credit / Debit Cards
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/add-new-page" className="sub-item">
                Credit Card Requests
              </a>
              <a href="/view-pages-list" className="sub-item">
                Debit Card Requests
              </a>
            </div>
          </div>

          <div className="item">
            <a
              className="sub-btn"
              ref={(ref) => subBtnRefs.current.push(ref)}
              onClick={() => handleSubBtnClick(14)}
            >
              <SettingsIcon /> Settings
              <i className="fas fa-angle-right dropdown"></i>
            </a>

            <div className="sub-menu">
              <a href="/IFSCCode" className="sub-item">
                IFSC Code
              </a>
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
              onClick={() => handleSubBtnClick(15)}
            >
              <ContactPageIcon /> Contact Info
              <i className="fas fa-angle-right dropdown"></i>
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
              onClick={() => handleSubBtnClick(16)}
            >
              <QueryStatsIcon /> Enquiries
              <i className="fas fa-angle-right dropdown"></i>
            </a>
            <div className="sub-menu">
              <a href="/LoanEnquiryList" className="sub-item">
                Loan Enquiry
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
            <a href="#">
              <FeedbackIcon /> Reviews
            </a>
          </div>
          <div className="item">
            <a href="/Logout">
              <LogoutIcon /> Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
