public class NewReleaseMovie
{
  private String title;

  public NewReleaseMovie(String title)
  {
    this.title = title;
  }

  public String getTitle()
  {
    return title;
  }

  public double priceFor(int days)
  {
    double base_price = 3.0;
    return base_price * days;
  }
}
