package db

const saveRecordSql string = `
	INSERT INTO baby_record(record_type, data, created_at) VALUES (:recordType, :data, :createdAt)
`
