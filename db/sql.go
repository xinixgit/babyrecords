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

const deleteRecordByIDSql string = `
	DELETE FROM app.baby_records
	WHERE id = $1
`

const getRecordByTypeSql string = `
	SELECT
		id,
		rec_type AS record_type,
		data,
		created_at
	FROM app.baby_records
	WHERE rec_type = $1
	AND DATE(created_at AT TIME ZONE 'America/Los_Angeles') = $2
	ORDER BY created_at
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

const getFeedSummaryBetweenDates string = `
	SELECT
		TO_CHAR(DATE(created_at AT TIME ZONE 'America/Los_Angeles'), 'YYYY-MM-DD') as date,
		SUM((data::json->>'vol')::int) as sum
	FROM app.baby_records
	WHERE rec_type = 'feed'
	AND data::json->>'type' = 'milk'
	AND DATE(created_at AT TIME ZONE 'America/Los_Angeles') BETWEEN $1 AND $2
	GROUP BY 1
`

const getPumpSummaryBetweenDates string = `
	SELECT
		TO_CHAR(DATE(created_at AT TIME ZONE 'America/Los_Angeles'), 'YYYY-MM-DD') as date,
		SUM((data::json->>'vol')::int) as sum
	FROM app.baby_records
	WHERE rec_type = 'pump'
	AND DATE(created_at AT TIME ZONE 'America/Los_Angeles') BETWEEN $1 AND $2
	GROUP BY 1
`
