import { useSelector } from 'react-redux';

import CreateRouter from './routes/routes';

export default function App() {
  const { signed } = useSelector(state => state.auth);
  const statusBar = useSelector(state => state.statusBar);

  return CreateRouter(signed, statusBar);
}
