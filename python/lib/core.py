from decimal import *


class Movie:

    def __init__(
            self, rent_price, max_rent_days,
            additional_cost_per_day
    ):
        self.rent_price = rent_price
        self.max_rent_days = max_rent_days
        self.additional_cost_per_day = additional_cost_per_day

    def price(self, how_many_days: int) -> Decimal:
        return Decimal(self.rent_price).__add__(self.__additional_cost_for(how_many_days))

    def __additional_cost_for(self, how_many_days):
        additional_cost = Decimal(0.0)
        if how_many_days > self.max_rent_days:
            additional_days = how_many_days - self.max_rent_days
            additional_cost = Decimal(self.additional_cost_per_day).__mul__(Decimal(additional_days))
        return additional_cost


class Rent:

    def __init__(self, how_many_days: int, m: Movie):
        self._how_many_days = how_many_days
        self._movie = m

    def price_for(self) -> Decimal:
        return self._movie.price(self._how_many_days)


class RentGroup:

    def __init__(self, *rents):
        self.rents = rents

    def total_price(self) -> Decimal:
        return sum(map(lambda r: r.price_for(), self.rents))


def regular_movie() -> Movie:
    return Movie(
        rent_price=2.0,
        max_rent_days=2,
        additional_cost_per_day=1.5
    )


def base_movie() -> Movie:
    return Movie(
        rent_price=3.0,
        max_rent_days=1,
        additional_cost_per_day=3.0
    )


def children_movie() -> Movie:
    return Movie(
        rent_price=1.5,
        max_rent_days=3,
        additional_cost_per_day=1.5
    )
