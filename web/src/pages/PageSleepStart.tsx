import PageTime from './PageTime'
import { useState } from 'react';
import { GetLatestSleepRecord } from '../http/Api'
// import { CurrentContext } from '../App';
// import { SaveRecord } from '../http/Api';
import { useNavigate } from "react-router-dom";
// import { SUCCESS } from '../Model'

const PageSleepStart = () => {
  const navigate = useNavigate()
  const [dataLoaded, setDataLoaded] = useState(false)

  GetLatestSleepRecord((data) => {
    const end_time = data?.sleep_record?.end_time
    if (end_time === "") {
      navigate("/sleep-end")
      return
    }
    setDataLoaded(true)
  })

  return (
    dataLoaded && <PageTime />
  )
}

export default PageSleepStart