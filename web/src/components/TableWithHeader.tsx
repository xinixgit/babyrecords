interface Props {
  header: string
  tableHeader: string[]
  rows: string[][]
}

const TableWithHeader = ({ header, tableHeader, rows }: Props) => {
  return (
    <>
      <h1>{header}</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            {
              tableHeader.map((col, idx) => (
                <th scope="col" key={idx}>{col}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row, rowIdx) => (
              <tr key={'tr' + rowIdx}>
                {
                  row.map((col, colIdx) => (
                    <td key={rowIdx + '.' + colIdx}>{col}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default TableWithHeader