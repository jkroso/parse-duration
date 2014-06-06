
serve: node_modules
	@node_modules/serve/bin/serve -Slojp 0

test: node_modules
	@sed "s/'parse-duration'/'.\/'/" < Readme.md | node_modules/jsmd/bin/jsmd

node_modules: package.json
	@packin install --meta $< --folder $@

.PHONY: serve test
