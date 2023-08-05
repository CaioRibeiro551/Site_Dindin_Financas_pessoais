import { useState } from "react";
import api from "../../service/api"; // api
import "./StyleFormulárioCadastro.css";
import logo from "/assets/dindinLogo.png";
import { useNavigate } from "react-router-dom"; //hook

export function FormulárioCadastro() {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacaoSenha: "",
    });

    const navigate = useNavigate(); // instancio o hook

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            form.nome === "" ||
            form.email === "" ||
            form.senha === "" ||
            form.confirmacaoSenha === ""
        ) {
            alert("Por favor, preencha todos os campos");
            return;
        }
        if (form.senha !== form.confirmacaoSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        api().post("/usuario", {
            nome: form.nome,
            email: form.email,
            senha: form.senha,
        })

            .then((response) => {
                console.log("Usuário cadastrado:", response.data);
                navigate("/Login");
            })
            .catch((error) => {
                console.error("Erro ao cadastrar usuário:", error);
            });
    };

    return (
        <div className="singupContainer">
            <img className="logoDindin" src={logo} alt="logo" />
            <form className="formContainer" onSubmit={handleSubmit}>
                <h1>Cadastre-se</h1>
                <div className="singupInputs">
                    <label htmlFor="name">Nome</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={form.nome}
                        onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    />

                    <label htmlFor="email">E-mail</label>
                    <input
                        id="email"
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        type="password"
                        name="senha"
                        value={form.senha}
                        onChange={(e) => setForm({ ...form, senha: e.target.value })}
                    />

                    <label htmlFor="password">Confirmação senha</label>
                    <input
                        id="password"
                        type="password"
                        name="confirmacaoSenha"
                        value={form.confirmacaoSenha}
                        onChange={(e) =>
                            setForm({ ...form, confirmacaoSenha: e.target.value })
                        }
                    />
                </div>

                <button type="submit">Cadastrar</button>
                <a onClick={() => navigate("/Login")} href="">Já tem cadastro? Clique aqui!</a>
            </form>

        </div>
    );
}