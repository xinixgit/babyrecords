/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  SaveRecordRequest,
  UpdateSleepRecordRequest,
  GetSleepRecordResponse,
  GetAllRecordsResponse,
  GetFeedPumpSummaryResponse
} from './HttpModel'
import { handleResponse } from './Util';
import { CreateSaveRecordRequestFromContext } from './Mapper'
import { Context } from '../Model'

export function SaveRecord(ctx: Context, callback: (data: any) => void) {
  const req: SaveRecordRequest = CreateSaveRecordRequestFromContext(ctx)

  fetch('/record', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => {
      console.log(err.message);
    });
}

export function UpdateSleepRecordEndTime(req: UpdateSleepRecordRequest, callback: (data: string) => void) {
  fetch('/record/sleep', {
    method: 'PUT',
    body: JSON.stringify(req),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => {
      console.log(err.message);
    });
}

export function DeleteRecord(id: string, callback: () => void) {
  fetch('/record', {
    method: 'DELETE',
    body: JSON.stringify({ id: id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then(() => callback())
    .catch((err) => {
      console.log(err.message);
    });
}

export function GetLatestSleepRecord(callback: (data: GetSleepRecordResponse) => void) {
  fetch('/record/sleep/latest', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => console.log('err: ' + JSON.stringify(err)));
}

export function GetAllRecords(date: string, callback: (data: GetAllRecordsResponse) => void) {
  fetch('/records?' + new URLSearchParams({ date }), {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => console.log('err: ' + JSON.stringify(err)));
}

export function GetFeedPumpSummary(
  fromDate: string,
  toDate: string,
  callback: (data: GetFeedPumpSummaryResponse) => void,
) {
  fetch('/record/summary/feedpump?' + new URLSearchParams({ from_date: fromDate, to_date: toDate }), {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(handleResponse)
    .then((data) => callback(data))
    .catch((err) => console.log('err: ' + JSON.stringify(err)));
}
