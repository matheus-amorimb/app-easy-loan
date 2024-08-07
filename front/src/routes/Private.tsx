import { Navigate } from 'react-router-dom';

interface PrivateProps {
  children: React.ReactNode;
}

const Private: React.FC<PrivateProps> = ({ children }) => {
  const token = localStorage.getItem('tokenJwt');
  return token ? <>{children}</> : <Navigate to="/sign_in" />;
};

export default Private;
