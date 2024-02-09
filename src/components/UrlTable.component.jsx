import "../styles/datatable.scss";
import { LoadPanel } from 'devextreme-react/load-panel';
import { userColumns } from "../models/UserInfo";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase";
import DevDataGrid from "./DevDataGrid.component";

const UsersDataTable = () => {
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
      collection(db, "users"),
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
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  let useDevExtremeDataGrid = true;
  return (
    <div className="datatable">

      <div className="datatableTitle">
        Add New User
        <div>
          <Link to="/users/new-clipboard" className="link" onClick={handleLinkClick}>
            Copy from Clipboard
          </Link>
          <span style={{ margin: '0 10px' }}></span>
          <Link to="/users/new" className="link">
            Add New
          </Link>
          <span style={{ margin: '0 10px' }}></span>
          <Link to="/users/new" className="link">
            Delete all
          </Link>
          <span style={{ margin: '0 10px' }}></span>
          {isClipboardEmpty ? (
            <p>Clipboard is empty</p>
          ) : (
            <p>Clipboard content: {clipboardContent}</p>
          )}
        </div>
      </div>
      
      
      
      <LoadPanel
         position={position}     
         visible={dataLoading}
         showIndicator={true}
         shading={false}
         showPane={true}
         hideOnOutsideClick={false}
      />
      <div id="DataGrid" className="height-full" >
      <DevDataGrid columns={userColumns.concat(actionColumn)} dataSrc={data} /> 
      </div>
      
    </div>
  );
};

export default UsersDataTable;
