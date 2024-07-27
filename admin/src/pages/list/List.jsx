import "./list.scss"
import useFetch from "../../hooks/useFetch";
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"

const List = ({endpoint, columns}) => {
  const { data, loading, error } = useFetch(endpoint);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable columns={columns} data={data}/>
      </div>
    </div>
  )
}

export default List