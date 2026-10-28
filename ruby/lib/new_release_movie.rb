require_relative "movie_policy"

class NewReleaseMovie
  def initialize
    @policy = MoviePolicy.new(
      base_price: 0.0,
      included_days: 0,
      additional_cost_per_day: 3.0,
      bonus_renter_points_after: 1
    )
  end

  def price_for(rental_days)
    @policy.price_for(rental_days)
  end

  def frequent_renter_points_for(rental_days)
    @policy.frequent_renter_points_for(rental_days)
  end
end
