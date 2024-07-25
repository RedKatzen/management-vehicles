import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../config/firebase';

const Add = ({ infos, setInfos, setIsAdding, getInfos }) => {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [andado, setAndado] = useState(0);
  const [kmTotal, setKmTotal] = useState(0);
  const [valor, setValor] = useState(0);
  const [ltsAbast, setLtsAbast] = useState(0);
  const [media, setMedia] = useState('');

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

  const handleAdd = e => {
    e.preventDefault();

    if (!data || !horario || !andado || !kmTotal || !valor || !ltsAbast || !media) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newInfo = {
      data,
      horario,
      andado,
      kmTotal,
      valor,
      ltsAbast,
      media
    };

    infos.push(newInfo);

    // Add a new doc with a generated id.
    try {
      addDoc(collection(db, "motorbike-info"), {
        ...newInfo
      });
    } catch (error) {
      console.log("Error adding document: ", error);
    } 

    setInfos(infos);
    setIsAdding(false);
    getInfos(); 

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Info</h1>
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
          value={valor}
          onChange={e => setValor(e.target.value)}
        />
        <label htmlFor="media">Média</label>
        <input 
          id="media"
          type="text"
          name="media"
          value={media}
          readOnly
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
