require "minitest/autorun"
require_relative "../lib/html_receipt"
require_relative "../lib/video_store"

class VideoStoreTest < Minitest::Test
  class CustomReceiptGenerator
    def generate(statement)
      "#{statement.customer_name}: #{statement.total_price}"
    end
  end

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

  def test_generates_an_html_receipt
    store = VideoStore.new("Fred", receipt_generator: HtmlReceipt.new)
    store.add_rental(title: "The game of thrones", movie_type: :new_release, rental_days: 1)
    store.add_rental(title: "Cinderella", movie_type: :children, rental_days: 2)
    store.add_rental(title: "Mr. Robot", movie_type: :regular, rental_days: 1)
    store.add_rental(title: "The Hobbit", movie_type: :regular, rental_days: 3)

    assert_equal(
      "<!DOCTYPE html>\n" \
      "<html>\n" \
      "  <head>\n" \
      "    <title>Video store - statement for Fred</title>\n" \
      "  </head>\n" \
      "  <body>\n" \
      "    <h1>Rental Record for Fred</h1>\n" \
      "    <ul>\n" \
      "      <li>The game of thrones 3.0</li>\n" \
      "      <li>Cinderella 1.5</li>\n" \
      "      <li>Mr. Robot 2.0</li>\n" \
      "      <li>The Hobbit 3.5</li>\n" \
      "    </ul>\n" \
      "    <br>You owed 10.0\n" \
      "    <br>You earned 4 frequent renter points\n" \
      "  </body>\n" \
      "</html>\n",
      store.generate_statement
    )
  end

  def test_escapes_customer_and_movie_names_in_html
    store = VideoStore.new("<Fred>", receipt_generator: HtmlReceipt.new)
    store.add_rental(title: "<Movie>", movie_type: :regular, rental_days: 1)

    statement = store.generate_statement

    assert_includes statement, "<title>Video store - statement for &lt;Fred&gt;</title>"
    assert_includes statement, "<li>&lt;Movie&gt; 2.0</li>"
  end

  def test_uses_an_injected_receipt_generator
    store = VideoStore.new("Fred", receipt_generator: CustomReceiptGenerator.new)
    store.add_rental(title: "Mr. Robot", movie_type: :regular, rental_days: 1)

    assert_equal "Fred: 2.0", store.generate_statement
  end
end
