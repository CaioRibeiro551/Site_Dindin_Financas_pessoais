import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../Header/style.css';
import api from "../../service/api";


const Header = ({ setEditarPerfil, editarPerfil }) => {
    const [name, SetName] = useState();

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        navigate("/login");
    }


    const loadName = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await api().get('usuario', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            SetName(response.data.nome.split(" ")[0]);
        } catch (error) {
        }
    }

    useEffect(() => {
        loadName();
    }, [editarPerfil])

    return (
        <>
            <header>
                <img src="/assets/dindinLogo.png" alt="dindin Logo" />

                <div className="usuarioDiv">
                    <img onClick={() => setEditarPerfil(true)} src="/assets/usuarioLogo.png" alt="usuario Logo" />
                    <p>{name}</p>
                    <img onClick={handleLogout} className="logout" src="/assets/logout.svg" alt="logout Logo" />
                </div>
            </header>
        </>
    );
}

export default Header;