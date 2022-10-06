import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startInit } from './store/modules/start';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startInit());
  }, []);
  return <div>upbit-clone</div>;
}

export default App;
