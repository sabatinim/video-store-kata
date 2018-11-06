public class VideoStore
{
  private final Customer customer;

  public VideoStore(Customer customer)
  {
    this.customer = customer;
  }

  public String receiptFor(NewReleaseMovie newreleasemovie, int days)
  {
    double totalPrice = newreleasemovie.price() * days;
    return "Rental Record for " + customer.getName() + "\n" +
        "- " + newreleasemovie.getTitle() + " " + totalPrice + "\n" +
        "Total " + totalPrice;
  }
}
