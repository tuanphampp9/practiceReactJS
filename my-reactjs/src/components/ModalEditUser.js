import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { updateInfoUser } from '../services/UserService';
import { toast } from 'react-toastify';
const ModalEditUser = (props) => {
    const { show, handleClose, dataUser } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    useEffect(() => {
        if (show) {
            setName(dataUser.first_name);
        }
    }, [dataUser])
    const handleSave = async (id) => {
        let res = await updateInfoUser(id, name, job);
        if (res) {
            /* success */
            console.log(res);
            setName('');
            setJob('');
            toast.success('updated info user');
            handleClose();
        } else {
            toast.error("update failed!!")
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
                    <Modal.Title>Edit information user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Job</label>
                                <input type="text" className="form-control"
                                    value={job}
                                    onChange={(e) => setJob(e.target.value)} />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSave(dataUser.id)}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ModalEditUser;

