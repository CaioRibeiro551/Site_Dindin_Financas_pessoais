import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./StyleLogin.css";
import logo from "/assets/dindinLogo.png";

export function Singin() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.email === "" || form.password === "") {
            alert("Por favor, preencha todos os campos");
            return;
        }

        try {
            const resposeSingin = await api().post('/login', {
                email: form.email,
                senha: form.password,
            });

            localStorage.setItem("token", resposeSingin.data.token);
            localStorage.setItem("userId", resposeSingin.data.usuario);



            navigate("/main");
        } catch (error) {
            console.log("Erro ao fazer login:", error.response);
            alert('Usuário e/ou senha inválido(s)')
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/main");
        }
    }, [navigate]);

    const handleSignUp = () => {
        navigate("/Cadastro");



    };

    return (
        <div className="singinContainer">
            <img className="loginLogo" src={logo} alt="" />
            <div className="singinTextContainer">
                <h1>
                    Controle suas <span>finanças</span>, sem planilha chata.
                </h1>
                <p>
                    Organizar suas finanças nunca foi tão fácil,
                    <br />
                    com o DINDIN, você tem tudo num único lugar <br />e a um clique de
                    distância.
                </p>
                <button onClick={handleSignUp} className="b-singin-text-container">Cadastre-se</button>
            </div>
            <div className="signinForm">
                <form className="navForm" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                    />

                    <button type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Singin;