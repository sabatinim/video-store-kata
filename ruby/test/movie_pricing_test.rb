require "minitest/autorun"
require_relative "../lib/regular_movie"
require_relative "../lib/new_release_movie"
require_relative "../lib/children_movie"

class MoviePricingTest < Minitest::Test
  PRICING_CASES = [
    ["regular", RegularMovie, 1, 2.0],
    ["regular", RegularMovie, 2, 2.0],
    ["regular", RegularMovie, 3, 3.5],
    ["regular", RegularMovie, 4, 5.0],
    ["new_release", NewReleaseMovie, 1, 3.0],
    ["new_release", NewReleaseMovie, 2, 6.0],
    ["new_release", NewReleaseMovie, 3, 9.0],
    ["children", ChildrenMovie, 1, 1.5],
    ["children", ChildrenMovie, 3, 1.5],
    ["children", ChildrenMovie, 4, 3.0],
    ["children", ChildrenMovie, 5, 4.5]
  ].freeze

  PRICING_CASES.each do |movie_type, movie_class, rental_days, expected_price|
    define_method("test_#{movie_type}_movie_rented_for_#{rental_days}_days") do
      assert_equal expected_price, movie_class.new.price_for(rental_days)
    end
  end
end
