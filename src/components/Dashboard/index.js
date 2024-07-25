import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import Header from "./Header";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Dashboard = ({ setIsAuthenticated }) => {
  const [infos, setInfos] = useState(null);
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getInfos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "motorbike-info"));
      const infos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInfos(infos);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    getInfos();
  }, []);

  const handleEdit = (id) => {
    const [info] = infos.filter((info) => info.id === id);

    setSelectedInfo(info);
    setIsEditing(true);
  };


  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Tem certeza?",
      text: "Você não poderá reverter a ação!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.value) {
        deleteDoc(doc(db, "motorbike-info", id));

        Swal.fire({
          icon: "success",
          title: "Deletado!",
          showConfirmButton: false,
          timer: 1500,
        });

        const InfosCopy = infos.filter(
          (info) => info.id !== id
        );
        setInfos(InfosCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            infos={infos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          infos={infos}
          setInfos={setInfos}
          setIsAdding={setIsAdding}
          getInfos={getInfos}

        />
      )}
      {isEditing && (
        <Edit
          infos={infos}
          getInfos={getInfos}
          selectedInfo={selectedInfo}
          setInfos={setInfos}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
