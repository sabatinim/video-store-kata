require "minitest/autorun"
require_relative "../lib/children_movie"
require_relative "../lib/new_release_movie"
require_relative "../lib/regular_movie"
require_relative "../lib/movie_rental"
require_relative "../lib/rental_statement"

class RentalStatementTest < Minitest::Test
  def test_calculates_total_price_and_frequent_renter_points
    rentals = [
      MovieRental.new("The game of thrones", NewReleaseMovie.new, 1),
      MovieRental.new("Cinderella", ChildrenMovie.new, 2),
      MovieRental.new("Mr. Robot", RegularMovie.new, 1),
      MovieRental.new("The Hobbit", RegularMovie.new, 3)
    ]

    statement = RentalStatement.new("Fred", rentals)

    assert_equal "Fred", statement.customer_name
    assert_equal 10.0, statement.total_price
    assert_equal 4, statement.frequent_renter_points
  end
end
