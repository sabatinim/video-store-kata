class MoviePricing
  def initialize(base_price:, included_days:, additional_cost_per_day:)
    @base_price = base_price
    @included_days = included_days
    @additional_cost_per_day = additional_cost_per_day
  end

  def price_for(rental_days)
    additional_days = [rental_days - @included_days, 0].max
    @base_price + additional_days * @additional_cost_per_day
  end
end
