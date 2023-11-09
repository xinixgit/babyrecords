package db

const saveRecordSql string = `
	INSERT INTO app.baby_records(
		rec_type, 
		data, 
		created_at
	) VALUES (
		:record_type, 
		:data, 
		:created_at
	)
`
const getRecordByTypeSql string = `
	SELECT
		rec_type AS record_type,
		data,
		created_at
	FROM app.baby_records
	WHERE rec_type = $1
`
