import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link,  useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({ columns }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/")[1];
  const { data, loading, error, reFetch } = useFetch(`${path}`);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (Array.isArray(data)) {
      setList(prevList => [...prevList, ...data]);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/${path}/delete/${id}`);
      setList(prevList => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  const handleEdit = (id) => {
    // Tìm row dựa vào ID
    const rowToEdit = list.find(item => item._id === id);
    
    // Chuyển hướng sang trang cập nhật và truyền dữ liệu qua state
    navigate(`/${path}/update/${id}`, { state: { rowToEdit, id } });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction"> 
            <div
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new${path}`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
