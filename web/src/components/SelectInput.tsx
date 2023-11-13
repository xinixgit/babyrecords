import { ChangeEvent } from "react"

interface Props {
  items: { val: string, txt: string }[]
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput = ({ items, handleChange }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-9">
        <select className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e) }}>
          {
            items.map((item) => (
              <option key={item.val} value={item.val}>{item.txt}</option>
            ))
          }
        </select>
      </div>
      <div className="col-2">
        <span className="form-text" />
      </div>
    </div>
  )
}

export default SelectInput