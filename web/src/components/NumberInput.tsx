import { ChangeEvent } from "react";

interface Props {
  label: string;
  handleChange: (val: string) => void;
}

const NumberInput = ({ label, handleChange }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-9">
        <input type="number" className="form-control" onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e.target.value) }} />
      </div>
      <div className="col-2">
        <span className="form-text">
          {label}
        </span>
      </div>
    </div>
  )
}

export default NumberInput;