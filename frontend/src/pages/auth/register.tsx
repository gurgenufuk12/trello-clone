import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1e2124;
`;

export const Form = styled.form`
  width: 400px;
  padding: 32px;
  border-radius: 12px;
  background-color: #282f27;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border: 1px solid #3f4447;
`;

export const Title = styled.h1`
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 28px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 32px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin: 8px 0;
  background-color: #1e2124;
  border: 1px solid #3f4447;
  border-radius: 8px;
  color: white;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  transition: all 0.2s;

  &::placeholder {
    color: #8b949e;
  }

  &:focus {
    outline: none;
    border-color: #ff4757;
    box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2);
  }
`;

export const Button = styled.button<{ isSecondary?: boolean }>`
  width: 100%;
  padding: 14px;
  margin: 8px 0;
  background-color: ${(props) =>
    props.isSecondary ? "transparent" : "#ff4757"};
  color: white;
  border: ${(props) => (props.isSecondary ? "1px solid #ff4757" : "none")};
  border-radius: 8px;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.isSecondary ? "rgba(255, 71, 87, 0.1)" : "#ff6b81"};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Error = styled.div`
  color: #ff4757;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  text-align: center;
  margin: 8px 0;
`;
const RegisterPage = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const register = authContext?.register;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (register) {
        await register(email, password);
      } else {
        setError("Registration function is not available.");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleRegister}>
        <Title>Create Account</Title>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Error>{error}</Error>}
        <Button type="submit">Sign Up</Button>
        <Button 
          type="button" 
          isSecondary 
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
