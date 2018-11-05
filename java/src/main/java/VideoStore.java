public class VideoStore
{
  private final String customer;

  public VideoStore(String customer)
  {
    this.customer = customer;
  }


  public String receiptForDays(NewRelease movie, int days)
  {
    return "Rental Record for " + customer + "\n" +
        "- " + movie.title() + " " + movie.price(days) + "\n" +
        "Total " + movie.price(days);
  }
}
