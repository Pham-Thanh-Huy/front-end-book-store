import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayLoad {
  isAdmin: boolean;
  isStaff: boolean;
  isUser: boolean;
}

const RequireAdmin = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAdminCheck: React.FC<P> = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      } else {
        // Giải mã token
        const decodeToken = jwtDecode(token) as JwtPayLoad;
        console.log(decodeToken);
        // lấy thông tin cụ thể
        const isAdmin = decodeToken.isAdmin;
  
        if (!isAdmin) {
          navigate("/login");
        }
      }
    }, [navigate]);
  
    return <WrappedComponent {...props} />;
  };
  
  return WithAdminCheck;
};

export default RequireAdmin;
