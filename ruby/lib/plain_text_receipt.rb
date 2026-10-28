class PlainTextReceipt
  def generate(statement)
    movie_lines = statement.rentals
      .map { |rental| "- #{rental.title} #{rental.price}" }
      .join("\n")

    "Rental Record for #{statement.customer_name}\n" \
      "#{movie_lines}\n\n" \
      "You owed #{statement.total_price}\n" \
      "You earned #{statement.frequent_renter_points} frequent renter points"
  end
end
