import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Container, Row, Col, Image } from 'react-bootstrap';
import axios from 'axios';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [picture, setPicture] = useState(user?.picture || '');

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async() => {
    const updatedUser = { ...user, name, email, picture };

    try {
      // Send the updated user information to your backend
      await axios.post('http://localhost:5000/api/users/profile', updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Could not update the user profile", error);
      // Handle errors here, e.g., show a notification to the user
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container className="mt-5">
    <Row className="justify-content-md-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Profile Page</Card.Title>
            {editMode ? (
              <Form>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPicture">
                  <Form.Label>Picture URL</Form.Label>
                  <Form.Control type="text" placeholder="Picture URL" value={picture} onChange={(e) => setPicture(e.target.value)} />
                </Form.Group>

                <Button variant="primary" onClick={handleSave}>
                  Save
                </Button>
              </Form>
            ) : (
              <>
                <Card.Text>
                  <strong>Name:</strong> {name}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {email}
                </Card.Text>
                <div className="text-center">
                  <Image src={picture} roundedCircle style={{ width: '100px', height: '100px' }} />
                </div>
                <Button variant="secondary" onClick={handleEdit} className="mt-3">
                  Edit Profile
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
        <Button variant="danger" onClick={handleLogout} className="mt-3">
          Logout
        </Button>
      </Col>
    </Row>
  </Container>
);
}

export default Profile;
