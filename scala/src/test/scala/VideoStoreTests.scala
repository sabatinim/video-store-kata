import org.scalatest.{FlatSpec, Inside, Matchers}
import scala.math.BigDecimal

class VideoStoreTests extends FlatSpec with Matchers with Inside {

  case class NewReleaseMovie(price: BigDecimal = BigDecimal(3.0), minRentDays: Int = 1, additionaCostPerDay: BigDecimal = BigDecimal(3.0))

  case class Rental(m: NewReleaseMovie, rentalDays: Int)

  case class MoviePrices(moviePrice: BigDecimal, addidionalCost: BigDecimal)

  def compose[TF, TG,R](f: TF => TG)(g: TG => R): TF => R = x => g(f(x))

  type MoviePricesToBigDecimal = MoviePrices => BigDecimal

  val priceFor: MoviePricesToBigDecimal = mp => mp.moviePrice.+(mp.addidionalCost)

  val additionalCostFor = (r: Rental) => {
    var additionalCost = BigDecimal(0.0)
    if (r.rentalDays > r.m.minRentDays) {
      val additionalDays = r.rentalDays - r.m.minRentDays
      additionalCost = r.m.additionaCostPerDay.*(BigDecimal(additionalDays))
    }
    MoviePrices(r.m.price, additionalCost)
  }

  val calculatePrice: Rental => BigDecimal = compose(additionalCostFor)(priceFor)

  it should "no additional cost" in {
    val price = additionalCostFor(Rental(NewReleaseMovie(), 1))
    price shouldBe MoviePrices(BigDecimal(3.0), BigDecimal(0.0))
  }

  it should "additional cost for more than one day rent" in {
    val price = additionalCostFor(Rental(NewReleaseMovie(), 3))
    price shouldBe MoviePrices(BigDecimal(3.0), BigDecimal(6.0))
  }

    it should "new release movie two day" in {
      val price = calculatePrice(Rental(NewReleaseMovie(),2))
      price shouldBe 6.0
    }

  it should "new release movie three day" in {
    val price = calculatePrice(Rental(NewReleaseMovie(),3))
    price shouldBe 9.0
  }



  it should "compose two function" in {
    val f: String => String = (x: String) => s"f(${x})"
    val g: String => String = (x: String) => s"g(${x})"
    val gfx = g compose f
    gfx("x") shouldBe "g(f(x))"
  }
}
