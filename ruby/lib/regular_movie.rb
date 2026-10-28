require_relative "movie_policy"

class RegularMovie
  def initialize
    @policy = MoviePolicy.new(
      base_price: 2.0,
      included_days: 2,
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
