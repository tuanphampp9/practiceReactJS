import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalConfirm = (props) => {
    const { show, handleClose, dataUser, handleConfirmDelete } = props;
    const handleDelete = async () => {
        let res = await deleteUser(dataUser.id);
        if (res) {
            console.log(res);
            toast.success("deleted!!");
            handleConfirmDelete(dataUser.id)
            handleClose();
        }

    }
    return (
        <div>
            <Modal
                centered show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Are you sure want delete user : {dataUser.first_name}?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalConfirm;