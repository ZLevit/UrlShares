import React, { useState } from 'react';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel } from 'devextreme-react/data-grid';

const GenericGrid = ({ columns , dataSrc }) => {
   
  const [ searchValue, setSearchValue] = useState('');
  
  const handleSearchValueChanged = (e) => {
    setSearchValue(e.value);
  };
  return (
    <DataGrid
      dataSource={dataSrc}
      showBorders={true}
      allowColumnReordering={true}
      allowColumnResizing={true}
      columnAutoWidth={true}
    >
      <FilterRow visible={true} />
      <HeaderFilter visible={true} />
      <SearchPanel visible={true} />
      {columns.map(column => (
        <Column
          key={column.field}
          dataField={column.field}
          caption={column.headerName}
          width={column.width}
          cellRender={column.renderCell ? column.renderCell :   null }
        />
      ))}
    </DataGrid>
  );
  
};
   
export default GenericGrid;
