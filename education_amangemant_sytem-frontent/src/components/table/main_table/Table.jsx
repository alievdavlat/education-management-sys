import React from "react";
import "./style.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Search } from "lucide-react";







const TableInfo = ({ filterOption ,width, title, body , data, tableLoading }) => {
  const [globalFilterValue, setGlobalFilterValue] = React.useState("");
  const [filters, setFilters] = React.useState(filterOption);


  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

 

  const renderHeader = () => {
    return (
      <div className="table_input_header">
        <h1
          style={{ color: "var(--table_color)" }}
          className="table_title">
            {title}
        </h1>
        <div className="table_header_left">
          <span className="p-input-icon-left">
            <InputText
              value={globalFilterValue}
              autoFocus
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
            <Search style={{ color: "var(--table_color)" }} />
          </span>
        </div>
      </div>
    );
  };



  const header = renderHeader();

  return (
    <>
      <div
        className="table_wrapper"
        style={{ width: `${window.screen.width <= 420  ? '300px' :  width}` }}>
        <DataTable
          value={data}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          stripedRows
          sortMode="multiple"
          filters={filters}
          filterDisplay="row"
          loading={tableLoading}
          dataKey="company_id"
          header={header}
          globalFilterFields={[
            "company",
            "company_admin",
            "payment_status",
            "company_payed_at",
            "created_at",
          ]}
          emptyMessage="No data found.">
            {
              body.map((item , idx ) => (
                
                <Column
                key={item.id}
                style={{ color: "var(--table_color)"}}
                sortable
                field={item.field}
                header={item.header}
                resizeable
                className="td-table"
                body={item.select ? item.BodyTemplatee : item.date ? item.dateparser :  item.imgField ? item.imgColBody : ''}
                ></Column>
                
              ))
            }
        </DataTable>
      </div>
    </>
  );
};

export default TableInfo;
