export interface Row {
  id: string
  data: string[]
}

export interface TableContent {
  header: string[]
  rows: Row[]
  aggFn?: (rows: Row[]) => string
}

interface Props {
  pageHeader: string
  table: TableContent
  onDelete?: (id: string) => void
}

const TableWithHeader = ({ pageHeader, table, onDelete }: Props) => {
  return (
    <>
      <h1>{pageHeader}</h1>
      <table className="table table-striped dashboard-table">
        <thead>
          <tr>
            {
              table.header.map((col, idx) => (
                <th scope="col" key={idx}>{col}</th>
              ))
            }
            <th />
          </tr>
        </thead>
        <tbody>
          {
            table.rows.map((row, rowIdx) => (
              <tr key={'tr' + rowIdx}>
                {
                  row.data.map((col, colIdx) => (
                    <td key={rowIdx + '.' + colIdx}>{col}</td>
                  ))
                }
                {
                  typeof onDelete !== 'undefined' &&
                  <td>
                    <button
                      className="btn btn-dashboard btn-danger"
                      onClick={() => onDelete(row.id)}
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                }
              </tr>
            ))
          }
          <tr>
            {
              typeof table.aggFn !== 'undefined' &&
              <td className="summary" colSpan={table.header.length + 1}>
                <span>总结:</span> {table.aggFn(table.rows)}
              </td>
            }
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableWithHeader