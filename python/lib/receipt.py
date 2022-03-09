from lib.core import RentGroup


class PlainTextReceipt:
    def __init__(self, user, rent_group: RentGroup):
        self._user = user
        self._rent_group = rent_group

    def generate(self) -> str:
        movie_group = list(map(lambda t: f"- {t[0]} {t[1]}\n", self._rent_group.price_per_movie()))

        return f'Rental Record for {self._user}\n' \
               f'{"".join(movie_group)}\n' \
               f'You owed {self._rent_group.total_price()}\n' \
               f'You earned {self._rent_group.rent_points()} frequent renter points'