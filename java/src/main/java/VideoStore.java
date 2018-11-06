import java.util.List;
import java.util.stream.Collectors;

public class VideoStore
{
  private final Customer customer;

  public VideoStore(Customer customer)
  {
    this.customer = customer;
  }

  public String receiptFor(NewReleaseMovie movie, int days)
  {
    double totalPrice = movie.priceFor(days);
    return "Rental Record for " + customer.getName() + "\n" +
        "- " + movie.getTitle() + " " + totalPrice + "\n" +
        "Total " + totalPrice;
  }

  public String receiptFor(List<Rental> rentals)
  {
    String moviesReceipt = rentals.stream()
                            .map(this::receiptFor)
                            .collect(Collectors.joining());


    double totalPrice = rentals.stream()
                               .mapToDouble(r->r.getMovie()
                                                .priceFor(r.getDays()))
                               .sum();

    return "Rental Record for " + customer.getName() + "\n" +

        moviesReceipt +

        "Total " + totalPrice;
  }

  private String receiptFor(Rental rental)
  {
    return "- " + rental.getMovie().getTitle() + " " + rental.getMovie().priceFor(rental.getDays()) + "\n";
  }
}
