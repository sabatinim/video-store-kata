from lib.core import RentGroup


class PlainTextReceipt:

    def generate(self, user, rent_group: RentGroup) -> str:
        movie_group = list(map(lambda t: f"- {t[0]} {t[1]}\n", rent_group.price_per_movie()))

        return f'Rental Record for {user}\n' \
               f'{"".join(movie_group)}\n' \
               f'You owed {rent_group.total_price()}\n' \
               f'You earned {rent_group.rent_points()} frequent renter points'


class HtmlReceipt:

    def generate(self, user, rent_group: RentGroup) -> str:
        movie_group = list(map(lambda t: f"<li>{t[0]} {t[1]}</li>\n", rent_group.price_per_movie()))

        expected = '<!DOCTYPE html>\n' \
                   '<html>\n' \
                   '<head>\n' \
                   f'<title>Video store - statement for {user}</title>\n' \
                   '</head>\n' \
                   '<body>\n' \
                   '<h1>Rental Record for Fred</h1>\n' \
                   '<ul>\n' \
                   f'{"".join(movie_group)}' \
                   '</ul>\n' \
                   f'<br>You owed {rent_group.total_price()}<br>You earned {rent_group.rent_points()} frequent renter points\n' \
                   '</body>\n' \
                   '</html>\n'

        return expected
