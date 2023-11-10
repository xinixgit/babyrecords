interface Props {
  label: string;
}

const NumberInput = ({ label }: Props) => {
  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-9">
        <input type="number" id="feedAmount" className="form-control" />
      </div>
      <div className="col-2">
        <span className="form-text">
          {label}
        </span>
      </div>
    </div>
  )
}

export default NumberInput