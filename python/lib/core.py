from decimal import *


class Movie:

    def __init__(
            self, rent_price: Decimal, max_rent_days: int, title: str,
            additional_cost_per_day: Decimal, could_additional_renter_point: bool = False
    ):
        self._rent_price = rent_price
        self._max_rent_days = max_rent_days
        self._additional_cost_per_day = additional_cost_per_day
        self.could_additional_renter_point = could_additional_renter_point
        self.title = title

    def price(self, how_many_days: int) -> Decimal:
        return self._rent_price.__add__(self.__additional_cost_for(how_many_days))

    def __additional_cost_for(self, how_many_days):
        additional_cost = Decimal(0.0)
        if how_many_days > self._max_rent_days:
            additional_days = Decimal(how_many_days - self._max_rent_days)
            additional_cost = self._additional_cost_per_day.__mul__(additional_days)
        return additional_cost


class Rent:

    def __init__(self, how_many_days: int, m: Movie):
        self._how_many_days = how_many_days
        self._movie = m

    def title(self):
        return self._movie.title

    def price_for(self) -> Decimal:
        return self._movie.price(self._how_many_days)

    def rent_point_for(self) -> int:
        total_renter_point = 1
        if self._how_many_days > 1 and self._movie.could_additional_renter_point:
            total_renter_point += 1

        return total_renter_point


class RentGroup:

    def __init__(self, *rents):
        self.rents = rents

    def price_per_movie(self):
        return map(lambda r: (r.title(), r.price_for()), self.rents)

    def total_price(self) -> Decimal:
        return sum(map(lambda r: r.price_for(), self.rents))

    def rent_points(self) -> int:
        return sum(map(lambda r: r.rent_point_for(), self.rents))


class VideoStore:
    def __init__(self, display):
        self._display = display
        self._rents = []

    def add(self, r: Rent):
        self._rents.append(r)
        return self

    def print_receipt(self, user: str):
        self._display.print(user, RentGroup(*self._rents))


def regular_movie(title: str = "") -> Movie:
    return Movie(
        rent_price=Decimal(2.0),
        max_rent_days=2,
        additional_cost_per_day=Decimal(1.5),
        title=title
    )


def base_movie(title="") -> Movie:
    return Movie(
        rent_price=Decimal(3.0),
        max_rent_days=1,
        additional_cost_per_day=Decimal(3.0),
        could_additional_renter_point=True,
        title=title
    )


def children_movie(title: str = "") -> Movie:
    return Movie(
        rent_price=Decimal(1.5),
        max_rent_days=3,
        additional_cost_per_day=Decimal(1.5),
        title=title
    )
