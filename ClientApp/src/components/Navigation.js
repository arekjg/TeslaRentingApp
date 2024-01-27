import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { putSignOut } from "../fetcher";
import { UserContext } from "../App";

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    let signOutDto = {
      login: user.login,
      token: user.token,
    };

    const responseObject = await putSignOut(signOutDto);

    if (responseObject.data.getUserDto) {
      localStorage.clear();
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  };

  return (
    <div className="nav-bar">
      <div className="column head-left">
        <Link to="/">
          <img src={"../images/tesla_logo_400x400.png"} alt="logo" />
        </Link>
      </div>

      <div className="column head-center">
        <Link to="/">
          <img src={"../images/tesla_logo_400x60.png"} alt="logo2" />
        </Link>
      </div>

      <div className="column head-right">
        {user && (
          <>
            <div>
              Logged in as <strong>{user.login}</strong>
            </div>
            <div>
              <Link to="/settings">Settings</Link> |{" "}
              <Link to="/reservations">Reservations</Link> |{" "}
              <span id="logout" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </>
        )}
        {!user && <Link to="/signin">Sign In</Link>}
      </div>
    </div>
  );
};

export default Navigation;
