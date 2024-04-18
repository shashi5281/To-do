import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [loginInitiated, setLoginInitiated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleSignIn = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    navigate('/user-profile');
    } else {
      alert("Invalid email or password.");
    }
  };


  const handleSignUp = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some(user => user.email === newUserEmail)) {
      alert("User already exists. Please sign in.");
    } else {
      const newUser = { email: newUserEmail, password: newUserPassword };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful. Please sign in.");
      setNewUserEmail('');
      setNewUserPassword('');
    }
  };

  const onSocialLoginSuccess = (data) => {
    console.log("Social login data:", data);
    const userEmail = data.email || '';
    const user = {
      
      name: data.name,
      email: userEmail,
      picture: data.picture,
    };
    localStorage.setItem("user", JSON.stringify(user)); 
    setIsLoggedIn(true);
    navigate('/user-profile'); 
  };



  return (
    <div>
        {!isLoggedIn && !loginInitiated && (
  <>
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign In</button>
      </form>
    </div>
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="New User Email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required />
        <input type="password" placeholder="New User Password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </>
)}


      {!loginInitiated ? (
        <>
          <LoginSocialFacebook
            appId="1445863976366417"
            onResolve={({ data }) => {
              console.log(data);
              onSocialLoginSuccess(data);
              setLoginInitiated(true);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>

          <LoginSocialGoogle
            client_id="42092070759-9q68jkh9kmhh4js239o13tdcj5ii1u5q.apps.googleusercontent.com" // Make sure this is your correct Google Client ID
            onResolve={({ data }) => {
              console.log(data);
              onSocialLoginSuccess(data);
              setLoginInitiated(true);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </>
      ) : null}
    </div>
  );
}

export default Login;
