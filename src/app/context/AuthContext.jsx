import React, { useState } from 'react';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const initValues = {
        username: userInfo?.username | undefined,
        email: userInfo?.email | undefined,
        avatar: userInfo?.avatar | undefined
    };
    const [user, setUser] = useState(initValues);

    const [isShowCart, setIsShowCart] = useState(false);
    const [showDetail, setShowDetail] = React.useState(false);

    return (
        <AuthContext.Provider value={{ user, setUser, isShowCart, setIsShowCart, showDetail, setShowDetail }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext };
