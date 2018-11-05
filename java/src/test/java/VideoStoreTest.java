import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class VideoStoreTest
{
  @Test
  public void receiptForANewReleaseMovieRentForOneDay()
  {
    String result = new VideoStore("Fred")
        .receiptForDays(new NewRelease("The game of thrones"), 1);

    assertThat(result, is("Rental Record for Fred\n" +
                              "- The game of thrones 3.0\n" +
                              "Total 3.0"));
  }

  @Test
  public void receiptforANewReleaseMOvieForFiveDays()
  {
    String result = new VideoStore("Fred")
        .receiptForDays(new NewRelease("The game of thrones"),5);

    assertThat(result, is("Rental Record for Fred\n" +
                              "- The game of thrones 15.0\n" +
                              "Total 15.0"));
  }
}
