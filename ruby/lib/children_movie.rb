require_relative "movie_policy"

class ChildrenMovie
  def initialize
    @policy = MoviePolicy.new(
      base_price: 1.5,
      included_days: 3,
      additional_cost_per_day: 1.5
    )
  end

  def price_for(rental_days)
    @policy.price_for(rental_days)
  end

  def frequent_renter_points_for(rental_days)
    @policy.frequent_renter_points_for(rental_days)
  end
end
