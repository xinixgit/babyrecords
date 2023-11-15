import { ChangeEvent } from "react"

export interface Selection {
  val: string
  txt: string
}

interface Props {
  items: Selection[]
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
  selectedIdx?: number
}

const SelectInput = ({ items, handleChange }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => { handleChange(e) }}>
          {
            items.map((item, idx) => (
              <option key={idx} value={item.val}>{item.txt}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export default SelectInput