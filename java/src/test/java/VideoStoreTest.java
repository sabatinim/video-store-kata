import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.*;

public class VideoStoreTest
{
  @Test
  public void receiptForANewReleaseMovieRentForOneDay()
  {
    assertThat("result",is("Rental Record for Fred\n" +
                             "- The game of thrones 3.0\n" +
                             "Total 10.0"));
  }
}