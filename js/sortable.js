;(() => {
"use strict"

const { $$ } = stairz

const ncmp = (a, b) => {
	if (Number.isNaN(a) && Number.isNaN(b))
		return 0
	if (Number.isNaN(a))
		return -1
	if (Number.isNaN(b))
		return 1
	return a>b ? 1 : a<b ? -1 : 0
}

const genCmp = (process, num, order) => {
	return (a, b) => {
		if (!order)
			[a, b] = [b, a]
		a = process(a)
		b = process(b)
		if (num)
			return ncmp(parseFloat(a), parseFloat(b))
		return a.localeCompare(b)
	}
}

const sortByCol = function() {
	const $tbody = this.closest("table").tBodies[0]
	const coli = Array.prototype.indexOf.call(this.parentNode.children, this)
	const process = ($tr) => $tr.children[coli].textContent
	const num = this.classList.contains("sort-num")
	const order = this.classList.contains("sort-asc")
	if (order) {
		this.classList.remove("sort-asc")
		this.classList.add("sort-desc")
	} else {
		this.classList.remove("sort-desc")
		this.classList.add("sort-asc")
	}
	;[...$tbody.rows]
		.sort(genCmp(process, num, !order))
		.forEach($tr => $tbody.append($tr))
}

for (const $th of $$(`th.sortable[scope="col"]`))
	$th.addEventListener("click", sortByCol)

Object.assign(stairz, { sortByCol })
})();
