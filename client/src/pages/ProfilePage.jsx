import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
// import PlacesPage from "./PlacesPage";
import PlacesPage from "./places/PlacesPage";
import AccNavigation from "../components/navbar/AccNavigation";

export default function ProfilePage() {
  const [redirectMe, setRedirectMe] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  async function logout() {
    await axios.post("logout");
    setRedirectMe("/");
    setUser(null);
  }
  if (!ready) {
    return (
      <div>
        <p>Loading....</p>
      </div>
    );
  }

  if (redirectMe) {
    return <Navigate to={redirectMe} />;
  }
  if (ready && !user && !redirectMe) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccNavigation />
      {subpage === "profile" && (
        <div className="max-w-lg text-center mx-auto p-2">
          Username : {user?.name} <br />
          Email : {user?.email}
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && (
        <div>
          <PlacesPage />
        </div>
      )}
    </div>
    // <div>
    /* {!ready ? (
        <div>
          <p>Loading....</p>
        </div>
      ) : !user ? (
        <Navigate to={"/login"} />
      ) : (
        <div>good</div>
      )} */
    /* {!user ? (
        ready ? (
          <Navigate to={"/login"} />
        ) : (
          <div>
            <p>Loading....</p>
          </div>
        )
      ) : (
        <div>good</div>
      )} */
    // </div>
  );
}
