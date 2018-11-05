public class Rental
{
  private final NewRelease movie;
  private final int days;

  public Rental(NewRelease movie, int days)
  {
    this.movie = movie;
    this.days = days;
  }
}
