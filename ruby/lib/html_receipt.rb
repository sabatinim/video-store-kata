require "cgi"

class HtmlReceipt
  def generate(statement)
    movie_lines = statement.rentals.map do |rental|
      "      <li>#{escape_html(rental.title)} #{rental.price}</li>"
    end.join("\n")

    "<!DOCTYPE html>\n" \
      "<html>\n" \
      "  <head>\n" \
      "    <title>Video store - statement for #{escape_html(statement.customer_name)}</title>\n" \
      "  </head>\n" \
      "  <body>\n" \
      "    <h1>Rental Record for #{escape_html(statement.customer_name)}</h1>\n" \
      "    <ul>\n" \
      "#{movie_lines}\n" \
      "    </ul>\n" \
      "    <br>You owed #{statement.total_price}\n" \
      "    <br>You earned #{statement.frequent_renter_points} frequent renter points\n" \
      "  </body>\n" \
      "</html>\n"
  end

  private

  def escape_html(value)
    CGI.escapeHTML(value)
  end
end
