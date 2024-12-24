import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Helmet } from "react-helmet";

const AddBankOffer = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [Data, setData] = useState("");
  const [image, setImage] = useState("");

  let name, value;
  const [user, setUser] = useState({
    bankName: "",
    tenure: "",
    processingFees: "",
    loanAmount: "",
    phoneNo: "",
    rateOfInterest: "",
    prepaymentCharges: "",
    foreclosureCharges: "",
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

  const inputHandler = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();



    var bodyFormData = new FormData();

    bodyFormData.append("bankName", user.bankName);

    bodyFormData.append("tenure", user.tenure);
    bodyFormData.append("phoneNo", user.phoneNo);

    bodyFormData.append("processingFees", user.processingFees);

    bodyFormData.append("loanAmount", user.loanAmount);

    bodyFormData.append("rateOfInterest", user.rateOfInterest);
    bodyFormData.append("prepaymentCharges", user.prepaymentCharges);
    bodyFormData.append("otherInformation", content);

    bodyFormData.append("logo", image);

    bodyFormData.append("foreclosureCharges", user.foreclosureCharges);



    try {

      const response = await axios.post(

        "/api/addBankOffer",

        bodyFormData,


        {

          headers: {

            "Content-Type": "multipart/form-data",

          },

        }

      );
      alert("New Bank Offer added Successfully");


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
      <div className="container" style={{ backgroundColor: "#808080", marginTop: "7rem" }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Title</title>
          {/* <link rel="canonical" href="http://mysite.com/example" /> */}
        </Helmet>
        <div className="row justify-content-center">
          <div
            className="col-lg-12"
            style={{
              paddingTop: "1rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              paddingBottom: "3rem",
              borderRadius: "5px",
            }}
          >
            <h3 className="text-center" style={{ marginBottom: "0.5rem", color: "white", fontSize:"1.5rem" }}>
              Add New Bank Offer
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
                    Bank Name :
                  </h6>
                  <h6 style={{ marginBottom: "2.5rem", fontSize: "1rem" }}>
                    Phone Number :
                  </h6>
                  <h6 style={{ marginBottom: "3rem", fontSize: "1rem" }}>
                    Tenure :
                  </h6>
                  <h6 style={{ marginBottom: "2.3rem", fontSize: "1rem" }}>
                    Processing Fees :
                  </h6>
                  <h6 style={{ marginBottom: "1.6rem", fontSize: "1rem" }}>
                    Rate Of Interest (% Per Year):
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                    Loan Amount :
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                    Prepayment Charges :
                  </h6>
                  <h6 style={{ marginBottom: "2rem", fontSize: "1rem" }}>
                    Foreclosure Charges :
                  </h6>
                  <h6 style={{ marginBottom: "4.8rem", fontSize: "1rem" }}>
                    Logo :
                  </h6>
                  <h6 style={{ marginBottom: "2.8rem", fontSize: "1rem" }}>
                    Other Information :
                  </h6>

                </div>
                <div className="col-lg-8">

                  <input
                    type="text"
                    name="bankName"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="phoneNo"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="tenure"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />


                  <input
                    type="text"
                    name="processingFees"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="rateOfInterest"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="loanAmount"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="prepaymentCharges"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />
                  <input
                    type="text"
                    name="foreclosureCharges"
                    style={{ fontWeight: "400" }}
                    onChange={inputHandler}
                    placeholder=""
                    className="form-control mb-4"
                  />

                  <input
                    type="file"
                    name="logo"
                    style={{ fontWeight: "400" }}
                    onChange={(e) => {
                      setImage(e.target.files[0]);

                      console.log(image);
                    }}
                    placeholder=""
                    className="form-control mb-4"
                  />

                  <br />

                  <CKEditor
                    config={{
                      height: 800,
                      toolbar: [
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "blockQuote",
                        "link",
                        "numberedList",
                        "bulletedList",
                        "imageUpload",
                        "insertTable",
                        "tableColumn",
                        "tableRow",
                        "mergeTableCells",
                        "mediaEmbed",
                        "|",
                        "undo",
                        "redo",
                      ],
                    }}
                    style={{
                      maxWidth: "100%",
                      height: "800px !important",
                      maxHeight: "800px !important",
                      marginBottom: "1rem",
                    }}
                    editor={ClassicEditor}
                    onReady={(editor) => {
                      editor.editing.view.document.on("change:data", () => {
                        // debouncedHandleInput({
                        //   target: {
                        //     name: "project_specification",
                        //     value: editor.getData(),
                        //   },
                        // });
                      });
                    }}
                    onBlur={(event, editor) => { }}
                    onFocus={(event, editor) => { }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log(data);
                      setContent(data);
                    }}
                    name="content"
                  />


                  <br />
                  <br />
                  <button className="btn btn-primary me-4" onClick={handleSubmit}>
                    {" "}
                    Submit
                  </button>
                  <button className="btn btn-primary" type="reset">
                    {" "}
                    Reset
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBankOffer;
