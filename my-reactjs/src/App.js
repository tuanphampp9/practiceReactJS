import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import ModalAddNew from './components/ModalAddNew';
import TableUser from './components/TableUser';
import Container from 'react-bootstrap/Container';
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
    </div>
  );
}

export default App;
