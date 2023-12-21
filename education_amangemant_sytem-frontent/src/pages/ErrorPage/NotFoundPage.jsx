import React from "react";
import { useNavigate } from "react-router-dom";
import { getItemAtStorage } from "../../hooks/useStorage";

const NotFoundPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const role = getItemAtStorage("role");
    setTimeout(() => {
      if (role) {
        navigate("/dashboard");
      }
    }, 2000);
  }, []);

  return <div>NotFoundPage</div>;
};

export default NotFoundPage;
