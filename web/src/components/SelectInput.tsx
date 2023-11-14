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

const SelectInput = ({ items, handleChange, selectedIdx }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7">
        <select
          className="form-select"
          aria-label="Default select example"
          value={getSelectedValue(selectedIdx || 0, items)}
          onChange={(e) => { handleChange(e) }}>
          {
            items.map((item) => (
              <option key={item.val} value={item.val}>{item.txt}</option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

function getSelectedValue(idx: number, items: Selection[]): string {
  return items[idx].val
}

export default SelectInput