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
              tableHeader.map((col) => (
                <th scope="col">{col}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row) => (
              <tr>
                {
                  row.map((col) => (
                    <td>{col}</td>
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