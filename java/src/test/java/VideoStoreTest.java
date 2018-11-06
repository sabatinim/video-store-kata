import org.junit.Assert;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;

public class VideoStoreTest
{
  /**
   * new release movie for one day
   * new release movie for five days ( total )
   * two new release movies for one day
   * two new release movies for fives day
   * ...
   *
   *
   */


  @Test
  public void newReleasemovie()
  {

    String result = new VideoStore(new Customer("Fred"))
        .receiptFor(new NewReleaseMovie("newreleasemovie"));

    Assert.assertThat(result, is(
        "Rental Record for Fred\n" +
            "- newreleasemovie 3.0\n" +
            "Total 3.0"));
  }
}
