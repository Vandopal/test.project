install:
	npm ci
gendiff -h:
	node bin/gendiff.js -h
gendiff:
	node bin/gendiff.js
publish:
	npm publish --dry-run
lint:
	npx eslint .

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest