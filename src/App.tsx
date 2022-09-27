import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socketConnectionRequest } from './store/modules';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(socketConnectionRequest());
  }, []);
  return <div>upbit-clone</div>;
}

export default App;
