
import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { Helmet } from 'react-helmet';

import axios from "axios";


const HomePage = () => {

  const navigate = useNavigate();

  const [Data1, setData1] = useState({ post: [] });
  const [User1, setUser1] = useState({ post: [] });






  const Profile = async () => {
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

      setUser1(data);

      if (!res === 200) {
        throw new Error(`Error during retreive data - ${Error}`);
      }
    } catch (err) {
      console.log(`Error during catch of CustomerSavingAccountsProfile -  ${err}`);
    }
  };

  useEffect(() => {
    Profile();
  }, []);

  useEffect(() => {
    axios
      .get("/api/productsList")
      .then((response) => {
        const data = response.data;

        setData1({ post: data });

        console.log("data fetch successfully");
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);



  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const getStarColor = (index, rating) => {

    if (index < rating) {

      // If the index is less than the rating, color the star based on the rating

      switch (rating) {

        case 1:

          return 'darkred'; // 1 star

        case 2:

          return '#FF6347'; // Light red for 2 stars

        case 3:

          return '#FFD700'; // Yellow for 3 stars

        case 4:

          return '#3CB371'; // Light green for 4 stars

        case 5:

          return 'green'; // Dark green for 5 stars

        default:

          return 'gray'; // Default color for no stars

      }

    } else {

      // If the index is greater than or equal to the rating, return light gray

      return 'lightgray';

    }

  };



  return (


    <div style={{ margin: "1rem" }}>

      <div>

        {/* First Carousel */}

        <section className="location-section">


          <div className="similarProductsDiv">

            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClassName="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClassName="custom-dot-list-style"
              itemClassName="carousel-item"
            >

              {Data1.post.map(({
                _id,
                id,
                name,
                category,
                subCategory,
                marketName,
                newOrRefurbished,
                isPopular,
                reviews,
                isNewProduct,
                isPremium,
                isLimitedTimeDeal,
                price,
                effectivePrice,
                brand,
                model,
                color,
                weight,
                dimensions,
                stockNextRefillDate,
                sellerDiscount,
                adminDiscount,
                stock_available,
                tags,
                images,
                averageRating,
                youtubeUrl,
                productDetails,
                warrantyDetails,
                technicalDetails,
                rating,
                comments,
                freqAskedQuest,
                totalSold,
                totalCart,
                createdByName,
                createdByType,
                dateOfFormSubmission,
              }) => (


                <div key={_id} className="card" style={{ height: "650px", margin: "1rem" }}>

                  {isPremium === true ? (<span className="badge bg-warning text-dark position-absolute" style={{ top: "10px", left: "10px", zIndex: 1 }}>

                    Premium

                  </span>) : ""}




                  {isPopular === true ? (<span className="badge  position-absolute" style={{ top: "50px", left: "10px", zIndex: 1, background: "#00A86B" }}>

                    New

                  </span>) : ""}





                  <span className="rating-stars position-absolute" style={{ top: "10px", right: "10px", zIndex: 1 }}>

                    {[...Array(5)].map((_, index) => (

                      <i key={index} className="fas fa-star" style={{ color: getStarColor(index, parseInt(averageRating)), fontSize: "large", }}></i>

                    ))}
                  </span>



                  <img src={images[0].data} className="card-img-top" alt={name} style={{ width: "100%", height: "450px", objectFit: "cover", position: "relative", cursor: "pointer" }} onClick={function () {
                    const formattedName = encodeURIComponent(name);
                    console.log("Navigating to ProductProfile with name:", formattedName);
                    navigate(`/ProductProfile/${name}`, {
                      state: {
                        _id: _id,
                        id: id,
                        name: name,
                      },
                    });
                  }} />
                  {isPopular === true ? (<span className="badge bg-primary text-white position-absolute" style={{ top: "50px", right: "10px", zIndex: 1 }}>

                    Sponsored

                  </span>) : ""}




                  <div className="card-body">

                    <h5 className="card-title">
                      <div className="" style={{ marginBottom: "-1rem" }}> {name}  <span style={{ fontSize: "smaller" }}>  </span>
                      </div>


                      <br />({newOrRefurbished}) {isLimitedTimeDeal === true ? (

                        <span style={{ position: "relative", display: "inline-block" }}>

                          <i

                            className="fa-solid fa-hourglass-half ms-2"

                            style={{ color: "white", background: "#2142AB", padding: "0.2rem 0.4rem", cursor: "pointer" }}

                          ></i>

                          {/* Tooltip */}

                          <span className="tooltip-text">It is a time-limited offer, price will rise soon</span>

                        </span>

                      ) : ""}

                      <span className="rating-stars position-absolute ms-2"
                        style={{
                          // top: "50px",
                          // right: "10px",
                          zIndex: 1,
                          background: "#00A86B"
                        }}>
                        {isNewProduct === true ? (<span className="badge "
                        >
                          Popular
                        </span>) : ""}

                      </span>

                    </h5>


                    <p className="card-text">

                      <strong> <del>₹ {price}</del> </strong>  <span className="text-danger">(-{sellerDiscount + "%" + (adminDiscount === 0 ? (" & " + adminDiscount + "%") : "")} Off)</span> <br /> <strong className="text-success"> ₹ {effectivePrice}</strong> <span className="text-danger"> Save ₹ {price - (effectivePrice - (adminDiscount || 0))} </span>

                    </p>



                  </div>

                </div>



              ))}

            </Carousel>
          </div>






        </section>




        {/* Second Carousel */}


        <section className="location-section">


          <div className="similarProductsDiv">

            <Carousel
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={true}
              ssr={true}
              infinite={true}
              autoPlaySpeed={1000}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClassName="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClassName="custom-dot-list-style"
              itemClassName="carousel-item"
            >

              {Data1.post.map(({
                _id,
                id,
                name,
                category,
                subCategory,
                marketName,
                newOrRefurbished,
                isPopular,
                reviews,
                isNewProduct,
                isPremium,
                isLimitedTimeDeal,
                price,
                effectivePrice,
                brand,
                model,
                color,
                weight,
                dimensions,
                stockNextRefillDate,
                sellerDiscount,
                adminDiscount,
                stock_available,
                tags,
                images,
                averageRating,
                youtubeUrl,
                productDetails,
                warrantyDetails,
                technicalDetails,
                rating,
                comments,
                freqAskedQuest,
                totalSold,
                totalCart,
                createdByName,
                createdByType,
                dateOfFormSubmission,
              }) => (




                <div key={_id} className="card" style={{ height: "650px", margin: "1rem" }}>

                  {isPremium === true ? (<span className="badge bg-warning text-dark position-absolute" style={{ top: "10px", left: "10px", zIndex: 1 }}>

                    Premium

                  </span>) : ""}




                  {isPopular === true ? (<span className="badge  position-absolute" style={{ top: "50px", left: "10px", zIndex: 1, background: "#00A86B" }}>

                    New

                  </span>) : ""}





                  <span className="rating-stars position-absolute" style={{ top: "10px", right: "10px", zIndex: 1 }}>

                    {[...Array(5)].map((_, index) => (

                      <i key={index} className="fas fa-star" style={{ color: getStarColor(index, parseInt(averageRating)), fontSize: "large", }}></i>

                    ))}
                  </span>



                  <img src={images[0].data} className="card-img-top" alt={name} style={{ width: "100%", height: "450px", objectFit: "cover", position: "relative", cursor: "pointer" }} onClick={function () {
                    const formattedName = encodeURIComponent(name);
                    console.log("Navigating to ProductProfile with name:", formattedName);
                    navigate(`/ProductProfile/${name}`, {
                      state: {
                        _id: _id,
                        id: id,
                        name: name,
                      },
                    });
                  }} />
                  {isPopular === true ? (<span className="badge bg-primary text-white position-absolute" style={{ top: "50px", right: "10px", zIndex: 1 }}>

                    Sponsored

                  </span>) : ""}




                  <div className="card-body">

                    <h5 className="card-title">
                      <div className="" style={{ marginBottom: "-1rem" }}> {name}  <span style={{ fontSize: "smaller" }}>  </span>
                      </div>


                      <br />({newOrRefurbished}) {isLimitedTimeDeal === true ? (

                        <span style={{ position: "relative", display: "inline-block" }}>

                          <i

                            className="fa-solid fa-hourglass-half ms-2"

                            style={{ color: "white", background: "#2142AB", padding: "0.2rem 0.4rem", cursor: "pointer" }}

                          ></i>

                          {/* Tooltip */}

                          <span className="tooltip-text">It is a time-limited offer, price will rise soon</span>

                        </span>

                      ) : ""}

                      <span className="rating-stars position-absolute ms-2"
                        style={{
                          // top: "50px",
                          // right: "10px",
                          zIndex: 1,
                          background: "#00A86B"
                        }}>
                        {isNewProduct === true ? (<span className="badge "
                        >
                          Popular
                        </span>) : ""}

                      </span>

                    </h5>


                    <p className="card-text">

                      <strong> <del>₹ {price}</del> </strong>  <span className="text-danger">(-{sellerDiscount + "%" + (adminDiscount === 0 ? (" & " + adminDiscount + "%") : "")} Off)</span> <br /> <strong className="text-success"> ₹ {effectivePrice}</strong> <span className="text-danger"> Save ₹ {price - (effectivePrice - (adminDiscount || 0))} </span>

                    </p>



                  </div>

                </div>



              ))}

            </Carousel>
          </div>






        </section>


      </div>
    </div>



  )
}

export default HomePage