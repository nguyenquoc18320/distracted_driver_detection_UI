import React from "react";
import "../styles/manage_users.css";
import loadUsers from "../services/manage_users";
import activateUser from "../services/activate_user";
import deactivateUser from "../services/deactivate_user";
import { FaLock, FaLockOpen, FaPen } from "react-icons/fa";
import robot_image from "../assets/images/robot_manage_user.png";
import getTotalDistractionForAll from "../services/get_total_distraction_for_all";
import getNumDistractionByUser from "../services/get_num_distraction_by_user";
import getDistractionStatistic from "../services/get_statistic_distraction";
import ReactPaginate from "react-paginate";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from "react-router-dom";
import getTotalUsers from "../services/get_total_user";

function ManageUsers() {
  var [userList, setUserList] = React.useState([]);
  var [message, setMessage] = React.useState("");
  var [totalDistraction, setTotalDistraction] = React.useState();
  var [totalUsers, setTotalUsers] = React.useState(1);
  var [totalUserPage, setTotalUserPage] = React.useState();
  var [distractionList, setDistractionList] = React.useState([]);
  var [distractionPage, setDistractionPage] = React.useState(1);
  var [userPage, setUserPage] = React.useState(1);
  var today = new Date();
  var [selectedDate, setSelectedDate] = React.useState(today);
  var [totalDistractionPage, setTotalDistractionPage] = React.useState(1);
  const items_per_page = 10;
  const navigate = useNavigate();

  // Load user list
  React.useEffect(() => {
    //get total users
    getTotalUsers().then((res) => {
      setTotalUsers(res);
    });

    loadUsers(1, items_per_page)
      .then((res) => {
        // console.log(res.total_pages);
        setUserList(res.data);
        setTotalUserPage(res.total_pages);
        setUserPage(res.page);
      })
      .catch((e) => {
        console.log(e.message);
      });

    //get
    getTotalDistractionForAll()
      .then((res) => {
        setTotalDistraction(res);
      })
      .catch((e) => {});

    //get distraction statistic
    var today = new Date();
    getDistractionStatistic(today, 1, items_per_page)
      .then((res) => {
        setDistractionPage(res.page);
        setTotalDistractionPage(res.total_pages);
        setDistractionList(res.data);
      })
      .catch((e) => {});
  }, []);

  //change active status of an account
  async function activateAccount(accountid) {
    const result = await activateUser(accountid);

    if (result) {
      setMessage("");
      alert("Activate user successfully!");

      // load users
      loadUsers(userPage, items_per_page)
        .then((res) => {
          setUserList(res.data);
          setTotalUserPage(res.total_pages);
          setUserPage(res.page);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("Cannot activate user. Please load page and try again!");
    }
  }

  async function deactivateAccount(accountid) {
    const result = await deactivateUser(accountid);

    if (result) {
      setMessage("");
      alert("Deactivate user successfully!");

      // load users
      loadUsers(userPage, items_per_page)
        .then((res) => {
          setUserList(res.data);
          setTotalUserPage(res.total_pages);
          setUserPage(res.page);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("Cannot deactivate user. Please load page and try again!");
    }
  }

  const onClickAddUser = () => {
    navigate("/adduser");
  };

  // change page distraction
  const changeDistractionPage = (event) => {
    const selectedPage = event.selected + 1;

    getDistractionStatistic(selectedDate, selectedPage, items_per_page)
      .then((res) => {
        setDistractionPage(res.page);
        setTotalDistractionPage(res.total_pages);
        setDistractionList(res.data);
      })
      .catch((e) => {});
  };

  //change page for user
  const changeUserPage = (event) => {
    const selectedPage = event.selected + 1;

    loadUsers(selectedPage, items_per_page)
      .then((res) => {
        setUserPage(res.page);
        setTotalUserPage(res.total_pages);
        setUserList(res.data);
      })
      .catch((e) => {});
  };

  const changeDate = (date) => {
    getDistractionStatistic(date, 1, items_per_page)
      .then((res) => {
        setSelectedDate(date);
        setDistractionPage(res.page);
        setTotalDistractionPage(res.total_pages);
        setDistractionList(res.data);
      })
      .catch((e) => {});
  };

  if (userList == null) {
    return (
      <div className="div_error">
        <p>You DON'T have permission to access this function!</p>
      </div>
    );
  }

  function logout() {
    localStorage.setItem("access_token", "");
    navigate("/login");
  }

  return (
    <div className="div_dashboard">
      <div className="div_header">
        <div className="div_name_product">Predict Driver Status - AI</div>
        <div className="div_button_logout">
          {" "}
          <input
            type="button"
            className="button_format_data"
            id="button_logout"
            onClick={() =>
              window.confirm("Are you sure you want to logout?") ? logout() : {}
            }
            defaultValue="Logout"
          />
        </div>
      </div>
      <div className="div_info_student">
        The Product created by Nguy???n Anh Qu???c and Nguy???n Phan S???
      </div>
      <div className="div_content_dashboard">
        <div className="div_distraction">
          <div className="div_statistic">
            <div className="div_total_statistic">
              <p>Hello,</p>
              <p>Welcom back</p>
              <div className="div_detail">
                <div className="div_num">
                  <div className="div_total_user">
                    <p className="num_users">{totalUsers}</p>
                    <p className="label_total_user">total users</p>
                  </div>
                  <div className="div_unfocus_user">
                    <p className="num_users">{totalDistraction}</p>
                    <p className="label_total_user">distractions</p>
                  </div>
                </div>
                <div className="div_image">
                  <img src={robot_image} alt="robot" />
                </div>
              </div>
            </div>
          </div>
          <div className="div_tabel_distraction">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                changeDate(date);
              }}
            />
            <table>
              <thead>
                <tr>
                  <th className="id">ID</th>
                  <th className="name">Name</th>
                  <th className="phone">Phone</th>
                  <th className="distraction">Distraction</th>
                </tr>
              </thead>
              <tbody>
                {distractionList.map((item, idx) => {
                  var stringUser = JSON.stringify(item.User);
                  var user = JSON.parse(stringUser);

                  var numDistraction = JSON.stringify(item.num_distractions);

                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.phone}</td>
                      <td>{numDistraction}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>
              <ReactPaginate
                className="pagination"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={changeDistractionPage}
                pageRangeDisplayed={5}
                pageCount={totalDistractionPage}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                disabledClassName={null}
              />
            </div>
          </div>
        </div>
        <div className="div_add_user">
          <button className="btn_adduser" onClick={onClickAddUser}>
            {" "}
            Add user
          </button>
        </div>
        <div className="div_manage_user">
          <table>
            <thead>
              <tr>
                <th className="id">ID</th>
                <th className="name">Name</th>
                <th className="gender">Gender</th>
                <th className="date-of-birth">Date of birth</th>
                <th className="phone">Phone</th>
                <th className="status">Status</th>
                <th className="activate-deactivate-action">
                  Activate/Deactivate
                </th>
                <th className="detail">Detail</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, idx) => {
                var stringUser = JSON.stringify(item.User);
                var user = JSON.parse(stringUser);

                var stringAccount = JSON.stringify(item.Account);
                var account = JSON.parse(stringAccount);

                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.gender ? "Male" : "Female"}</td>
                    <td>{user.birthday}</td>
                    <td>{user.phone}</td>
                    <td>
                      <div className="div_status_col">
                        {account.status ? (
                          <p
                            className="label_active_deactive"
                            style={{ backgroundColor: "#FFC700" }}
                          >
                            Active
                          </p>
                        ) : (
                          <p
                            className="label_active_deactive"
                            style={{ backgroundColor: "#DEDEDE" }}
                          >
                            Deactive
                          </p>
                        )}
                      </div>
                    </td>
                    <td>
                      {account.status ? (
                        <FaLockOpen
                          color="green"
                          onClick={() =>
                            window.confirm(
                              "Are you sure you wish to deactivate " +
                                user.name +
                                "?"
                            )
                              ? deactivateAccount(account.id)
                              : {}
                          }
                        ></FaLockOpen>
                      ) : (
                        <FaLock
                          color="red"
                          onClick={() =>
                            window.confirm(
                              "Are you sure you wish to activate " +
                                user.name +
                                "?"
                            )
                              ? activateAccount(account.id)
                              : {}
                          }
                        ></FaLock>
                      )}
                    </td>
                    <td>
                      <FaPen
                        color="green"
                        onClick={() => navigate("/infor", { state: user })}
                      ></FaPen>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ReactPaginate
            className="pagination"
            breakLabel="..."
            nextLabel="next >"
            onPageChange={changeUserPage}
            pageRangeDisplayed={5}
            pageCount={totalUserPage}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            disabledClassName={null}
          />
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
