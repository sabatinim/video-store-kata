class MoviePolicy
  def initialize(
    base_price:,
    included_days:,
    additional_cost_per_day:,
    bonus_renter_points_after: nil
  )
    @base_price = base_price
    @included_days = included_days
    @additional_cost_per_day = additional_cost_per_day
    @bonus_renter_points_after = bonus_renter_points_after
  end

  def price_for(rental_days)
    additional_days = [rental_days - @included_days, 0].max
    @base_price + additional_days * @additional_cost_per_day
  end

  def frequent_renter_points_for(rental_days)
    bonus_point = @bonus_renter_points_after && rental_days > @bonus_renter_points_after ? 1 : 0
    1 + bonus_point
  end
end
