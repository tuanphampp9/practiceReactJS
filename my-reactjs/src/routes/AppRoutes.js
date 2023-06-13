import { Route, Routes } from "react-router-dom"
import Home from '../components/Home';
import Login from '../components/Login';
import TableUser from '../components/TableUser';
import PrivateRoute from "./PrivateRoute";
const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute path="/users">
                            <TableUser />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}

export default AppRoutes