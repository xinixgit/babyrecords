import { ChangeEvent } from "react"

interface Props {
  items: { val: string, txt: string }[]
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectInput = ({ items, handleChange }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7">
        <select className="form-select" aria-label="Default select example" onChange={(e) => { handleChange(e) }}>
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

export default SelectInput