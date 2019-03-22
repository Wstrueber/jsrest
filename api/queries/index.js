module.exports = {
	CHAPTER_INFO: `select chapter_name, 
								project_name, 
								company_name
                from chapter
								inner join project on chapter_id = $1 
								AND project_id = chapter_project_id
								inner join company on company_id = project_company_id`,

	VERSIONS_INFO: `select person_username, 
								chapter_version_id, 
								chapter_version_number, 
								chapter_version_create_date, 
								chapter_version_appversion 
								from chapter_version 
								inner join person on person_id = chapter_version_person_id 
								where chapter_version_chapter_id=$1 
								order by chapter_version_number asc`,
}
