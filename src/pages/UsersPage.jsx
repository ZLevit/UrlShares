import "../styles/list.scss"
import Sidebar from "../components/Sidebar.component"
import Navbar from "../components/Navbar.component"
import UsersDataTable from "../components/UserDataTable.component"

const UsersPage = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <UsersDataTable/>
      </div>
    </div>
  )
}

export default UsersPage