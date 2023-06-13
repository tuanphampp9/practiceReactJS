import { Route, Routes } from "react-router-dom"
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
const PrivateRoute = (props) => {
    const { user } = useContext(UserContext);
    console.log(props);
    if (user && !user.auth) {
        return (
            <>
                <Alert variant="danger">
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        You don't have permission to access this route
                    </p>
                </Alert>
            </>
        )
    }
    return (
        <>
            {props.children}
        </>
    )
}

export default PrivateRoute