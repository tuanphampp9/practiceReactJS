import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/images/logo_bird.png'
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Header = (props) => {
    const location = useLocation();
    console.log(location);
    let navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
        toast.success("logout is successfully!");
    }
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo}
                            width="70"
                            height="70"
                            alt="logo"
                        />
                        <span>Learn ReactJS</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" activeKey={location.pathname}>
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/users">Manage Users</NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Account" id="basic-nav-dropdown">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                                <NavDropdown.Item className="nav-link" onClick={() => handleLogout()}>
                                    logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header;