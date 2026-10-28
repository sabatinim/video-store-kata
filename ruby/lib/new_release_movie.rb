require_relative "movie_pricing"

class NewReleaseMovie
  def initialize
    @pricing = MoviePricing.new(
      base_price: 0.0,
      included_days: 0,
      additional_cost_per_day: 3.0
    )
  end

  def price_for(rental_days)
    @pricing.price_for(rental_days)
  end
end
