require_relative "movie_pricing"

class ChildrenMovie
  def initialize
    @pricing = MoviePricing.new(
      base_price: 1.5,
      included_days: 3,
      additional_cost_per_day: 1.5
    )
  end

  def price_for(rental_days)
    @pricing.price_for(rental_days)
  end
end
