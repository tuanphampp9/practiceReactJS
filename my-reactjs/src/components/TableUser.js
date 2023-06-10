import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
const TableUser = (props) => {
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUser, setDataUser] = useState(0);
    useEffect(() => {
        getAllUser(1);
    }, [])
    const getAllUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUser(res.total);
            setListUser(res.data);
            setTotalPages(res.total_pages);
        }
    }
    const handlePageClick = (event) => {
        getAllUser(event.selected + 1);
    }
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((user, index) => {
                            return (
                                <tr key={`user-${index}`}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3'
                                            onClick={() => {
                                                setIsShowModalEditUser(true);
                                                setDataUser(user);
                                            }}>Edit</button>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={() => setIsShowModalEditUser(false)}
                dataUser={dataUser} />
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                marginPagesDisplayed={2}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
        </div>
    )
}
export default TableUser;