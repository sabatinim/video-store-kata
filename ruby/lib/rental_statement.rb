class RentalStatement
  attr_reader :customer_name, :rentals, :total_price, :frequent_renter_points

  def initialize(customer_name, rentals)
    @customer_name = customer_name
    @rentals = rentals
    @total_price = rentals.sum(&:price)
    @frequent_renter_points = rentals.sum(&:frequent_renter_points)
  end
end
