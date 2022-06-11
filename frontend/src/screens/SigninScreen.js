import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

function SigninScreen(props) {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1 className="my-3">Sign in</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            className="mb-3"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            className="mb-3"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <div className="mb-3">
          <Button type="submit">Sign in</Button>
        </div>
        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

SigninScreen.propTypes = {};

export default SigninScreen;
