import { Link } from "react-router-dom";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User",
    width: 230,    
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellAction">
         
          <div
            className="deleteButton"            
          >
            {params.value}
          </div>
        </div>
      );
    }
  },

  {
    field: "address",
    headerName: "Address",
    width: 100,
  },  
];
