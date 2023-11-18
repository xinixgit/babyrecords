interface Props {
  message: string
  alertClass?: string
}

const AlertBox = ({ message, alertClass }: Props) => {
  if (typeof alertClass === 'undefined') {
    alertClass = 'alert-dark'
  }

  return (
    <div className="row g-3 align-items-center justify-content-center">
      <div className="col-7 giant-font">
        <div className={'alert ' + alertClass} role="alert">
          {message}
        </div>
      </div>
    </div>
  )
}

export default AlertBox