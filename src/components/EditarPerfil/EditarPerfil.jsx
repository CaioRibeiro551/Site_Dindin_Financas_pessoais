import React, { useEffect, useState } from 'react'
import '../EditarPerfil/style.css'
import api from '../../service/api';


function EditarPerfil({ setEditarPerfil }) {

    const token = localStorage.getItem("token");

    const [alert, setAlert] = useState('');

    const [dadosUsuario, setDadosUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });

    const handleChange = (event) => {
        setDadosUsuario({ ...dadosUsuario, [event.target.name]: event.target.value })
    }

    const pegarUsuario = async () => {
        try {
            const response = await api().get('usuario', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setDadosUsuario({ ...dadosUsuario, nome: response.data.nome, email: response.data.email })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        pegarUsuario();
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (dadosUsuario.nome === '' || dadosUsuario.email === '' || dadosUsuario.senha === '' || dadosUsuario.confirmarSenha === '') {
            setAlert('Todos os campos devem ser preenchidos');
            return
        }

        if (dadosUsuario.senha !== dadosUsuario.confirmarSenha) {
            setAlert('Senhas não coincidem')
            return
        }

        try {
            const response = await api().put('usuario', {
                nome: dadosUsuario.nome,
                email: dadosUsuario.email,
                senha: dadosUsuario.senha
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setEditarPerfil(false)
            setAlert('');
        }
        catch (error) { console.log(error) }
    };




    return (
        <div className='modal'>
            <div className='modalUsuario'>
                <form className='editInputs' onSubmit={handleSubmit}>
                    <div className='closeModal'>
                        <h1 style={{ fontSize: '36px' }}>Editar Perfil</h1>
                        <img src="/assets/fecharModal.png" alt="Close Modal img" onClick={() => setEditarPerfil(false)} />
                    </div>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name='nome' id='nome' value={dadosUsuario.nome} onChange={handleChange} />
                    <label htmlFor="email">E-mail</label>
                    <input type="text" name='email' id='email' value={dadosUsuario.email} onChange={handleChange} />
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name='senha' id='senha' value={dadosUsuario.senha} onChange={handleChange} />
                    <label htmlFor="confirmarSenha">Confirmação de senha</label>
                    <input type="password" name='confirmarSenha' id='confirmarSenha' value={dadosUsuario.confirmarSenha} onChange={handleChange} />
                    <button type='submit'>Confirmar</button>
                    <p>{alert}</p>
                </form>


            </div>
        </div>
    )
}

export default EditarPerfil