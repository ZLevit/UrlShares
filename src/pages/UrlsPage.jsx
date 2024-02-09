import Sidebar from "../components/Sidebar.component"
import Navbar from "../components/Navbar.component"
import UsersDataTable from "../components/UserDataTable.component"
import { Form, Button, Card, Alert } from "react-bootstrap"
const UrlsPage = () => {
  return (
    <div className="mx-auto mt-5" style={{ maxWidth: "1000px" }}>
      <Card >
        <Card.Body>
          <Sidebar />

          <Navbar />
          <UsersDataTable />

        </Card.Body>
      </Card >
    </div>
  )
}

export default UrlsPage