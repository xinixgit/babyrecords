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
const updateRecordByIDSql string = `
	UPDATE app.baby_records
	SET data = $1
	WHERE id = $2
	AND rec_type = $3
`

const getRecordByTypeSql string = `
	SELECT
		id,
		rec_type AS record_type,
		data,
		created_at
	FROM app.baby_records
	WHERE rec_type = $1
`

const getLatestRecordByTypeSql string = `
	SELECT
		id,
		rec_type AS record_type,
		data,
		created_at
	FROM app.baby_records
	WHERE rec_type = $1
	ORDER BY created_at DESC
	LIMIT 1
`
