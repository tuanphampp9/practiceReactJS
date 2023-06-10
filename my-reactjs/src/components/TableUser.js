import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    useEffect(() => {
        getAllUser();
    }, [])
    const getAllUser = async () => {
        let res = await fetchAllUser();
        if (res && res.data) {
            setListUser(res.data);
        }
    }
    console.log(listUser);
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{index + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                </tr>
                            )
                        })}

                </tbody>
            </Table>
        </div>
    )
}

export default TableUser;