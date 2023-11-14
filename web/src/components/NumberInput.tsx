import { ChangeEvent } from "react";

interface Props {
  label: string;
  handleChange: (val: string) => void;
}

const NumberInput = ({ label, handleChange }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7">
        <input type="number" className="form-control" placeholder={label} onChange={(e: ChangeEvent<HTMLInputElement>) => { handleChange(e.target.value) }} />
      </div>
    </div>
  )
}

export default NumberInput;