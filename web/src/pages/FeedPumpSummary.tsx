import { useState, useEffect } from 'react';
import { GetFeedPumpSummary } from '../http/Api'

const FeedPumpSummary = () => {
  const [data, setData] = useState({ summary: {} })

  useEffect(() => {
    GetFeedPumpSummary('2023-11-17', '2023-11-24', (data: { summary: object }) => {
      setData(data)
    })
  }, [setData])

  return (
    <div>{JSON.stringify(data.summary)}</div>
  )
}

export default FeedPumpSummary