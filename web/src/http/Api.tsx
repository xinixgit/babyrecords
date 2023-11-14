/* eslint-disable @typescript-eslint/no-explicit-any */

import { SaveRecordRequest } from './HttpModel'
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
    .then((response) => {
      console.log('response: ' + JSON.stringify(response))
    })
    .then((data) => callback(data))
    .catch((err) => {
      console.log(err.message);
    });
}
