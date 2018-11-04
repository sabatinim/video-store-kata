public class VideoStore
{
  private final String customer;

  public VideoStore(String customer)
  {
    this.customer = customer;
  }

  public String receiptFor(NewRelease movie)
  {
    return "Rental Record for " + customer + "\n" +
        "- " + movie.title() + " " + movie.price() + "\n" +
        "Total " + movie.price();
  }

}
