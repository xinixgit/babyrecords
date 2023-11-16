interface Props {
  header: string
  tableHeader: string[]
  rows: string[][]
  aggregate: (rows: string[][]) => string
}

const TableWithHeader = ({ header, tableHeader, rows, aggregate }: Props) => {
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
          <tr>
            <td className="summary" colSpan={header.length}><span>总结:</span> {aggregate(rows)}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default TableWithHeader