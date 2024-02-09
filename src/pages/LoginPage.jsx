import { useContext, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link,useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext"

const LoginPageX = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [email, setEmail] = useState("");
  
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");

  const {dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        setLoading(false);
        navigate('/')
      })
      .catch((error) => {
        // Handle error
        setErrorMsg(error.message);
        setLoading(false);
      });
  };


  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "400px" }}>
      <Card >
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {errorMsg !== '' && <Alert dismissible variant="danger">{errorMsg}</Alert>}
          <Form onSubmit={handleLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button disabled={loading}  type="submit" className="mt-4">
              Log In
            </Button>
          </Form>         
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/users/new">Sign Up</Link>
      </div>
    </div>
  )
};

export default LoginPageX;
