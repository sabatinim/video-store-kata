import org.scalatest.{FlatSpec, Inside, Matchers}

class VideoStoreTests extends FlatSpec with Matchers with Inside {

  case class NewReleaseMovie(title: String, price: String = "3.0")

  case class User(name: String)

  def receiptFor(u: User, m: NewReleaseMovie, days: Int): String = {

    val newPrice = m.price.toDouble * days
    "Rental Record for " + u.name + "\n" +
      "- " + m.title + " " + newPrice +
      "You owed " + newPrice + "\n" +
      "You earned 0 frequent renter points"

  }

  it should "cost 3 EUR rent a new release movie for one day" in {

    val actualReceipt = receiptFor(User("A_USER"), NewReleaseMovie("TITLE"),1)

    actualReceipt shouldBe
      "Rental Record for A_USER\n" +
        "- TITLE 3.0" +
        "You owed 3.0\n" +
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


}
