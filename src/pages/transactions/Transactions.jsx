import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./transaction.scss";
import Table from "../../components/table/Table2";

const Transactions = () => {
  return (
    <div className="transaction">
      <Sidebar />
      <div className="transactionContainer">
        <Navbar />
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
