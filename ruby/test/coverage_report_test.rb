require "minitest/autorun"
require_relative "../devops/coverage_report"

class CoverageReportTest < Minitest::Test
  def test_formats_per_file_and_total_line_coverage
    results = {
      "/project/lib/b.rb" => [nil, 0],
      "/project/lib/a.rb" => [1, 0, nil, 2]
    }

    report = CoverageReport.format(results, source_root: "/project/lib")

    assert_equal(
      "Coverage report:\n" \
      "  lib/a.rb: 2/3 lines (66.7%)\n" \
      "  lib/b.rb: 0/1 lines (0.0%)\n" \
      "Total: 2/4 lines (50.0%)\n",
      report
    )
  end

  def test_excludes_files_outside_the_application_source_directory
    results = {
      "/project/lib/movie.rb" => [1, 0],
      "/project/test/movie_test.rb" => [1, 1]
    }

    report = CoverageReport.format(results, source_root: "/project/lib")

    assert_equal(
      "Coverage report:\n" \
      "  lib/movie.rb: 1/2 lines (50.0%)\n" \
      "Total: 1/2 lines (50.0%)\n",
      report
    )
  end
end
