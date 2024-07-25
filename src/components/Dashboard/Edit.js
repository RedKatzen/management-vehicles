import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { doc, setDoc } from "firebase/firestore";
import { db } from '../../config/firebase';

const Edit = ({ infos, selectedInfo, getInfos, setInfos, setIsEditing }) => {
  const id = selectedInfo.id;

  const [data, setData] = useState(selectedInfo.data);
  const [horario, setHorario] = useState(selectedInfo.horario);
  const [andado, setAndado] = useState(selectedInfo.andado);
  const [kmTotal, setKmTotal] = useState(selectedInfo.kmTotal);
  const [valor, setValor] = useState(selectedInfo.valor);
  const [ltsAbast, setLtsAbast] = useState(selectedInfo.ltsAbast);
  const [media, setMedia] = useState(selectedInfo.media);

  const calcMedia = (andado, ltsAbast) => {
    const andadoNumber = parseFloat(andado);
    const ltsAbastNumber = parseFloat(ltsAbast);

    if (!isNaN(andadoNumber) && !isNaN(ltsAbastNumber) && ltsAbastNumber !== 0) {
      const calculatedMedia = (andadoNumber / ltsAbastNumber).toFixed(2);
      setMedia(calculatedMedia.toString()); // Converte para string
    } else {
      setMedia('');
    }
  }

  const handleAndadoChange = (e) => {
    const value = e.target.value;
    setAndado(value);
    calcMedia(value, ltsAbast); 
  };

  const handleLtsAbastChange = (e) => {
    const value = e.target.value;
    setLtsAbast(value);
    calcMedia(andado, value); 
  };

  const handleUpdate = async e => {
    e.preventDefault();

    if (!data || !horario || !andado || !kmTotal || !valor || !ltsAbast || !media) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const info = {
      id,
      data,
      horario,
      andado,
      kmTotal,
      valor,
      ltsAbast,
      media
    };

    await setDoc(doc(db, "motorbike-info", id), {
      ...info
    })

    setInfos(infos);
    setIsEditing(false);
    getInfos();

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
        <h1>Edit Info</h1>
        <label htmlFor="data">Data</label>
        <input
          id="data"
          type="date"
          name="data"
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <label htmlFor="horario">Horário</label>
        <input
          id="horario"
          type="text"
          name="horario"
          value={horario}
          onChange={e => setHorario(e.target.value)}
        />
        <label htmlFor="andado">Andado</label>
        <input
          id="andado"
          type="number"
          name="andado"
          value={andado}
          onChange={handleAndadoChange}
        />
        <label htmlFor="kmTotal">Km. Total</label>
        <input
          id="kmTotal"
          type="number"
          name="kmTotal"
          value={kmTotal}
          onChange={e => setKmTotal(e.target.value)}
        />
        <label htmlFor="ltsAbast">Litros abastecidos</label>
        <input
          id="ltsAbast"
          type="number"
          name="ltsAbast"
          value={ltsAbast}
          onChange={handleLtsAbastChange}
        />
        <label htmlFor="valor">Valor</label>
        <input 
          id="valor"
          type="number"
          name="valor"
          step="any"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <label htmlFor="media">Média</label>
        <input 
          id="media"
          type="number"
          name="media"
          value={media}
          readOnly
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Update" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => (setIsEditing(false))}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
