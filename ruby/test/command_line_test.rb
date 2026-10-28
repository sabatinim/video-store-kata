require "minitest/autorun"
require "open3"
require "rbconfig"

class CommandLineTest < Minitest::Test
  MAIN_PATH = File.expand_path("../main.rb", __dir__)

  def test_help_includes_an_example_command
    stdout, stderr, status = Open3.capture3(RbConfig.ruby, MAIN_PATH, "--help")

    assert status.success?, stderr
    assert_includes stdout, "Example:"
    assert_includes stdout, '--customer Fred --rental "The Hobbit,regular,3"'
    assert_includes stdout, "--format html"
  end

  def test_prints_plain_text_statement_for_command_line_rentals
    stdout, stderr, status = Open3.capture3(
      RbConfig.ruby, MAIN_PATH,
      "--customer", "Fred",
      "--rental", "The Hobbit,regular,3"
    )

    assert status.success?, stderr
    assert_equal(
      "Rental Record for Fred\n" \
      "- The Hobbit 3.5\n\n" \
      "You owed 3.5\n" \
      "You earned 1 frequent renter points\n",
      stdout
    )
  end

  def test_prints_html_when_requested
    stdout, stderr, status = Open3.capture3(
      RbConfig.ruby, MAIN_PATH,
      "--customer", "Fred",
      "--rental", "Cinderella,children,2",
      "--format", "html"
    )

    assert status.success?, stderr
    assert_includes stdout, "<title>Video store - statement for Fred</title>"
    assert_includes stdout, "<li>Cinderella 1.5</li>"
    assert_includes stdout, "<br>You owed 1.5"
    assert_includes stdout, "<br>You earned 1 frequent renter points"
  end

  def test_reports_invalid_movie_types_as_command_line_errors
    stdout, stderr, status = Open3.capture3(
      RbConfig.ruby, MAIN_PATH,
      "--customer", "Fred",
      "--rental", "Unknown,invalid,1"
    )

    refute status.success?
    assert_empty stdout
    assert_includes stderr, "Unknown movie type: invalid"
  end
end
