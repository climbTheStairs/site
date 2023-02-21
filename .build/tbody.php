<?php declare(strict_types=1);

function main() {
	$f = fopen(getenv("HOME") . "/me/ficls.tsv", "r");
	processhead($f);
	processbody($f);
	fclose($f);
}

function processhead($f) {
	if (!($head = fgets($f))) {
		fwrite(STDERR, "head missing\n");
		exit(1);
	}
	$head = explode("\t", rtrim($head, "\n"));
	if (count($head) !== 4) {
		fwrite(STDERR, "head does not contain 4 fields\n");
		exit(1);
	}
}

function processbody($f) {
	$statusmap = array(
		"completed" => "0",
		"in progress" => "1",
		"for later" => "2",
	);
	$i = 0;
	while ($ln = fgets($f)) {
		$i++;
		$ln = explode("\t", rtrim($ln, "\n"));
		if (count($ln) !== 4) {
			fwrite(STDERR, "line does not contain 4 fields\n");
			exit(1);
		}
		[$title, $format, $rating, $status] = $ln;
		$statusnum = $statusmap[$status];
		echo <<< END
			<tr>
				<td>$title</td>
				<td>$format</td>
				<td>$rating</td>
				<td data-sort-val="$statusnum">$status</td>
			</tr>

END;
	}
}

main();

?>
