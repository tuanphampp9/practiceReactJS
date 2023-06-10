import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  return (
    <div className="app-container">
      <Header />
      <Container>
        <div className="my-4 custom-box-add">
          <span>List user:</span>
          <button className='btn btn-success' onClick={() => setIsShowModalAddNew(true)}>+ Add new user</button>
        </div>
        <TableUser />
        <ModalAddNew
          show={isShowModalAddNew}
          handleClose={() => setIsShowModalAddNew(false)} />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
