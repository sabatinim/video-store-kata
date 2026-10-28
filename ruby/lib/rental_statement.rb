class RentalStatement
  def initialize(customer_name, rentals)
    @customer_name = customer_name
    @rentals = rentals
  end

  def generate
    movie_lines = @rentals.map { |rental| "- #{rental.title} #{rental.price}" }.join("\n")
    total_price = @rentals.sum(&:price)
    renter_points = @rentals.sum(&:frequent_renter_points)

    "Rental Record for #{@customer_name}\n" \
      "#{movie_lines}\n\n" \
      "You owed #{total_price}\n" \
      "You earned #{renter_points} frequent renter points"
  end
end
