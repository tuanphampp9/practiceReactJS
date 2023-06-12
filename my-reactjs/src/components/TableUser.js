import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUser } from '../services/UserService';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import ModalConfirm from './ModalConfirm';
import './TableUser.scss';
import ModalAddNew from './ModalAddNew'
import _ from 'lodash';
import { CSVLink } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const TableUser = (props) => {
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [totalUsers, setTotalUser] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDeleteUser, setIsShowModalDeleteUser] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');
    const [idPage, setIdPage] = useState(0);
    const [dataEport, setDataExport] = useState([]);
    let token = localStorage.getItem("token");
    let navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
        getAllUser(1);
    }, [token])
    const getAllUser = async (page) => {
        let res = await fetchAllUser(page);
        if (res && res.data) {
            setTotalUser(res.total);
            setListUser(res.data);
            setTotalPages(res.total_pages);
        }
    }
    const handlePageClick = (event) => {
        setIdPage(event.selected + 1);
        getAllUser(event.selected + 1);
    }
    const handleDeleteUser = (id) => {
        console.log(id);
        let newListUser = listUser.filter((user) => user.id !== id);
        setListUser(newListUser);
    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);
        let newListUser = listUser;
        newListUser = _.orderBy(newListUser, [sortField], [sortBy]);
        setListUser(newListUser);

    }
    const handleSearch = _.debounce((event) => {
        let keyword = event.target.value;
        if (keyword) {
            let newListUser = listUser;
            newListUser = newListUser.filter((user) => user.email.includes(keyword));
            console.log(newListUser);
            setListUser(newListUser);
        } else {
            getAllUser(idPage);
        }
    }, 500)
    console.log(sortBy, sortField);

    const getExportUsers = (event, done) => {
        let result = [];
        if (listUser && listUser.length > 0) {
            result.push(["email", "first_name", "last_name"])
            listUser.map((user) => {
                let arr = [];
                arr[0] = user.email;
                arr[1] = user.first_name;
                arr[2] = user.last_name;
                result.push(arr);

            })
            setDataExport(result)
            done();
        }
    }
    const handleImportUser = (event) => {
        let file = event.target.files[0];
        if (file.type !== 'text/csv') {
            toast.error("only access file csv");
            return;
        }
        // Parse local CSV file
        Papa.parse(file, {
            complete: function (results) {
                if (results.data[0].length === 3) {
                    if (results.data[0][0] !== 'email'
                        || results.data[0][1] !== 'first_name'
                        || results.data[0][2] !== 'last_name') {
                        toast.error("title invalid!");
                        return;
                    } else {
                        let convertArrayUserObject = [];
                        results.data.map((item, index) => {
                            if (item.length === 3 && index > 0) {
                                convertArrayUserObject.push({
                                    id: Math.floor(Math.random() * 1000),
                                    email: item[0],
                                    first_name: item[1],
                                    last_name: item[2]
                                })
                            }
                        })
                        setListUser(convertArrayUserObject);

                    }
                }
            }
        });
    }
    return (
        <div>
            <div className="my-4 custom-box-add">
                <span>List user:</span>
                <div>
                    <label htmlFor='test' className='btn btn-warning'>
                        <i className="fa-solid fa-file-import"></i>
                        Import
                    </label>
                    <input type="file" id="test"
                        onChange={handleImportUser}
                        hidden />
                    <CSVLink data={dataEport}
                        filename={"my-file.csv"}
                        className="btn btn-primary"
                        asyncOnClick={true}
                        onClick={getExportUsers}
                    >
                        <i className="fa-solid fa-file-arrow-down"></i>
                        Export
                    </CSVLink>
                    <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>+ Add new user</button>
                </div>
            </div>
            <div className='col-4 my-3' >
                <input className='form-control' placeholder='Search user by email'
                    onChange={(event) => handleSearch(event)} />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='sort-header'>
                                <span>STT</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort('desc', 'id')}></i>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'id')}></i>
                                </span>
                            </div>
                        </th>
                        <th>Email</th>
                        <th>
                            <div className='sort-header'>
                                <span>First Name</span>
                                <span>
                                    <i className="fa-solid fa-arrow-down"
                                        onClick={() => handleSort('desc', 'first_name')}></i>
                                    <i className="fa-solid fa-arrow-up"
                                        onClick={() => handleSort('asc', 'first_name')}></i>
                                </span>
                            </div>
                        </th>
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
                                        <button className='btn btn-danger'
                                            onClick={() => {
                                                setIsShowModalDeleteUser(true);
                                                setDataUser(user);
                                            }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ModalAddNew
                show={isShowModalAddNew}
                handleClose={() => setIsShowModalAddNew(false)} />
            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={() => setIsShowModalEditUser(false)}
                dataUser={dataUser} />
            <ModalConfirm
                show={isShowModalDeleteUser}
                handleClose={() => setIsShowModalDeleteUser(false)}
                dataUser={dataUser}
                handleConfirmDelete={handleDeleteUser} />
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