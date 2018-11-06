public class VideoStore
{
  private final Customer customer;

  public VideoStore(Customer customer)
  {
    this.customer = customer;
  }

  public String receiptFor(NewReleaseMovie movie)
  {
    double price = movie.price();
    return "Rental Record for " + customer.getName() + "\n" +
        "- " + movie.getTitle() + " " + price + "\n" +
        "Total 3.0";
  }
}
