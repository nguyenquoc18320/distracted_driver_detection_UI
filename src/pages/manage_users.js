import React from "react";
import "../styles/manage_users.css";
import loadUsers from "../services/manage_users";
import activateUser from "../services/activate_user";
import deactivateUser from "../services/deactivate_user";
import { FaLock, FaLockOpen } from "react-icons/fa";
import robot_image from "../assets/images/robot_manage_user.png";

function ManageUsers() {
  var [data, setData] = React.useState([]);
  var [message, setMessage] = React.useState("");

  // Load user list
  React.useEffect(() => {
    loadUsers()
      .then((res) => {
        setData(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  //change active status of an account
  async function activateAccount(accountid) {
    const result = await activateUser(accountid);

    if (result) {
      setMessage("");
      alert("Activate user successfully!");

      // load users
      loadUsers()
        .then((res) => {
          setData(res);
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
      loadUsers()
        .then((res) => {
          setData(res);
        })
        .catch((e) => {
          console.log(e.message);
        });
    } else {
      alert("Cannot deactivate user. Please load page and try again!");
    }
  }

  console.log(data);
  if (data == null) {
    return (
      <div className="div_error">
        <p>You DON'T have permission to access this function!</p>
      </div>
    );
  }
  return (
    <div className="div_dashboard">
      <div className="div_header">
        <div className="div_name_product">Predict Driver Status - AI</div>
        <div className="div_button_login"></div>
      </div>
      <div className="div_info_student">
        The Product created by Nguyễn Anh Quốc and Nguyễn Phan Sự
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
                    <p className="num_users">26</p>
                    <p className="label_total_user">total users</p>
                  </div>
                  <div className="div_unfocus_user">
                    <p className="num_users">26</p>
                    <p className="label_total_user">distractions</p>
                  </div>
                </div>
                <div className="div_image">
                  <img src={robot_image} alt="robot" />
                </div>
              </div>
            </div>
          </div>
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
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => {
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
                          <p className="label_active_deactive" style={{backgroundColor: "#FFC700"}}>Active</p>
                        ) : (
                          <p className="label_active_deactive" style={{backgroundColor: "#DEDEDE"}}>Deactive</p>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
