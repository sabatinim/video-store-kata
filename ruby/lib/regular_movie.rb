require_relative "movie_pricing"

class RegularMovie
  def initialize
    @pricing = MoviePricing.new(
      base_price: 2.0,
      included_days: 2,
      additional_cost_per_day: 1.5
    )
  end

  def price_for(rental_days)
    @pricing.price_for(rental_days)
  end
end
