import React, { useEffect, useState } from 'react';
import '../ResumoTransacoes/style.css';
import api from '../../service/api';


const ResumoTransacoes = ({ setAddModal, transacao }) => {

    const token = localStorage.getItem("token");

    const [valoresExtrato, setValoresExtrato] = useState({
        entrada: 0,
        saida: 0
    })

    useEffect(() => {
        const getExtrato = async () => {
            try {
                const response = await api().get('transacao/extrato', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setValoresExtrato({ ...response.data })
            }
            catch (error) { console.log(error) };
        }
        getExtrato()
    }, [transacao])



    return (
        <>
            <div className='containerResumo'>
                <div className='resumo'>
                    <p style={{ fontSize: '18px' }}>Resumo</p>
                    <p style={{ fontSize: '13px', fontWeight: '500' }}>Entradas<span style={{ color: '#645FFB' }}>{(valoresExtrato.entrada).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span></p>
                    <p style={{ fontSize: '13px', fontWeight: '500' }}>Saidas<span style={{ color: '#FA8C10' }}>{(valoresExtrato.saida).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span></p>
                    <div className='lineResumo'></div>
                    <p>Saldo <span style={{ color: '#3A9FF1' }}>{(valoresExtrato.entrada - valoresExtrato.saida).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span></p>
                </div>
                <button className='addRegistro' onClick={() => setAddModal(true)}>Adicionar Registro</button>
            </div>
        </>
    )
}

export default ResumoTransacoes
