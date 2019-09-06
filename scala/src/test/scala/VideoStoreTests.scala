import org.scalatest.{FlatSpec, Inside, Matchers}

class VideoStoreTests extends FlatSpec with Matchers with Inside {

  trait Movie

  case class NewReleaseMovie(title: String, price: String = "3.0") extends Movie

  case class User(name: String)

  def receiptFor(u: User, m: NewReleaseMovie, days: Int)(implicit priceFun: Movie => String): String = {

    val newPrice = priceFun(m).toDouble * days
    "Rental Record for " + u.name + "\n" +
      "- " + m.title + " " + newPrice +
      "You owed " + newPrice + "\n" +
      "You earned 0 frequent renter points"
  }


  it should "cost 6.0 EUR rent a new release movie for two day" in {

    implicit val priceFor: Movie => String = {
      case NewReleaseMovie(_, price) => price
    }

    val actualReceipt = receiptFor(User("A_USER"), NewReleaseMovie("TITLE"), 2)

    actualReceipt shouldBe
      "Rental Record for A_USER\n" +
        "- TITLE 6.0" +
        "You owed 6.0\n" +
        "You earned 0 frequent renter points"
  }
}
