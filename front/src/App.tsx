import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Loan from './views/Loan/Loan';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Loan />}></Route>
        <Route path="/signup" element={<Loan />}></Route>
        <Route path="/" element={<Loan />}></Route>
        <Route path="*" element={<Navigate to={'/signin'} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
