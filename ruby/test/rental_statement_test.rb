require "minitest/autorun"
require_relative "../lib/children_movie"
require_relative "../lib/new_release_movie"
require_relative "../lib/regular_movie"
require_relative "../lib/movie_rental"
require_relative "../lib/rental_statement"

class RentalStatementTest < Minitest::Test
  def test_generates_the_customer_statement_with_prices_total_and_renter_points
    rentals = [
      MovieRental.new("The game of thrones", NewReleaseMovie.new, 1),
      MovieRental.new("Cinderella", ChildrenMovie.new, 2),
      MovieRental.new("Mr. Robot", RegularMovie.new, 1),
      MovieRental.new("The Hobbit", RegularMovie.new, 3)
    ]

    statement = RentalStatement.new("Fred", rentals)

    assert_equal(
      "Rental Record for Fred\n" \
      "- The game of thrones 3.0\n" \
      "- Cinderella 1.5\n" \
      "- Mr. Robot 2.0\n" \
      "- The Hobbit 3.5\n" \
      "\n" \
      "You owed 10.0\n" \
      "You earned 4 frequent renter points",
      statement.generate
    )
  end
end
