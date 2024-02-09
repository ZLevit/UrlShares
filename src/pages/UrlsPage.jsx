import Sidebar from "../components/Sidebar.component"
import Navbar from "../components/Navbar.component"
import UrlTable from "../components/UrlTable.component"
import { Form, Button, Card, Alert } from "react-bootstrap"
const UrlsPage = () => {
  return (
    <div >
    <div className="d-flex  mx-auto mt-5" style={{ backgroundColor: 'orange',  maxWidth: "1000px" }}>
      <Card >
        <Card.Title>URLs</Card.Title>
        <Card.Body>             
          <UrlTable />
        </Card.Body>
      </Card >
    </div>
    </div>
  )
}

export default UrlsPage