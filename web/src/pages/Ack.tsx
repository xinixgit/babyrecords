import { useNavigate, useSearchParams } from "react-router-dom";
import VerticalWords from "../components/VerticalWords";
import { SUCCESS } from "../Model"

const Ack = () => {
  const navigate = useNavigate()
  setTimeout(() => { navigate("/") }, 2000)

  const words = ["提", "交", "成", "功"]
  const [queryParam] = useSearchParams()
  const status = queryParam.get("status")
  const textClass = status == SUCCESS ? "status-success" : ""

  return (
    <VerticalWords words={words} textClass={textClass} />
  )
}

export default Ack