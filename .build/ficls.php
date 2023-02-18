<?php declare(strict_types=1);?>
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
	<link rel="stylesheet" href="https://climbthestairs.org/css/sortable.css" />
</head>
<body>
	<table>
		<thead>
			<tr>
				<th class="sortable" scope="col">Title</th>
				<th class="sortable" scope="col">Format</th>
				<th class="sortable sort-num" scope="col">Rating</th>
				<th class="sortable" scope="col">Status</th>
			</tr>
		</thead>
		<tbody>
<?php
if (!($head = fgets(STDIN))) {
	fwrite(STDERR, "head missing\n");
	exit(1);
}
$head = explode("\t", rtrim($head, "\n"));
if (count($head) !== 4) {
	fwrite(STDERR, "head does not contain 4 fields\n");
	exit(1);
}
while ($ln = fgets(STDIN)) {
	$ln = explode("\t", rtrim($ln, "\n"));
	if (count($ln) !== 4) {
		fwrite(STDERR, "line does not contain 4 fields\n");
		exit(1);
	}
	echo "			<tr>
				<td>$ln[0]</td>
				<td>$ln[1]</td>
				<td>$ln[2]</td>
				<td>$ln[3]</td>
			</tr>
";
}
?>
		</tbody>
	</table>
	<script src="https://climbthestairs.org/js/sortable.js"></script>
	<script>;(() => {
"use strict"
const $$ = (sel) => [...document.querySelectorAll(sel)]
const a$th = $$("th")
a$th.find($th => $th.textContent == "Title").click()
a$th.find($th => $th.textContent == "Format").click()
a$th.find($th => $th.textContent == "Status").click()
a$th.find($th => $th.textContent == "Status").click()
})();</script>
</body>
</html>
