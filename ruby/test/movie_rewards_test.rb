require "minitest/autorun"
require_relative "../lib/regular_movie"
require_relative "../lib/new_release_movie"
require_relative "../lib/children_movie"

class MovieRewardsTest < Minitest::Test
  REWARD_CASES = [
    ["regular", RegularMovie, 1, 1],
    ["regular", RegularMovie, 3, 1],
    ["new_release", NewReleaseMovie, 1, 1],
    ["new_release", NewReleaseMovie, 2, 2],
    ["new_release", NewReleaseMovie, 3, 2],
    ["children", ChildrenMovie, 1, 1],
    ["children", ChildrenMovie, 4, 1]
  ].freeze

  REWARD_CASES.each do |movie_type, movie_class, rental_days, expected_points|
    define_method("test_#{movie_type}_movie_rented_for_#{rental_days}_days") do
      assert_equal expected_points, movie_class.new.frequent_renter_points_for(rental_days)
    end
  end
end
