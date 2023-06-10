import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ModalAddNew = (props) => {
    const { show, handleClose } = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSave = () => {
        console.log(name, job);
    }
    return (
        <div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new User</Modal.Title>
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
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ModalAddNew;