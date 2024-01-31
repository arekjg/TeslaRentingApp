import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { EditIcon } from "./Icons";
import { putPsw, putUser } from "../fetcher";

const Settings = () => {
  const { user, setUser } = useContext(UserContext);

  const [editField, setEditField] = useState("");

  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
  });

  const [passwordObject, setPasswordObject] = useState({
    id: user.id,
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleEditClick = (field) => {
    setEditField(field);
  };

  const handleFormChange = (e) => {
    let { name, value } = e.target;

    setUpdatedUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePasswordChange = async (e) => {
    let { name, value } = e.target;

    setPasswordObject((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleCancelChanges = () => {
    setErrorMessage("");
    setEditField("");
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    let isValid = validateEditForm();

    if (isValid) {
      const responseObject = await putUser(updatedUser);

      if (responseObject.data) {
        setUser(responseObject.data);
        setEditField("");
      }
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    let isValid = validatePassword();

    if (isValid) {
      console.log(passwordObject);
      const responseObject = await putPsw(passwordObject);

      console.log(responseObject);

      if (responseObject.data) {
        setEditField("");
      }
      setEditField("");
    }
  };

  const validateEditForm = () => {
    let isValid = true;
    setErrorMessage("");

    if (editField === "firstName" && updatedUser.firstName === "") {
      isValid = false;
    } else if (editField === "lastName" && updatedUser.lastName === "") {
      isValid = false;
    } else if (
      editField === "phone" &&
      (updatedUser.phone === "" || updatedUser.phone.match(/^[0-9]+$/) === null)
    ) {
      isValid = false;
    }

    if (!isValid) {
      setErrorMessage("Invalid or empty data");
    }

    return isValid;
  };

  const validatePassword = () => {
    let isValid = true;
    setErrorMessage("");

    if (editField === "password" && passwordObject.password === "") {
      isValid = false;
    }

    if (!isValid) {
      setErrorMessage("Invalid or empty data");
    }

    return isValid;
  };

  const renderEditForm = () => {
    if (editField === "password") {
      return (
        <form className="edit-user-container">
          <h3>Edit your password</h3>

          <input
            type="password"
            name={editField}
            className="input"
            placeholder="*************"
            onChange={handlePasswordChange}
            required
          ></input>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <div className="btn-center">
            <button onClick={handleSavePassword}>Save</button>
            <button onClick={handleCancelChanges}>Cancel</button>
          </div>
        </form>
      );
    } else {
      let placeholder;
      let title;
      if (editField === "firstName") {
        placeholder = user.firstName;
        title = "first name";
      } else if (editField === "lastName") {
        placeholder = user.lastName;
        title = "last name";
      } else if (editField === "phone") {
        placeholder = user.phone;
        title = "phone #";
      }

      return (
        <form className="edit-user-container">
          <h3>Edit your {title}</h3>

          <input
            type="text"
            name={editField}
            className="input"
            placeholder={placeholder}
            onChange={handleFormChange}
            required
          ></input>

          {errorMessage && (
            <div className="error-message">{errorMessage}</div>
          )}

          <div className="btn-center">
            <button onClick={handleSaveChanges}>Save</button>
            <button onClick={handleCancelChanges}>Cancel</button>
          </div>
        </form>
      );
    }
  };

  return (
    <>
      {!user && (
        <div className="settings-container" style={{ gridTemplateRows: "1fr" }}>
          <h3>You must sign in first!</h3>
        </div>
      )}

      {user && !editField && (
        <div className="settings-container">
          <h3>Settings</h3>

          <label className="first-name-label">First name:</label>
          <label className="first-name-value">
            <strong>{user.firstName}</strong>&ensp;
            <span onClick={() => handleEditClick("firstName")}>
              <EditIcon />
            </span>
          </label>

          <label className="last-name-label">Last name:</label>
          <label className="last-name-value">
            <strong>{user.lastName}</strong>&ensp;
            <span onClick={() => handleEditClick("lastName")}>
              <EditIcon />
            </span>
          </label>

          <label className="phone-label">Phone #:</label>
          <label className="phone-value">
            <strong>{user.phone}</strong>&ensp;
            <span onClick={() => handleEditClick("phone")}>
              <EditIcon />
            </span>
          </label>

          <label className="password-label">Password:</label>
          <label className="password-value">
            <strong>* * * * * * * *</strong>&ensp;
            <span onClick={() => handleEditClick("password")}>
              <EditIcon />
            </span>
          </label>
        </div>
      )}

      {user && editField && renderEditForm()}
    </>
  );
};

export default Settings;
