import React, { useState } from "react";
import { error } from "console";

export const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorSex, setErrorSex] = useState("");
  const [errorAge, setErrorAge] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorUsername("");
    setErrorEmail("");
    setErrorPassword("");
    setErrorPasswordConfirm("");
    setErrorLastname("");
    setErrorFirstname("");
    setErrorSex("");
    setErrorAge("");
    setMessage(""); // Reset message state

    let error = false;
    if (username === "") {
      setErrorUsername("Tên đăng nhập không được để trống");
      error = true;
    }
    if (email === "") {
      setErrorEmail("Email không được để trống");
      error = true;
    }
    if (password === "") {
      setErrorPassword("Mật khẩu không được để trống");
      error = true;
    }
    if (password !== passwordConfirm) {
      setErrorPasswordConfirm("Mật khẩu xác nhận không khớp");
      error = true;
    }
    if (lastname === "") {
      setErrorLastname("Họ không được để trống");
      error = true;
    }
    if (firstname === "") {
      setErrorFirstname("Tên không được để trống");
      error = true;
    }
    if (sex === "") {
      setErrorSex("Giới tính không được để trống");
      error = true;
    }
    if (sex !== "Nam" && sex !== "Nữ") {
      setErrorSex("Vui lòng chọn giới tính Nam hoặc Nữ");
      error = true;
    }
    if (age === "") {
      setErrorAge("Tuổi không được để trống");
      error = true;
    }

    if (!error) {
      try {
        const url = `http://localhost:8888/api/account/register`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            lastName: lastname,
            firstName: firstname,
            username: username,
            password: password,
            sex: sex === "Nam" ? "M" : "F", // Chuyển đổi từ "Nam" thành "M" và "Nữ" thành "F"
            email: email,
            phoneNumber: "0838129818",
            address: "p25k5",
          }),
        });
        if (response.ok) {
          setMessage(
            "Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản."
          );
        } else {
          setMessage("Đã xảy ra lỗi trong quá trình đăng ký.");
        }
      } catch (error) {
        console.log(error);
        setMessage("Đã xảy ra lỗi khi gửi yêu cầu đăng ký.");
      }
    }
  };

  const checkUsernameExist = async (username: string): Promise<boolean> => {
    const url = `http://localhost:8888/user/search/existsByUsername?username=${username}`;
    const response = await fetch(url);
    const data = await response.text();
    return data === "true";
  };

  const checkEmailExist = async (email: string): Promise<boolean> => {
    const url = `http://localhost:8888/user/search/existsByEmail?email=${email}`;
    const response = await fetch(url);
    const data = await response.text();
    return data === "true";
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Đăng ký</h1>
      <div className="mb-3 col-md-6 col-12 mx-auto">
        <form onSubmit={handleSubmit} className="form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorUsername}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorEmail}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorPassword}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="form-control"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorPasswordConfirm}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">
              Họ
            </label>
            <input
              type="text"
              id="lastname"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorLastname}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">
              Tên
            </label>
            <input
              type="text"
              id="firstname"
              className="form-control"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorFirstname}</div>
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="form-check">
              <input
                type="radio"
                id="male"
                className="form-check-input"
                value="Nam"
                checked={sex === "Nam"}
                onChange={(e) => setSex(e.target.value)}
              />
              <label htmlFor="male" className="form-check-label">
                Nam
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="female"
                className="form-check-input"
                value="Nữ"
                checked={sex === "Nữ"}
                onChange={(e) => setSex(e.target.value)}
              />
              <label htmlFor="female" className="form-check-label">
                Nữ
              </label>
            </div>
            <div style={{ color: "red" }}>{errorSex}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Tuổi
            </label>
            <input
              type="text"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <div style={{ color: "red" }}>{errorAge}</div>
          </div>
          <button type="submit" className="btn btn-primary">
            Đăng ký
          </button>
          <div style={{ color: "green" }}>{message}</div>
        </form>
      </div>
    </div>
  );
};
