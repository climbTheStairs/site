// Fork of `js/save_google_sheets.js`
// Make sure you aren't hovering over any tabs and creating popups!
;(() => {
"use strict"

const { $$, createDataResource, dl } = stairz

const saveCalicoTab = (fname = "calico_tab_dl") => {
	const tables = [...$$("table.table")]
	if (tables.length !== 1)
		throw new TypeError("missing or multiple tables")
	const [$table] = tables

	const table = [...$table.$(":scope > tbody").children].map((row) => {
		row = [...row.children].map(cell => cell.innerText.trim())
		return row
	})
	const keys = [...$("table.table > thead > tr").children]
		.map($el => $el.dataset.originalTitle || $el.textContent)
	const data = table.map((row) => {
		const data = {}
		row.forEach((cell, i) => data[keys[i]] = cell)
		return data
	})

	const resource = createDataResource(
		"application/json",
		JSON.stringify(data, null, 4),
	)
	dl(resource, fname)
}

Object.assign(stairz, { saveCalicoTab })
})();
