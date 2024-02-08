import Sidebar from "../components/Sidebar.component";
import Navbar from "../components/Navbar.component";
import "../styles/home.scss";
import Table from "../components/ProductsTable.component";

const HomePage = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
       
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
