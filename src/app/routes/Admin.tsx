import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PageAdmin } from '../screens';
import AdminProduct from '../screens/page-admin/components/AdminProduct';

import AdminLayout from '../layout/AdminLayout';
import AddNewProduct from '../screens/page-admin/components/AddNewProduct';
import AdminDashboard from '../screens/page-admin/components/AdminDashboard';

const Admin = () => {
    return (
        <Routes>
            <Route path="/" element={<PageAdmin />} />
            <Route
                path="/dashboard"
                element={
                    <AdminLayout>
                        <AdminDashboard />
                    </AdminLayout>
                }
            />
            <Route
                path="/products"
                element={
                    <AdminLayout>
                        <AdminProduct />
                    </AdminLayout>
                }
            />
            <Route
                path="/products/addProduct"
                element={
                    <AdminLayout>
                        <AddNewProduct />
                    </AdminLayout>
                }
            />
        </Routes>
    );
};
export default Admin;
