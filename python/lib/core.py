from abc import abstractmethod
from decimal import *


class RentConfiguration:
    def __init__(
            self, title: str,
            rent_price: Decimal,
            max_rent_days: int,
            additional_cost_per_day: Decimal,
            additional_renter_point: int
    ):
        self.rent_price = rent_price
        self.max_rent_days = max_rent_days
        self.additional_cost_per_day = additional_cost_per_day
        self.additional_renter_point = additional_renter_point
        self.title = title


class MovieRent:

    def __init__(self, how_many_days: int, rc: RentConfiguration):
        self._how_many_days = how_many_days
        self._rc = rc

    def title(self):
        return self._rc.title

    def price_for(self) -> Decimal:
        return self._rc.rent_price.__add__(self.__additional_cost_for(self._how_many_days))

    def rent_point_for(self) -> int:
        total_renter_point = 1
        if self._how_many_days > 1:
            total_renter_point += self._rc.additional_renter_point

        return total_renter_point

    def __additional_cost_for(self, how_many_days):
        additional_cost = Decimal(0.0)
        if how_many_days > self._rc.max_rent_days:
            additional_days = Decimal(how_many_days - self._rc.max_rent_days)
            additional_cost = self._rc.additional_cost_per_day.__mul__(additional_days)
        return additional_cost


class MovieRentGroup:

    def __init__(self, *movie_rent_list):
        self.movie_rent_list = movie_rent_list

    def price_per_movie(self):
        return map(lambda movie_rent: (movie_rent.title(), movie_rent.price_for()), self.movie_rent_list)

    def total_price(self) -> Decimal:
        return sum(map(lambda r: r.price_for(), self.movie_rent_list))

    def rent_points(self) -> int:
        return sum(map(lambda r: r.rent_point_for(), self.movie_rent_list))


class Receipt:
    @abstractmethod
    def generate(self, user, rent_group: MovieRentGroup) -> str:
        pass


class VideoStore:
    def __init__(self, display):
        self._display = display
        self._movie_rent_list = []

    def add(self, mr: MovieRent):
        self._movie_rent_list.append(mr)
        return self

    def print_receipt(self, user: str):
        self._display.print(user, MovieRentGroup(*self._movie_rent_list))


def regular_movie(title: str = "") -> RentConfiguration:
    return RentConfiguration(
        rent_price=Decimal(2.0),
        max_rent_days=2,
        additional_cost_per_day=Decimal(1.5),
        additional_renter_point=0,
        title=title
    )


def base_movie(title="") -> RentConfiguration:
    return RentConfiguration(
        rent_price=Decimal(3.0),
        max_rent_days=1,
        additional_cost_per_day=Decimal(3.0),
        additional_renter_point=1,
        title=title
    )


def children_movie(title: str = "") -> RentConfiguration:
    return RentConfiguration(
        rent_price=Decimal(1.5),
        max_rent_days=3,
        additional_cost_per_day=Decimal(1.5),
        additional_renter_point=0,
        title=title
    )
