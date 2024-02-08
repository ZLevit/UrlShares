import "../styles/list.scss"
import Sidebar from "../components/Sidebar.component"
import Navbar from "../components/Navbar.component"
import ProductsTable from "../components/ProductsTable.component"
const ProductsPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <ProductsTable/>
      </div>
    </div>
  )
}

export default ProductsPage
