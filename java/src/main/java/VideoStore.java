import java.util.List;

public class VideoStore
{
  private final String customer;

  public VideoStore(String customer)
  {
    this.customer = customer;
  }


  public String receiptFor(NewRelease movie, int days)
  {
    return "Rental Record for " + customer + "\n" +
        "- " + movie.title() + " " + movie.price(days) + "\n" +
        "Total " + movie.price(days);
  }

  public String receiptForMovies(List<Rental> rentals)
  {

    Rental firstRental = rentals.get(0);

    return "Rental Record for " + customer + "\n" +

        "- " + firstRental.getMovie.title() + " " +firstRental.getMovie().price(days) + "\n" +

        "Total " + firstRental.getMovie().price(firstRental.getDays());;
  }
}
