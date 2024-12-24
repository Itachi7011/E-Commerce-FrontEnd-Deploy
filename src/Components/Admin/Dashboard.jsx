import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Scatter,
} from "recharts";

const graphTypes = ["bar", "line"];

const Dashboard = () => {
  const navigate = useNavigate();

  const [Data, setData] = useState("");
  const [EmpData, setEmpData] = useState({ post: [] });
  const [showDropdown1, setShowDropdown1] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);
  const [showDropdown3, setShowDropdown3] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [graphType, setGraphType] = useState("line");
  const [onlineUsers, setOnlineUsers] = useState(0);

  const [graphData, setGraphData] = useState([]);

  const [IFSCCode, setIFSCCode] = useState("");
  const [FDRateInterest, setFDRateInterest] = useState("");
  const [LoanPercentage, setLoanPercentage] = useState("");
  const [PhoneAndEmail, setPhoneAndEmail] = useState("");

  const [SavingAccountList, setSavingAccountList] = useState({ post: [] });
  const [CurrentAccountList, setCurrentAccountList] = useState({ post: [] });
  const [LoanAccountList, setLoanAccountList] = useState({ post: [] });

  const [Uptime, setUptime] = useState("");
  const [SystemStatus, setSystemStatus] = useState("");
  const [DatabaseStatus, setDatabaseStatus] = useState("");
  const [ResponseTime, seResponseTime] = useState("");

  const UserDetails = async () => {
    try {
      const res = await fetch("/api/empProfile", {
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

  useEffect(() => {
    axios
      .get("/api/allSavingAccounts")
      .then((response) => {
        const data = response.data;

        setSavingAccountList({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/allCurrentAccounts")
      .then((response) => {
        const data = response.data;

        setCurrentAccountList({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/savingAccountLoansList")
      .then((response) => {
        const data = response.data;

        setLoanAccountList({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/onlineUsers")
      .then((response) => {
        const data = response.data;

        const graphData = data.map((item) => ({
          time: item.dateOfFormSubmission,

          online: item.onlineUsers,
        }));

        setGraphData(graphData);

        setOnlineUsers({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/onlineEmployeesList")
      .then((response) => {
        const data = response.data;

        setEmpData({ post: data });
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/ifscCode")
      .then((response) => {
        const data = response.data;

        setIFSCCode(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);


  useEffect(() => {
    axios
      .get("/api/fdRateInterest")
      .then((response) => {
        const data = response.data;

        setFDRateInterest(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/loanPercentage")
      .then((response) => {
        const data = response.data;

        setLoanPercentage(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/phoneAndEmail")
      .then((response) => {
        const data = response.data;

        setPhoneAndEmail(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/uptime")
      .then((response) => {
        const data = response.data;

        setUptime(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/system-status")
      .then((response) => {
        const data = response.data;

        setSystemStatus(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/db-status")
      .then((response) => {
        const data = response.data;

        setDatabaseStatus(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/response-time")
      .then((response) => {
        const data = response.data;

        seResponseTime(data);
      })
      .catch((err) => {
        console.log("Error during Data:", err);
      });
  }, []);

  console.log("Uptime", Uptime);
  console.log("SystemStatus", SystemStatus);
  console.log("DatabaseStatus", DatabaseStatus);
  console.log("ResponseTime", ResponseTime);

  const SavingAccounts = SavingAccountList.post;
  const CurrentAccounts = CurrentAccountList.post;
  const LoanAccounts = LoanAccountList.post;

  const onlineSavingAccounts = SavingAccounts.filter(
    (account) => account.status === "online"
  );

  const offlineSavingAccounts = SavingAccounts.filter(
    (account) => account.status === "offline"
  );
  const pendingSavingAccounts = SavingAccounts.filter(
    (account) => account.accountStatus === "pending"
  );
  const ActiveSavingAccounts = SavingAccounts.filter(
    (account) => account.accountStatus === "Active"
  );

  const onlineCurrentAccounts = CurrentAccounts.filter(
    (account) => account.status === "online"
  );
  const offlineCurrentAccounts = CurrentAccounts.filter(
    (account) => account.status === "offline"
  );
  const pendingCurrentAccounts = CurrentAccounts.filter(
    (account) => account.accountStatus === "pending"
  );
  const ActiveCurrentAccounts = CurrentAccounts.filter(
    (account) => account.accountStatus === "Active"
  );

  const FDLoanAccounts = LoanAccounts.filter(
    (account) => account.loanType === "Loan Against Fixed Desposit"
  );

  const BusinessLoanAccounts = LoanAccounts.filter(
    (account) => account.loanType === "Business Loan"
  );

  const InsuranceLoanAccounts = LoanAccounts.filter(
    (account) => account.loanType === "Loan Against Insurance"
  );

  const TotalSavingAccounts = SavingAccountList.post.length;
  const TotalCurrentAccounts = CurrentAccountList.post.length;

  const TotalAccounts =
    SavingAccountList.post.length + CurrentAccountList.post.length;
  const TotalActiveAccounts =
    ActiveSavingAccounts.length + ActiveCurrentAccounts.length;
  const TotalPendingAccounts =
    pendingSavingAccounts.length + pendingCurrentAccounts.length;
  const TotalOnlineAccounts1 =
    onlineSavingAccounts.length + onlineCurrentAccounts.length;

  const TotalOfflineAccounts1 =
    offlineSavingAccounts.length + offlineCurrentAccounts.length;

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  function convertKBtoGB(kb) {
    return (kb / 1024 / 1024 / 1000).toFixed(2);
  }
  function convertKBtoMB(kb) {
    return (kb / 1024 / 1024).toFixed(2);
  }
  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    setSearchTerm(searchTerm);

    const searchResults = EmpData.post.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.scale).toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(item.phoneNo_1)
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setSearchResults(searchResults);
  };

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems = searchTerm
    ? searchResults.slice(indexOfFirstItem, indexOfLastItem)
    : EmpData.post.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectChange = (event, id) => {
    const { checked } = event.target;

    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, id]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== id)
      );
    }
  };

  // if (![4, 5, "4", "5"].includes(Data.scale)) {
  //   return (
  //     <div>
  //       <h2 style={{ textAlign: "center", width: "70%", margin: "4rem auto" }}>
  //         Sorry You Are Not Authorised To Visit This Page
  //       </h2>
  //     </div>
  //   );
  // }

  return (
    <>
      <div>
        <div className="container-fluid mt-4">
          <div className="row">
            <div
              className="col dashboard-top-col pt-3 me-4"
              style={{
                marginLeft: "10%",
                color: "white",
                background: "#FF6600",
              }}
            >
              <h2>{TotalAccounts}</h2>
              <h6 style={{ marginBottom: "-2rem" }}>Total A/C</h6>
              <i className="dashboard-top-col_icon fas fa-users fa-3x"></i>

              <hr />

              <i
                className="fas fa-chevron-down"
                style={{
                  cursor: "pointer",
                  padding: "0.3rem",
                  paddingRight: "15.4rem",
                  paddingTop: "1.5rem",
                  marginTop: "-1rem",
                }}
                onClick={() => setShowDropdown1(!showDropdown1)}
              ></i>
              {showDropdown1 && (
                <div>
                  <p>
                    Total Online Users :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {TotalOnlineAccounts1}
                    </span>
                  </p>

                  <p>
                    Total Pending A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {TotalPendingAccounts}
                    </span>
                  </p>

                  <p>
                    Total Active A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {TotalActiveAccounts}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div
              className="col dashboard-top-col pt-3 me-4"
              style={{
                color: "white",
                background: "#00CC99",
              }}
            >
              <h2> {SavingAccounts.length} </h2>
              <h6 style={{ marginBottom: "-2rem" }}>Saving A/C</h6>
              <i className="dashboard-top-col_icon fas fa-users fa-3x"></i>
              <hr />

              <i
                className="fas fa-chevron-down"
                style={{
                  cursor: "pointer",
                  padding: "0.3rem",
                  paddingRight: "15.4rem",
                  paddingTop: "1.5rem",
                  marginTop: "-1rem",
                }}
                onClick={() => setShowDropdown1(!showDropdown1)}
              ></i>

              {showDropdown1 && (
                <div>
                  <p>
                    Online Users :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {onlineSavingAccounts.length}
                    </span>
                  </p>

                  <p>
                    Pending Saving A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {pendingSavingAccounts.length}
                    </span>
                  </p>

                  <p>
                    Active Saving A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {ActiveSavingAccounts.length}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div
              className="col dashboard-top-col pt-3 me-4"
              style={{
                color: "white",
                background: "#D92121",
              }}
            >
              <h2> {CurrentAccounts.length} </h2>
              <h6 style={{ marginBottom: "-2rem" }}>Current A/C</h6>
              <i className="dashboard-top-col_icon fas fa-users fa-3x"></i>
              <hr />

              <i
                className="fas fa-chevron-down"
                style={{
                  cursor: "pointer",
                  padding: "0.3rem",
                  paddingRight: "15.4rem",
                  paddingTop: "1.5rem",
                  marginTop: "-1rem",
                }}
                onClick={() => setShowDropdown1(!showDropdown1)}
              ></i>
              {showDropdown1 && (
                <div>
                  <p>
                    Total Online Users :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {onlineCurrentAccounts.length}
                    </span>
                  </p>

                  <p>
                    Pending Current A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {pendingCurrentAccounts.length}
                    </span>
                  </p>

                  <p>
                    Active Current A/C :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {ActiveCurrentAccounts.length}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div
              className="col dashboard-top-col pt-3 me-4"
              style={{
                color: "white",
                background: "#150DF7",
              }}
            >
              <h2> {LoanAccounts.length} </h2>
              <h6 style={{ marginBottom: "-2rem" }}>Total Loans</h6>
              <i className="dashboard-top-col_icon fas fa-users fa-3x"></i>
              <hr />

              <i
                className="fas fa-chevron-down"
                style={{
                  cursor: "pointer",
                  padding: "0.3rem",
                  paddingRight: "15.4rem",
                  paddingTop: "1.5rem",
                  marginTop: "-1rem",
                }}
                onClick={() => setShowDropdown1(!showDropdown1)}
              ></i>

              {showDropdown1 && (
                <div>
                  <p>
                    Businesse Loans :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {BusinessLoanAccounts.length}
                    </span>
                  </p>

                  <p>
                    Loans Against FD :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {FDLoanAccounts.length}
                    </span>
                  </p>

                  <p>
                    Loans Against Insur. :{" "}
                    <span style={{ marginLeft: "2rem" }}>
                      {InsuranceLoanAccounts.length}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="row mt-4 mb-4">
            <div
              className="col dashboard1-top-col pt-3 me-4"
              style={{
                marginLeft: "10%",
                color: "white",
                background: "#93C572",
                // textAlign: "center",
              }}
            >
              <h3 style={{ textAlign: "center" }}>
                Bank Settings<i className=" fas fa-users-cog fa-x ms-3"></i>
              </h3>
              <hr style={{ height: "5px", width: "100%" }} />

              <i
                className="fas fa-chevron-down mb-4"
                style={{
                  marginTop: "-0.8rem",
                  marginBottom: "-3.5rem",
                  cursor: "pointer",
                  padding: "0.3rem 17.5rem",
                  paddingBottom: "1rem",
                }}
                onClick={() => setShowDropdown2(!showDropdown2)}
              ></i>

              {!showDropdown2 && (
                <div className="container-fluid">
                  <div className="row ">
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      IFSC Code
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {IFSCCode.ifscCode}{" "}
                    </div>
                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">Email</div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.email}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Emergency No.
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.emergencyNo}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Loan Enquiry No.
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.loanEnquiryNo}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Technical Help No.
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.technicalHelpNo}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Fraud Compliant No.
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.fraudComplaintNo}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      New Offers No.
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {PhoneAndEmail.newOffersNo}{" "}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Fixed Deposit Interest %
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {FDRateInterest.fdRatePercent} %
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Loan Against Property{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.loanAgainstProperty} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Loan Against Insurance{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.loanAgainstInsurance} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Loan Against F.D{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.loanAgainstFixedDesposit} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Personel Loan{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.personalLoan} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Business Loan{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.BusinessLoan} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Education Loan{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.EducationLoan} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Vehicle Loan (Non E-V){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.non_E_V_VehicleLoan} %
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Vehicle Loan (E-V){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {LoanPercentage.e_V_VehicleLoan} %
                    </div>

                    <hr style={{ height: "5px", width: "100%" }} />
                  </div>
                </div>
              )}
            </div>

            <div
              className="col dashboard1-top-col pt-3 me-4"
              style={{
                color: "white",
                background: "#A020F0",
                // textAlign: "center",
              }}
            >
              <h3 style={{ textAlign: "center" }}>
                System <i className=" fas fa-tools fa-x ms-3"></i>
              </h3>
              <hr style={{ height: "5px", width: "100%" }} />
              <i
                className="fas fa-chevron-down mb-4"
                style={{
                  marginTop: "-0.8rem",
                  marginBottom: "-3.5rem",
                  cursor: "pointer",
                  padding: "0.3rem 17.5rem",
                  paddingBottom: "1rem",
                }}
                onClick={() => setShowDropdown3(!showDropdown3)}
              ></i>
              {showDropdown3 && (
                <div className="container-fluid">
                  <div className="row ">
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Database Connection
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {DatabaseStatus.message}{" "}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Server Resp. Time
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {ResponseTime.responseTime}{" "}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      System Uptime
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {Uptime.uptime}{" "}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">CPU</div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {SystemStatus.cpu.manufacturer}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">Brand</div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {SystemStatus.cpu.brand}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">Model </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {SystemStatus.cpu.model}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">Cores </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {SystemStatus.cpu.cores}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">OS Type </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {SystemStatus.os.type}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">OS Arch</div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {SystemStatus.os.arch}{" "}
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      OS Release{" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {SystemStatus.os.release}
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Total Memory (RAM){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {convertKBtoGB(SystemStatus.memory.total)} GB
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Used Memory (RAM){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {convertKBtoGB(SystemStatus.memory.used)} GB
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Active Memory (RAM){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {convertKBtoGB(SystemStatus.memory.active)} GB
                    </div>

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      Available Memory (RAM){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {convertKBtoGB(SystemStatus.memory.available)} GB
                    </div>

                    <hr style={{ height: "2px", width: "100%" }} />

                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      Total Disk (Storage){" "}
                    </div>
                    <div className="col-lg-6 col-md-6 col-6 mb-3">
                      {" "}
                      {SystemStatus.disk.total}
                    </div>

                    <hr style={{ height: "5px", width: "100%" }} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="row mt-4"
            style={{ marginLeft: "8rem", marginRight: "1rem" }}
          >
            <h2
              className="mt-3 mb-3"
              style={{
                color: "white",
                background: "#367588",
                textAlign: "center",
                padding: "0.5rem",
                borderRadius: "10px",
              }}
            >
              Users Online
            </h2>
            <select value={graphType} onChange={handleGraphTypeChange}>
              {graphTypes.map((type, _id) => (
                <option key={_id} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {graphType === "bar" && (
              <BarChart width={1800} height={600} data={graphData}>
                <Bar dataKey="online" fill="#FF0000" />

                <Bar dataKey="offline" fill="#82ca9d" />

                <XAxis dataKey="time" />

                <YAxis />

                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

                <Tooltip />
              </BarChart>
            )}
            {graphType === "line" && (
              <LineChart width={1800} height={600} data={graphData}>
                <Line
                  type="monotone"
                  dataKey="online"
                  stroke="#FF0000"
                  strokeWidth={4}
                  defaultColor="#000" // add this prop to set the default color
                />

                <Scatter dataKey="online" fill="#00FF00" />

                <XAxis dataKey="time" />

                <YAxis />

                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />

                <Tooltip />
              </LineChart>
            )}

            {/* add more graph types here */}
          </div>
          <div className="row" style={{ marginLeft: "7.5rem" }}>
            <div className="row justify-content-end">
              <div className="col-md-12" style={{ marginLeft: "2rem" }}>
                <h2
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "#367588",
                    borderRadius: "10px",
                  }}
                >
                  List Of Employees Online
                </h2>
                <div className="adminListsSearchBar">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder=" Search by name or email"
                  />
                </div>
                <table className="table table-striped table-hover table-bordered">
                  <thead
                    style={{
                      backgroundColor: "#708090",
                      color: "white",
                      textAlign: "center",
                    }}
                  >
                    <th>S No.</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Scale</th>
                    <th>Father&apos;s Name</th>
                    <th>Phone No.</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Online</th>
                    <th>Profile</th>
                  </thead>
                  {currentItems.map(
                    (
                      {
                        name,
                        userImage,
                        email,
                        bankBranch,
                        accountNumber,
                        fatherName,
                        phoneNo_1,
                        occupation,
                        scale,
                        country,
                        status,
                        state,
                        district,
                        accountStatus,
                        _id,
                      },
                      index
                    ) => {
                      return (
                        <>
                          <tbody>
                            <tr className="bg-light">
                              <td>{indexOfFirstItem + index + 1}</td>
                              <td>
                                <img
                                  src={userImage.data}
                                  alt="user-photo"
                                  style={{ height: "10vh", width: "8vw" }}
                                />
                              </td>

                              <td>{name}</td>
                              <td>{bankBranch}</td>
                              <td>
                                {[4, 5, "4", "5"].includes(scale) ? (
                                  <span
                                    style={{
                                      border: "2px solid blue",
                                      padding: "0.3rem",
                                    }}
                                  >
                                    {" "}
                                    {scale}
                                  </span>
                                ) : scale === "TechnicalStaff" ? (
                                  <u> Tech. Staff </u>
                                ) : (
                                  scale
                                )}
                              </td>
                              <td>{fatherName}</td>
                              <td>{phoneNo_1}</td>
                              <td>{email}</td>
                              <td>{(district, state, country)}</td>
                              <td>
                                {status === "online" ? (
                                  <i
                                    className="fas fa-signal"
                                    style={{
                                      fontSize: "50px",
                                      color: "green",
                                      border: "2px solid green",
                                      padding: "0.2rem",
                                      borderRadius: "5px",
                                    }}
                                  ></i>
                                ) : (
                                  <i
                                    className="fas fa-signal"
                                    style={{ fontSize: "50px", color: "red" }}
                                  ></i>
                                )}
                              </td>

                              <td>
                                <form method="POST" action="/updateArticle">
                                  <input
                                    type="hidden"
                                    name="_id"
                                    value={_id}
                                  ></input>
                                  <button
                                    type="submit"
                                    className="btn btn-info px-3"
                                    onClick={() => {
                                      let url;

                                      switch (scale) {
                                        case "1":

                                        case 1:
                                          url = "/Scale1EmpAdminProfile";

                                          break;

                                        case "2":

                                        case 2:
                                          url = "/Scale2EmpAdminProfile";

                                          break;

                                        case "3":

                                        case 3:
                                          url = "/Scale3EmpAdminProfile";

                                          break;

                                        case "4":

                                        case 4:
                                          url = "/Scale4EmpAdminProfile";

                                          break;

                                        case "5":

                                        case 5:
                                          url = "/Scale5EmpAdminProfile";

                                          break;

                                        case "TechnicalStaff":
                                          url = "/TechnicalStaffAdminProfile";

                                          break;

                                        default:
                                          url = "/default-profile"; // or some other default URL

                                          break;
                                      }

                                      navigate(url, {
                                        state: {
                                          id: _id,
                                        },
                                      });
                                    }}
                                  >
                                    <i className="fas fa-user"></i>
                                  </button>
                                </form>
                              </td>

                              <td></td>
                            </tr>
                          </tbody>
                        </>
                      );
                    }
                  )}
                </table>
              </div>
            </div>

            <nav aria-label="..." style={{ width: "50%", margin: "1rem auto" }}>
              <ul className="pagination" style={{ cursor: "pointer" }}>
                {Array(Math.ceil(EmpData.post.length / itemsPerPage))
                  .fill(0)

                  .map((_, index) => {
                    const startIndex = index * itemsPerPage;

                    const endIndex = startIndex + itemsPerPage;

                    const currentPageItems = EmpData.post.slice(
                      startIndex,
                      endIndex
                    );

                    if (currentPageItems.length > 0) {
                      return (
                        <li className="page-item" key={index}>
                          <button
                            className="page-link"
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      );
                    } else {
                      return null;
                    }
                  })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
