from lib.core import MovieRentGroup, Receipt


class PlainTextReceipt(Receipt):

    def generate(self, user, rent_group: MovieRentGroup) -> str:
        movie_group = format(lambda t: f"- {t[0]} {t[1]}\n", rent_group)

        return f'Rental Record for {user}\n' \
               f'{"".join(movie_group)}\n' \
               f'You owed {rent_group.total_price()}\n' \
               f'You earned {rent_group.rent_points()} frequent renter points'


class HtmlReceipt(Receipt):

    def generate(self, user, rent_group: MovieRentGroup) -> str:
        movie_group = format(lambda t: f"<li>{t[0]} {t[1]}</li>\n", rent_group)

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


def format(func, rent_group: MovieRentGroup):
    return list(map(func, rent_group.price_per_movie()))
