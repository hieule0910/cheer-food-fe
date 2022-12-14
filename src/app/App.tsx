import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from '../app/context/AuthContext';

import { Client, Admin } from './routes';

// redux
import { RootState } from './redux/store';
import { userState } from './redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCart } from './redux/actions/cartActions';
import { ToastContainer } from 'react-toastify';

function App() {
    const userLogin = useSelector<RootState, userState>((state) => state.userLogin);
    const dispatch = useDispatch();

    const { userInfo } = userLogin;
    const [check, setCheck] = useState(false);

    useEffect(() => {
        userInfo?.role === 'ROLE_ADMIN' ? setCheck(true) : setCheck(false);
    }, [userInfo]);

    useEffect(() => {
        dispatch(getCart());
    }, []);

    return (
        <>
            <Router>
                <AuthProvider>
                    <Routes>{check ? <Route path="/manage/*" element={<Admin />} /> : <Route path="/*" element={<Client />} />}</Routes>
                </AuthProvider>
            </Router>
            <ToastContainer closeButton={false} />{' '}
        </>
    );
}

export default App;
