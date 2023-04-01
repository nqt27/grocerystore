import { useRef, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import Api, { endpoints } from "../configs/Api";
import "../static/login.css";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const avatar = useRef();
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [newUser, setNewUser] = useState({
    "first_name": "",
    "last_name": "",
    "username": "",
    "password": "",
    "email": ""
  })

  const change = (obj) => {
    setNewUser({
      ...newUser,
      ...obj
    })
  }

  const register = (event) => {
    event.preventDefault();

    let registerUser = async () => {
      const formData = new FormData();
      formData.append("first_name", firstname);
      formData.append("last_name", lastname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("email", email);
      formData.append("avatar", avatar.current.files[0]);

      try {
        let res = await Api.post(endpoints["users"], formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (res.status === 201) {
          navigate("/");
        }
      } catch (e) {
        console.log(e.response)
        if (e.response.status === 400) {
          let errArray = [];
          Object.values(e.response.data).forEach(e => e.forEach(m => errArray.push(m)));
          setErr(errArray);
        }
      }
    };

    if (password !== confirmPassword) {
      setErr("Xác nhận mật khẩu không chính xác");
    }

    if (
      password != null &&
      password === confirmPassword &&
      username != null &&
      firstname != null &&
      lastname != null &&
      email != null &&
      avatar != null
    ) {
      registerUser();
    }
  };

  return (
    <Container>
      <Row style={{ with: "100vw", height: "100vh" }}>
        <Col
          xs={6}
          style={{
            alignSelf: "center",
            backgroundColor: "white",
            minHeight: "50vw",
            position: "relative",
            margin: "auto"
          }}
        >
          <Container
            style={{
              width: "70%",
              height: "50%",
              alignSelf: "center",
              marginTop: "6vh",
            }}
          >
            <h2 className="text-center text-dark">Đăng Ký</h2>
            <div
              className="nav-item me-auto"
              style={{
                textDecoration: "inherit",
                color: "red",
                padding: "10px",
                textAlign: "center",
                marginBottom: "5px",
              }}
            >
              {err}
            </div>
            <Form onSubmit={register}>
              <Row>
                <Col xs={7}>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={firstname}
                      onChange={(event) => setFirstname(event.target.value)}
                      style={{ borderRadius: "20px" }}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Họ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      value={lastname}
                      onChange={(event) => setLastname(event.target.value)}
                      style={{ borderRadius: "20px" }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder=""
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  style={{ borderRadius: "20px" }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  style={{ borderRadius: "20px" }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ borderRadius: "20px" }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nhập lại mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=""
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  style={{ borderRadius: "20px" }}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hình đại diện</Form.Label>
                <Form.Control
                  type="file"
                  ref={avatar}
                  style={{ borderRadius: "20px" }}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="Login-button">
                Đăng ký
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

// function RegisterFormComponent(props) {
//     return (
//         <Form.Group className="mb-3" controlId={props.id}>
//             <Form.Label>{props.lable}</Form.Label>
//             <Form.Control type={props.type}
//                     placeholder={props.placeholder}
//                     value={props.value}
//                     onChange={props.onChange}
//                     style={{borderRadius:"20px"}}
//                     />
//         </Form.Group>
//     )
// }

export default Register;
