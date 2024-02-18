import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActiveAccount: React.FC = () => {
  const { email, codeActive } = useParams<{
    email: string;
    codeActive: string;
  }>();
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (email && codeActive) {
      startActive();
    }
  }, [email, codeActive]);

  const startActive = async () => {
    try {
      const url = `http://localhost:8888/api/account/active?email=${email}&codeActive=${codeActive}`;
      const response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        setIsActive(true);
        const text = await response.text();
        setMessage(text);
      } else {
        const text = await response.text();
        setMessage(text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Kích hoạt tài khoản</h1>
      {isActive ? (
        <p>
          Tài khoản đã kích hoạt thành công, bạn hãy đăng nhập để sử dụng dịch
          vụ
        </p>
      ) : (
        <p>Lỗi{message}</p>
      )}
    </div>
  );
};

export default ActiveAccount;
