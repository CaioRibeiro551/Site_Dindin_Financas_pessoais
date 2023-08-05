import React, { useState } from "react";
import Header from "../components/Header/Header";
import PainelTransacoes from "../components/PainelTransacoes/PainelTransacoes";
import ResumoTransacoes from "../components/ResumoTransacoes/ResumoTransacoes";
import RegistroTransacoes from "../components/RegistroTransacoes/RegistroTransacoes";
import EditarTransacao from "../components/EditarTransacao/EditarTransacao";
import EditarPerfil from "../components/EditarPerfil/EditarPerfil";





const MakeMain = () => {
    const [addModal, setAddModal] = useState(false);

    const [editModal, setEditModal] = useState(false);

    const [transacao, setTransacao] = useState([])

    const [transacaoID, setTransacaoID] = useState();

    const [editarPerfil, setEditarPerfil] = useState(false);


    return (
        <>
            <Header setEditarPerfil={setEditarPerfil} editarPerfil={editarPerfil} />
            <PainelTransacoes setTransacao={setTransacao} transacao={transacao} setEditModal={setEditModal} addModal={addModal}
                editModal={editModal} setTransacaoID={setTransacaoID} transacaoID={transacaoID} setEditarPerfil={setEditarPerfil} />
            <ResumoTransacoes setAddModal={setAddModal} transacao={transacao} />
            {addModal && <RegistroTransacoes setAddModal={setAddModal} />}
            {editModal && <EditarTransacao setEditModal={setEditModal} transacaoID={transacaoID} />}
            {editarPerfil && <EditarPerfil setEditarPerfil={setEditarPerfil} editarPerfil={editarPerfil} />}
            <div className="whiteConteiner"></div>
        </>
    );
}

export default MakeMain;
