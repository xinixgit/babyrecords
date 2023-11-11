import { SaveRecordRequest } from './HttpModel'
import { CreateSaveRecordRequestFromContext } from './Mapper'
import { Context } from '../Model'

export function SaveRecord(ctx: Context) {
  const req: SaveRecordRequest = CreateSaveRecordRequestFromContext(ctx)

  fetch('/record/save', {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
}
