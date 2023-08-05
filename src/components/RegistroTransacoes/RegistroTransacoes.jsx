import React, { useRef, useState, useEffect } from 'react'
import '../RegistroTransacoes/style.css'
import api from '../../service/api';
import parse from 'date-fns/parse';


const RegistroTransacoes = ({ setAddModal }) => {

    // const form = form.useRef();


    const token = localStorage.getItem("token");


    const [changeColor, setChangeColor] = useState(true);


    const [categorias, setCategorias] = useState([]);


    const [sendCadastro, setSendCadastro] = useState({
        tipo: '',
        valor: '',
        descricao: '',
        data: '',
        categoria_id: '',
    })


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
        getCategoria();
    }, []);



    const handleChange = (event) => {
        setSendCadastro({ ...sendCadastro, [event.target.name]: event.target.value })
    }



    const handleSubmit = async (event) => {
        event.preventDefault();


        if (sendCadastro.valor === '' || sendCadastro.categoria_id === '' || sendCadastro.data === '' || sendCadastro.descricao === '') {
            setAlert('Todos os campos devem ser preenchidos');
            return
        }

        const data = parse(sendCadastro.data, 'dd/mm/yyyy', new Date())


        try {
            const response = await api().post('transacao', {
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
        setAddModal(false)
    };


    return (
        <div className='modal'>
            <div className='modalRegistro'>
                <div className='closeModal'>
                    <h1 style={{ fontSize: '36px' }}>Adicionar Registro</h1>
                    <img src="/assets/fecharModal.png" alt="Close Modal img" onClick={() => setAddModal(false)} />
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

                    <button>Confirmar</button>
                </form>
                <p>{alert}</p>

            </div>
        </div>
    )
}


export default RegistroTransacoes