
serve: node_modules
	@node_modules/serve/bin/serve -Slojp 0

test: node_modules
	@sed "s/'parse-duration'/'.\/'/" < Readme.md | node_modules/jsmd/bin/jsmd --debug

node_modules: *.json
	@packin install -Re \
		--meta deps.json,package.json,component.json \
		--folder node_modules

.PHONY: serve test
