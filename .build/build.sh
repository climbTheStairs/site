#!/bin/sh

rootdir='/srv/climbthestairs.org'
builddir="$rootdir/.build"
medir="$HOME/me"

tsv template "$builddir/ficls.html.template" \
	< "$medir/ficls.tsv" \
	> "$rootdir/ficls/index.html"
#php "$builddir/ficls.php" > "$rootdir/ficls/index.html"

