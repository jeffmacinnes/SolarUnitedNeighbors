github:
	rm -rf docs
	cp -r public docs
	# rm -r ssr
	git add -A
	git commit -m "update github pages"
	git push