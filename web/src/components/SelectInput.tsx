import { ChangeEvent } from "react"

export interface Selection {
  val: string
  txt: string
}

interface Props {
  items: Selection[]
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
  label?: string
  selected?: string
}

const SelectInput = ({ items, handleChange, label, selected }: Props) => {
  const selectedVal = typeof selected === 'undefined' ? items[0].val : selected
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => { handleChange(e) }}>
          {
            items.map((item, idx) => {
              if (item.val === selectedVal) {
                return <option key={idx} value={item.val} selected>{item.txt}</option>
              }

              return <option key={idx} value={item.val}>{item.txt}</option>
            })
          }
        </select>
      </div>
      {typeof label != 'undefined' && <div className="col-2">{label}</div>}
    </div>
  )
}

export default SelectInput