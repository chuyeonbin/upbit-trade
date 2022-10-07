import { Routes, Route } from 'react-router-dom';
import Main from '../pages/main';

function DefaultRouter() {
  return (
    <Routes>
      <Route path='/' element={<Main />} />
    </Routes>
  );
}
export default DefaultRouter;
