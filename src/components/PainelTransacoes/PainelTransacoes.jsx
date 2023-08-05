import React, { useEffect, useState } from "react";
import '../PainelTransacoes/style.css'
import api from "../../service/api";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";

const PainelTransacoes = ({ setEditModal, addModal, editModal, setTransacaoID, transacao, setTransacao }) => {

  const token = localStorage.getItem("token");


  const getListarTransacoes = async () => {
    try {
      const response = await api().get('transacao', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTransacao([...response.data])
    }
    catch (error) { console.log(error) }
  };


  const excluirTransacao = async (id) => {
    try {
      await api().delete(`transacao/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) { console.log(error); }
    getListarTransacoes();
  }


  useEffect(() => {
    getListarTransacoes()
  }, [addModal, editModal])


  return (
    <table className="tabelaTransacoes" >
      <thead className="cabecalhoTabela">
        <tr>
          <th>Data</th>
          <th>Dia da semana</th>
          <th>Descrição</th>
          <th>Categoria</th>
          <th>Valor</th>
          <th></th>
        </tr>
      </thead>
      <tbody >
        {transacao.map((transacao) => (<tr className="corpoTabela" key={transacao.id} >
          <th>{format(new Date(transacao.data), 'dd/mm/yyyy')}</th>
          <th style={{ fontWeight: '400' }}>{format(new Date(transacao.data), 'EE', { locale: ptBR })}</th>
          <th style={{ fontWeight: '400' }}>{transacao.descricao}</th>
          <th style={{ fontWeight: '400' }}>{transacao.categoria_nome}</th>
          <th style={{ color: transacao.tipo === 'entrada' ? '#7B61FF' : '#FA8C10' }}>{transacao.valor.toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</th>
          <th><img onClick={() => { setEditModal(true); setTransacaoID(transacao.id) }} src="/assets/pen.png" alt="" />
            <img onClick={() => { excluirTransacao(transacao.id) }} src="/assets/trash.png" alt="" /></th>
        </tr>))}

      </tbody>
    </table>
  )
};

export default PainelTransacoes;