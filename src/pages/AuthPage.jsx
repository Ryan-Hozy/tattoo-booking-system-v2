import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,  
} from "firebase/auth";


import { useContext, useState, useEffect } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider"; 
import SlideShow from "../components/SlideShow";

export default function AuthPage() {
  const [modalShow, setModalShow] = useState(null);
  const handleShowSignUp = () => setModalShow("signup");
  const handleShowLogin = () => setModalShow("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try{
      const res = await createUserWithEmailAndPassword(
        auth,
        username, 
        password
      );
      console.log(res.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, username, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

    const handleClose = () => setModalShow(null);


    return (
        <Row>
            <Col sm={6}>
            <SlideShow />
            </Col>
            <Col sm={4} 
                    style={{height: "100%", 
                    display:"flex", 
                    flexDirection:'column', 
                    alignItems:'center',
                    justifyContent:'center',
                    textAlign:"center",
                    
                    }} 
                    >
                <h1 className= "mt-5" style={{fontSize: 60}}>Lumiere Studio</h1>
                <p className="mt-5" style={{fontSize: 45}}>
                    Shine with Us
                </p>
                <h2 className="mt-1 mb-3 " style={{fontSize: 31}}>Join us Now</h2>
                <Col sm={5} className="d-grid gap-2">
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleGoogleLogin}>
                        <i className="bi bi-google">  Sign up with Google</i>
                    </Button>
                    <Button className="rounded-pill mt-3" variant="outline-dark">
                        <i className="bi bi-apple mr-3">  Sign up with Apple</i>
                    </Button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" onClick={handleShowSignUp}>
                        Create an account
                    </Button>
                    <p style={{ fontSize: "12px" }}> Agree to terms</p>
                    <p className="mt-5" style={{ fontWeight: "bold" }}>
                        Already have an account?
                    </p>
                    <Button
                        className="rounded-pill"
                        variant="outline-primary"
                        onClick={handleShowLogin}
                    >
                        Sign in
                    </Button>
        
                </Col>
                <Modal
                    show={modalShow !== null}
                    onHide={handleClose}
                    animation={false}
                    centered
                    >
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>
                        {modalShow === "signup"
                            ? "Create your account"
                            : "Log in to your account"}
                        </h2>

                        <Form
                        className="d-grid gap-2 px-5"
                        onSubmit={modalShow === "signup" ? handleSignUp : handleLogin}
                        >
                        <Form.Group className="mb-3" controlId="formBasicEmai">
                            <Form.Control
                            onChange={(e) => setUsername(e.target.value)}
                            type="email"
                            placeholder="Enter email"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            />
                        </Form.Group>

                        <p style={{ fontSize: 12 }}>
                            By signing up, you agree to the Terms of Service and Privacy
                            Policy, including Cookie Use. SigmaTweets may use your contact
                            information, including your email address and phone number for
                            purposes outlined in our Privacy Policy, like keeping your
                            account secure and personalising our services, including ads.
                            Learn more. Others will be able to find you by email or phone
                            number, when provided, unless you choose otherwise here.
                        </p>
                        <Button className="rounded-pill" type="submit">
                            {modalShow === "signup" ? "Sign up" : "Log in"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    </Row>
  );
}