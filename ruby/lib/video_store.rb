require_relative "movie_factory"
require_relative "movie_rental"
require_relative "rental_statement"

class VideoStore
  def initialize(customer_name)
    @customer_name = customer_name
    @rentals = []
  end

  def add_rental(title:, movie_type:, rental_days:)
    movie = MovieFactory.create(movie_type)
    @rentals << MovieRental.new(title, movie, rental_days)
  end

  def generate_statement
    RentalStatement.new(@customer_name, @rentals).generate
  end
end
