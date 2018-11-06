public class VideoStore
{
  private final Customer customer;

  public VideoStore(Customer customer)
  {
    this.customer = customer;
  }

  public String receiptFor(NewReleaseMovie movie)
  {
    return "Rental Record for " + customer.getName() + "\n" +
        "- " + movie.getTitle() + " " + movie.price() + "\n" +
        "Total " + movie.price();
  }

  public String receiptFor(NewReleaseMovie newreleasemovie, int days)
  {
    double totalPrice = newreleasemovie.price() * days;
    return "Rental Record for " + customer.getName() + "\n" +
        "- newreleasemovie " + totalPrice + "\n" +
        "Total " + totalPrice;
  }
}
