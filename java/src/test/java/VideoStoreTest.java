import org.junit.Test;

import static java.util.Arrays.asList;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class VideoStoreTest
{
  @Test
  public void receiptForANewReleaseMovieRentForOneDay()
  {
    String result = new VideoStore("Fred")
        .receiptFor(new NewRelease("The game of thrones"), 1);

    assertThat(result, is("Rental Record for Fred\n" +
                              "- The game of thrones 3.0\n" +
                              "Total 3.0"));
  }

  @Test
  public void receiptforANewReleaseMOvieForFiveDays()
  {
    String result = new VideoStore("Fred")
        .receiptFor(new NewRelease("The game of thrones"), 5);

    assertThat(result, is("Rental Record for Fred\n" +
                              "- The game of thrones 15.0\n" +
                              "Total 15.0"));
  }

  @Test
  public void twoNewReleaseMoviesForOneDay()
  {
    String result = new VideoStore("Fred")
        .receiptForMovies(
            asList(
            new Rental(new NewRelease("A_NEW_RELEASE_MOVIE"), 1),
            new Rental(new NewRelease("ANOTHER_NEW_RELEASE_MOVIE"), 1))
        );

    assertThat(result, is("Rental Record for Fred\n" +
                              "- A_NEW_RELEASE_MOVIE 3.0\n" +
                              "- ANOTHER_NEW_RELEASE_MOVIE 3.0\n" +
                              "Total 6.0"));
  }
}
