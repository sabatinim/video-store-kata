import org.junit.Assert;
import org.junit.Test;

import static java.util.Arrays.asList;
import static org.hamcrest.CoreMatchers.is;

public class VideoStoreTest
{
  /**
   * new release movie for one day
   * new release movie for five days ( total )
   * two new release movies for one day
   * two new release movies for fives day
   * ...
   */


  @Test
  public void newReleasemovie()
  {

    String result = new VideoStore(new Customer("Fred"))
        .receiptFor(
            new NewReleaseMovie("newreleasemovie"), 1);

    Assert.assertThat(result, is(
        "Rental Record for Fred\n" +
            "- newreleasemovie 3.0\n" +
            "Total 3.0"));
  }

  @Test
  public void newReleaseMovieForFiveDays()
  {
    String result = new VideoStore(new Customer("Fred"))
        .receiptFor(new NewReleaseMovie("newreleasemovie"), 5);

    Assert.assertThat(result, is(
        "Rental Record for Fred\n" +
            "- newreleasemovie 15.0\n" +
            "Total 15.0"));
  }

  @Test
  public void twonewReleaseMoviesForOneDay()
  {
    String result = new VideoStore(new Customer("Fred"))
        .receiptFor(

            asList(
            new Rental(new NewReleaseMovie("A_NEW_RELEASE_MOVIE"), 1),
            new Rental(new NewReleaseMovie("ANOTHER_NEW_RELEASE_MOVIE"), 1)
            )

        );
    Assert.assertThat(result, is(

        "Rental Record for Fred\n" +
            "- A_NEW_RELEASE_MOVIE 3.0\n" +
            "- ANOTHER_NEW_RELEASE_MOVIE 3.0\n" +
            "Total 6.0"));
  }
}
