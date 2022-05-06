import React from "react";
import Body from "./body";
import Header from "./header";
import { useAuth0 } from "@auth0/auth0-react";
const Profile = () => {
  const {isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <Header />
        <Body />
      </div>
    )
  );
};

export default Profile;
