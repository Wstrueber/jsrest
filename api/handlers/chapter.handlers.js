const { pool } = require('../../database')
const { CHAPTER_INFO, VERSIONS_INFO } = require('../queries')

const getVersions = async chapterId => {
	const client = await pool.connect()
	const versions = await client.query(VERSIONS_INFO, [chapterId])
	await client.release()

	const result = versions.rows.map(row => {
		return {
			created_by: row.person_username,
			chapter_version_id: row.chapter_version_id,
			version_number: row.chapter_version_number,
			created: row.chapter_version_create_date,
			appversion:
				row.chapter_version_appversion === '11.0' ? 'CC 2015' : 'CC 2017',
		}
	})

	return result
}

const getChapter = async (chapterId, versions) => {
	const client = await pool.connect()
	const chapter = await client.query(CHAPTER_INFO, [chapterId])
	await client.release()

	const result = chapter.rows.map(row => {
		return {
			company: row.company_name,
			project: row.project_name,
			chapter: row.chapter_name,
			versions,
		}
	})[0]

	return result
}

const getJsonResponse = async (req, res) => {
	const { chapterId } = req.params

	let versions
	let jsonResponse

	try {
		versions = await getVersions(chapterId)
		jsonResponse = await getChapter(chapterId, versions)
	} catch (err) {
		res.status(400).json({ error: 'param must be an integer' })
	}

	res.json(jsonResponse)
}

module.exports = {
	getJsonResponse,
}
