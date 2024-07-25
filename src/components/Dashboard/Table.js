import React, { useEffect, useState } from "react";

const Table = ({ infos, handleEdit, handleDelete }) => {
  const [rendimentoMedio, setRendimentoMedio] = useState(0);

  const calcularRendimentoMedio = (infos) => {
    if (!infos || infos.length === 0) return 0;
    const somaMedias = infos.reduce(
      (total, info) => total + Number(info.media),
      0
    );
    const rendimento = somaMedias / infos.length;
    return rendimento.toFixed(2);
  };

  useEffect(() => {
    setRendimentoMedio(calcularRendimentoMedio(infos));
  }, [infos]);

  return (
    <div className="contain-table">
      <div style={{ display:"flex", justifyContent:"left", alignItems:"center"}}>
        <p style={{ fontSize:"18px", fontWeight:"bold" }}>Rendimento médio: {rendimentoMedio}</p>
      </div>
      <table className="striped-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Andado</th>
            <th>Km. Total</th>
            <th>Valor</th>
            <th>Litros abastecidos</th>
            <th>Média</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {infos ? (
            infos.map((info, i) => (
              <tr key={info.id}>
                <td>{info.data}</td>
                <td>{info.horario}</td>
                <td>{info.andado}</td>
                <td>{info.kmTotal}</td>
                <td>{info.valor}</td>
                <td>{info.ltsAbast}</td>
                <td>{info.media}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(info.id)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(info.id)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No info found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
