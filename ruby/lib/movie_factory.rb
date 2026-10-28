require_relative "children_movie"
require_relative "new_release_movie"
require_relative "regular_movie"

class MovieFactory
  MOVIE_TYPES = {
    children: ChildrenMovie,
    new_release: NewReleaseMovie,
    regular: RegularMovie
  }.freeze

  def self.create(movie_type)
    type = case movie_type
           when String, Symbol then movie_type.to_sym
           end
    movie_class = MOVIE_TYPES[type]
    raise ArgumentError, "Unknown movie type: #{movie_type}" unless movie_class

    movie_class.new
  end
end
