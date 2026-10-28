require "minitest/autorun"
require_relative "../lib/video_store"

class VideoStoreTest < Minitest::Test
  def test_adds_movie_rentals_and_generates_customer_statement
    store = VideoStore.new("Fred")
    store.add_rental(title: "The game of thrones", movie_type: :new_release, rental_days: 1)
    store.add_rental(title: "Cinderella", movie_type: :children, rental_days: 2)
    store.add_rental(title: "Mr. Robot", movie_type: :regular, rental_days: 1)
    store.add_rental(title: "The Hobbit", movie_type: :regular, rental_days: 3)

    assert_equal(
      "Rental Record for Fred\n" \
      "- The game of thrones 3.0\n" \
      "- Cinderella 1.5\n" \
      "- Mr. Robot 2.0\n" \
      "- The Hobbit 3.5\n" \
      "\n" \
      "You owed 10.0\n" \
      "You earned 4 frequent renter points",
      store.generate_statement
    )
  end

  def test_rejects_an_unknown_movie_type
    store = VideoStore.new("Fred")

    error = assert_raises(ArgumentError) do
      store.add_rental(title: "Unknown", movie_type: :unknown, rental_days: 1)
    end

    assert_equal "Unknown movie type: unknown", error.message
  end
end
