#!/usr/bin/env bash
set -euo pipefail

run_tests() {
  bundle exec ruby -I lib -e 'Dir.glob("test/**/*_test.rb").sort.each { |file| require File.expand_path(file) }'
}

run_main() {
  bundle exec ruby main.rb "$@"
}

run_example() {
  run_main \
    --customer Fred \
    --rental "The game of thrones,new_release,1" \
    --rental "Cinderella,children,2" \
    --rental "Mr. Robot,regular,1" \
    --rental "The Hobbit,regular,3"
}

mode=${1:-all}
if (($# > 0)); then
  shift
fi

case "$mode" in
  test|tests)
    run_tests
    ;;
  main)
    run_main "$@"
    ;;
  all)
    run_tests
    if (($# > 0)); then
      run_main "$@"
    else
      run_example
    fi
    ;;
  *)
    printf 'Usage: %s [test|main|all] [main options...]\n' "$0" >&2
    exit 2
    ;;
esac
