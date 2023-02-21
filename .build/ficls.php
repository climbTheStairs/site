<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>List of media</title>
	<style>:root {
	--table-border: 1px solid black;
	--table-cell-padding-block: 0px;
	--table-cell-padding-inline: 8px;
	--table-thead-bg: #0e0;
}
tbody > tr:nth-child(even) {
	background: #eee;
}</style>
	<link rel="stylesheet" href="/css/sortable.css" />
</head>
<body>
	<table>
		<thead>
			<tr>
				<th class="sortable" scope="col">Title</th>
				<th class="sortable" scope="col">Format</th>
				<th class="sortable sort-num" scope="col">Rating</th>
				<th class="sortable sort-num" scope="col">Status</th>
			</tr>
		</thead>
		<tbody>
<?php require 'tbody.php'; ?>
		</tbody>
	</table>
	<script src="/js/stairz.js"></script>
	<script src="/js/sortable.js"></script>
	<script>;(() => {
"use strict"
const { $$, sortByCol } = stairz
const a$th = $$("th")
sortByCol.bind(a$th.find($th => $th.textContent === "Title"))()
sortByCol.bind(a$th.find($th => $th.textContent === "Format"))()
sortByCol.bind(a$th.find($th => $th.textContent === "Status"))()
})();</script>
</body>
</html>
