class MovieRental
  attr_reader :title

  def initialize(title, movie, rental_days)
    @title = title
    @movie = movie
    @rental_days = rental_days
  end

  def price
    @movie.price_for(@rental_days)
  end

  def frequent_renter_points
    @movie.frequent_renter_points_for(@rental_days)
  end
end
