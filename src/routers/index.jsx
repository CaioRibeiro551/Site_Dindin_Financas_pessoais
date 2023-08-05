import { BrowserRouter, Route, Routes, Outlet, Navigate } from "react-router-dom";
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro';
import Main from '../pages/Main'


function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = localStorage.getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}


export function MyRouters() {



    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path='/'>
                    <Route path='/Login' element={<Login />} />
                </Route>
                <Route path='/Cadastro' element={<Cadastro />} />
                <Route element={<ProtectedRoutes redirectTo='/' />}>
                    <Route path='/Main' element={<Main />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )

}