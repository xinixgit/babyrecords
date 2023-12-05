import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from "react-chartjs-2";
import { GetFeedPumpSummary } from '../http/Api'
import { GetFeedPumpSummaryResponse } from '../http/HttpModel'
import { ToDateString } from '../components/Util'
import DatePicker from "react-datepicker";
import { extractDates, extractPumpData, extractDiff } from './FeedPumpSummaryUtil'
import 'react-datepicker/dist/react-datepicker.css'

interface Series {
  label: string
  data: number[]
  backgroundColor: string
}

interface DataSet {
  labels: string[]
  datasets: Series[]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '',
    },
  },
  base: 0
};

const SixDaysInMs = 6 * 24 * 60 * 60 * 1000;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeedPumpSummary = () => {
  const [dataset, setDataset] = useState({
    labels: [''],
    datasets: [{ label: '', data: [0], backgroundColor: '' }],
  })

  const [inputDate, setInputDate] = useState(new Date());

  useEffect(() => {
    refreshChart(new Date(), setDataset)
  }, [setDataset])

  return (
    <>
      <DatePicker selected={inputDate} onChange={(date: Date) => {
        setInputDate(date)
        refreshChart(date, setDataset)
      }} />
      <Bar options={options} data={dataset} redraw={true} />
    </>
  )
}

function generateChartData(data: GetFeedPumpSummaryResponse): DataSet {
  const dates = extractDates(data)

  const pumpSeries = {
    label: '每日产奶量（ml）',
    data: extractPumpData(dates, data.pump),
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  }

  const feedSeries = {
    label: '每日奶差（ml）',
    data: extractDiff(dates, data.pump, data.feed),
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  }

  return {
    labels: dates,
    datasets: [pumpSeries, feedSeries]
  }
}

function refreshChart(
  today: Date,
  setDataset: (dataset: DataSet) => void
) {
  const fromDate = ToDateString(new Date(today.getTime() - SixDaysInMs))
  const toDate = ToDateString(today)

  GetFeedPumpSummary(fromDate, toDate, (data: GetFeedPumpSummaryResponse) => {
    const ds = generateChartData(data)
    setDataset(ds)
  })
}

export default FeedPumpSummary