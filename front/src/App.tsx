import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home/Home';
import Private from './routes/Private';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Loan from './views/Loans/Loan';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign_in" element={<SignIn />}></Route>
        <Route path="/sign_up" element={<SignUp />}></Route>
        <Route
          path="/home"
          element={<Private>{<Home></Home>}</Private>}
        ></Route>
        <Route
          path="/loans"
          element={<Private>{<Loan></Loan>}</Private>}
        ></Route>
        <Route
          path="*"
          element={
            <Private>
              <Navigate to="/home" />
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
