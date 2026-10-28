#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
bundle exec ruby -I lib -e 'Dir.glob("test/**/*_test.rb").sort.each { |file| require File.expand_path(file) }'
