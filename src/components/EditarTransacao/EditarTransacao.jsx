import React, { useState, useEffect } from 'react'
import '../EditarTransacao/style.css'
import api from '../../service/api';
import { parse, format } from 'date-fns';


const EditarTransacao = ({ setEditModal, transacaoID }) => {

    const token = localStorage.getItem("token");

    const [changeColor, setChangeColor] = useState(false);

    const [sendCadastro, setSendCadastro] = useState({
        tipo: '',
        valor: '',
        descricao: '',
        data: '',
        categoria_id: '',
    })

    const [categorias, setCategorias] = useState([]);

    const [alert, setAlert] = useState('');


    useEffect(() => {
        const getCategoria = async () => {
            try {
                const response = await api().get('categoria', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setCategorias([...response.data])
            }
            catch (error) { console.log(error) }
        };
        const getTransacaoEscolhida = async () => {
            try {
                const response = await api().get(`transacao/${transacaoID}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setSendCadastro({ ...response.data, data: format(new Date(response.data.data), 'dd/mm/yyyy') })
            } catch (error) { console.log(error) }
        }
        getCategoria()
        getTransacaoEscolhida()
    }, [])


    const handleChange = (event) => {
        setSendCadastro({ ...sendCadastro, [event.target.name]: event.target.value })
    }




    const handleSubmit = async (event) => {
        event.preventDefault();

        if (sendCadastro.valor === '' || sendCadastro.categoria_id === '' || sendCadastro.data === '' || sendCadastro.descricao === '') {
            alert('Todos os campos devem ser preenchidos');
            return
        }
        const data = parse(sendCadastro.data, 'dd/mm/yyyy', new Date())
        try {
            const response = await api().put(`transacao/${transacaoID}`, {
                tipo: changeColor ? 'saida' : 'entrada',
                descricao: sendCadastro.descricao,
                valor: Number(sendCadastro.valor),
                data: data,
                categoria_id: sendCadastro.categoria_id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAlert('')
        }
        catch (error) { console.log(error) }
        setEditModal(false)
    };

    return (
        <div className='modal'>
            <div className='editRegistro'>
                <div className='closeModal'>
                    <h1 style={{ fontSize: '36px' }}>Editar Registro</h1>
                    <img src="/assets/fecharModal.png" alt="Close Modal img" onClick={() => setEditModal(false)} />
                </div>
                <div className='buttons'>
                    <button className='buttonEnter' style={{ backgroundColor: changeColor ? '#B9B9B9' : '#3A9FF1' }} onClick={() => setChangeColor(false)}>Entrada</button>
                    <button className='buttonExit' style={{ backgroundColor: !changeColor ? '#B9B9B9' : '#FF576B' }} onClick={() => setChangeColor(true)}>Saída</button>
                </div>

                <form className='registroInputs ' onSubmit={handleSubmit}>

                    <label htmlFor="valor">Valor</label>
                    <input type="text" name='valor' id='valor' value={sendCadastro.valor} onChange={handleChange} />

                    <label htmlFor="categoria">Categoria</label>
                    <select name="categoria_id" id='categoria' value={sendCadastro.categoria_id} onChange={handleChange}>
                        <option value="vazio"></option>
                        {categorias.map((categoria) => (<option key={categoria.id} value={categoria.id}>{categoria.descricao}</option>))}
                    </select>

                    <label htmlFor="data">Data</label>
                    <input type="text" name='data' id='data' value={sendCadastro.data} onChange={handleChange} />

                    <label htmlFor="descricao">Descrição</label>
                    <input type="text" name='descricao' id='descricao' value={sendCadastro.descricao} onChange={handleChange} />

                    <button className='confirmTransation'>Confirmar</button>
                </form>
                <p>{alert}</p>
            </div>
        </div>
    )
}
export default EditarTransacao