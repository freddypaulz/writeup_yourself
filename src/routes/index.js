import React, { Suspense, lazy } from 'react';
import {
   Route,
   BrowserRouter as Router,
   Routes,
   Navigate,
} from 'react-router-dom';
import { MainLayout } from 'layout';
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Dashboard = lazy(() => import('pages/Dashboard'));

const RoutesClass = () => {
   return (
      <Router>
         <Suspense fallback={<div>Loading...</div>}>
            <MainLayout>
               <Routes>
                  <Route path='/' element={<Navigate to='/login' replace />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/dashboard'>
                     <Route index element={<Dashboard />} />
                  </Route>
               </Routes>
            </MainLayout>
         </Suspense>
      </Router>
   );
};

export default RoutesClass;
