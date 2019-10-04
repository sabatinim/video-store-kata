import org.scalatest.{FlatSpec, Inside, Matchers}

class VideoStoreTests extends FlatSpec with Matchers with Inside {

  trait Movie

  case class NewReleaseMovie(title: String, price: String = "3.0") extends Movie

  case class RegularMovie(title: String, price: String = "2.0") extends Movie

  case class User(name: String)

  def receiptFor(u: User, m: Movie, days: Int): String = {

    val titleFor = (m: Movie) => {
      m match {
        case NewReleaseMovie(title, _) => title
        case RegularMovie(title, _) => title
      }
    }

    val priceFor = (m: Movie, days: Int) => {
      m match {
        case NewReleaseMovie(_, price) => price.toDouble * days
        case RegularMovie(_, price) => price.toDouble * days
      }
    }

    val newPrice: Double = priceFor(m, days)

    "Rental Record for " + u.name + "\n" +
      "- " + titleFor(m) + " " + newPrice +
      "You owed " + newPrice + "\n" +
      "You earned 0 frequent renter points"
  }


  it should "cost 6.0 EUR rent a new release movie for two day" in {

    val actualReceipt = receiptFor(User("A_USER"), NewReleaseMovie("TITLE"), 2)

    actualReceipt shouldBe
      "Rental Record for A_USER\n" +
        "- TITLE 6.0" +
        "You owed 6.0\n" +
        "You earned 0 frequent renter points"
  }

  it should "cost 2.0 EUR rent a regular movie for one day" in {

    val actualReceipt = receiptFor(User("A_USER"), RegularMovie("TITLE"), 1)

    actualReceipt shouldBe
      "Rental Record for A_USER\n" +
        "- TITLE 2.0" +
        "You owed 2.0\n" +
        "You earned 0 frequent renter points"
  }
}
