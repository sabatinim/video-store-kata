public class Rental
{
  private final NewReleaseMovie movie;
  private final int days;

  public Rental(NewReleaseMovie movie, int days)
  {
    this.movie = movie;
    this.days = days;
  }

  public NewReleaseMovie getMovie()
  {
    return movie;
  }

  public int getDays()
  {
    return days;
  }

}
