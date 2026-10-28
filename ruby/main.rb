require "optparse"
require_relative "lib/html_receipt"
require_relative "lib/plain_text_receipt"
require_relative "lib/video_store"

class VideoStoreCLI
  def self.run(arguments, stdout: $stdout, stderr: $stderr)
    options = { rentals: [], format: "text" }
    parser = OptionParser.new do |opts|
      opts.banner = <<~USAGE
        Usage: ruby main.rb --customer NAME [--rental TITLE,TYPE,DAYS ...] [--format text|html]

        Example:
          ruby main.rb --customer Fred --rental "The Hobbit,regular,3"
          ruby main.rb --customer Fred --rental "Cinderella,children,2" --format html

      USAGE
      opts.on("--customer NAME", "Customer name") { |name| options[:customer] = name }
      opts.on("--rental RENTAL", "Rental as TITLE,TYPE,DAYS (repeatable)") do |rental|
        options[:rentals] << rental
      end
      opts.on("--format FORMAT", %w[text html], "Receipt format (default: text)") do |format|
        options[:format] = format
      end
    end

    parser.parse!(arguments)
    raise OptionParser::ParseError, "Unexpected arguments: #{arguments.join(' ')}" unless arguments.empty?
    raise OptionParser::MissingArgument, "--customer" unless options[:customer]

    receipt_generator = options[:format] == "html" ? HtmlReceipt.new : PlainTextReceipt.new
    store = VideoStore.new(options[:customer], receipt_generator: receipt_generator)

    options[:rentals].each do |rental|
      title, movie_type, rental_days = rental.split(",", 3)
      unless title && !title.empty? && movie_type && !movie_type.empty? &&
             rental_days && rental_days.match?(/\A[1-9]\d*\z/)
        raise ArgumentError, "Invalid rental '#{rental}'; expected TITLE,TYPE,positive DAYS"
      end

      store.add_rental(title: title, movie_type: movie_type, rental_days: Integer(rental_days, 10))
    end

    stdout.puts store.generate_statement
    0
  rescue OptionParser::ParseError, ArgumentError => error
    stderr.puts "Error: #{error.message}"
    stderr.puts parser
    1
  end
end

exit VideoStoreCLI.run(ARGV) if $PROGRAM_NAME == __FILE__
