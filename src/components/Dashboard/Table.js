import React from 'react';

const Table = ({ infos, handleEdit, handleDelete }) => {

  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Hora</th>
            <th>Andado</th>
            <th>Km. Total</th>
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
              <td colSpan={7}>No Info</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
