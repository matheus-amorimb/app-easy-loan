import { Navigate } from 'react-router-dom';
import { getToken } from '../AxiosConfig';

interface PrivateProps {
  children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/sign_in" />;
};

export default Private;
