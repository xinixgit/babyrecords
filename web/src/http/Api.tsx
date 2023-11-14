/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  SaveRecordRequest,
  UpdateSleepRecordRequest,
  GetSleepRecordResponse,
  GetAllRecordsResponse
} from './HttpModel'

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
    .then((response) => response.json())
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
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((err) => {
      console.log(err.message);
    });
}

export function GetLatestSleepRecord(callback: (data: GetSleepRecordResponse) => void) {
  fetch('/records/sleep/latest', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((err) => console.log('err: ' + JSON.stringify(err)));
}

export function GetAllRecords(callback: (data: GetAllRecordsResponse) => void) {
  fetch('/records', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((err) => console.log('err: ' + JSON.stringify(err)));
}
