import { LoadPanel } from 'devextreme-react/load-panel';
import { Container, Button, Row, Col } from "react-bootstrap"
import { urlColumnsInfo } from "../models/urlInfo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import  GenericGrid  from "./GenericGrid.component";

const UrlsTable = () => {
  const [data, setData] = useState([]);
  const [clipboardContent, setClipboardContent] = useState('');
  const [isClipboardEmpty, setIsClipboardEmpty] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataLoadingError, setDataLoadingError] = useState('');

  const copyFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setClipboardContent(text);
      setIsClipboardEmpty(false);
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleLinkClick = (event) => {
    event.preventDefault(); // Prevents the default navigation behavior
    copyFromClipboard(); // Calls the function to copy from clipboard
  };

  const position = { of: '#DataGrid' };

  useEffect(() => {

    // LISTEN (REALTIME)
    const unsub = onSnapshot(      
      collection(db, "urls"),
      (snapShot) => {
        setDataLoadingError('');
        setDataLoading(true);
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setDataLoading(false);
      },
      (error) => {
        console.log(error);
        setDataLoading(false);
        setDataLoadingError(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div  className="flex gap-1">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <Button className="viewButton">View</Button>
            </Link>
            <Button  className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</Button>
          </div>
        );
      },
    },
  ];
  
  return (
    <Container fluid style={{ backgroundColor: 'blue' }}>              
         <Row  style={{ backgroundColor: 'gray', paddingTop:'5px', paddingBottom: '5px' }}>
        <Col className="d-flex  gap-3 justify-content-end" style={{ backgroundColor: 'yellow'}} >
          <Button to="/users/new-clipboard" className="link" onClick={handleLinkClick}>
            Copy from Clipboard
          </Button>          
          <Button to="/users/new" className="link">
            Add New
          </Button>                    
          </Col>
        </Row>
      
        <Row  style={{ backgroundColor: 'red', paddingTop:'5px', paddingBottom: '10px' }}>
        <Col className="d-flex justify-content-end" style={{ backgroundColor: 'green' }}>
      <LoadPanel
         position={position}     
         visible={dataLoading}
         showIndicator={true}
         shading={false}
         showPane={true}
         hideOnOutsideClick={false}
      />
      <div id="DataGrid">
        <GenericGrid  columns={urlColumnsInfo.concat(actionColumn)} dataSrc={data} /> 
      </div>
      </Col>
       </Row>
    </Container>
  );
};

export default UrlsTable;
