[![Build Status][build-badge]][build]
[![Maintainability](https://api.codeclimate.com/v1/badges/68d794455d2f7b7e82db/maintainability)](https://codeclimate.com/github/greybutton/project-lvl2-s221/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/68d794455d2f7b7e82db/test_coverage)](https://codeclimate.com/github/greybutton/project-lvl2-s221/test_coverage)

Support: json, yaml, ini

## Install 

CLI: `npm install -g gendiff-greybutton`

Module: `npm install --save gendiff-greybutton`

## Use

CLI: `gendiff-greybutton --help`

Module:

```js
import gendiff from 'gendiff-greybutton';

gendiff(path/to/file/1, path/to/file/2, format);
```

format: 'diff' is default, 'plain', 'json'

### Docker

`docker build -t <image-name:tag> .`

`docker run --rm -it -v "$(PWD)":/code <image-name:tag> command`

### Asciinema

LC_ALL=en_US.UTF-8 asciinema rec/auth

[build-badge]: https://img.shields.io/travis/greybutton/project-lvl2-s221.svg?style=flat-square
[build]: https://travis-ci.org/greybutton/project-lvl2-s221
