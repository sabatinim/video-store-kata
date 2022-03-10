import unittest

from lib.core import MovieRentGroup, MovieRent, children_movie, base_movie, regular_movie, VideoStore
from lib.receipt import PlainTextReceipt, HtmlReceipt


class InMemoryDisplay:

    def __init__(self, receipt):
        self.storage = ""
        self._receipt = receipt

    def print(self, user, rent_group: MovieRentGroup):
        self.storage = self._receipt().generate(user, rent_group)


class MovieTests(unittest.TestCase):

    def test_plaint_text_receipt(self):
        display = InMemoryDisplay(PlainTextReceipt)

        VideoStore(display) \
            .add(MovieRent(1, base_movie("The game of thrones"))) \
            .add(MovieRent(1, children_movie("Cinderella"))) \
            .add(MovieRent(1, regular_movie("Mr. Robot"))) \
            .add(MovieRent(3, regular_movie("The Hobbit"))) \
            .print_receipt("Fred")

        expected = 'Rental Record for Fred\n' \
                   '- The game of thrones 3\n' \
                   '- Cinderella 1.5\n' \
                   '- Mr. Robot 2\n' \
                   '- The Hobbit 3.5\n\n' \
                   'You owed 10.0\n' \
                   'You earned 4 frequent renter points'

        self.assertEqual(display.storage, expected)

    def test_html_text_receipt(self):
        display = InMemoryDisplay(HtmlReceipt)

        VideoStore(display) \
            .add(MovieRent(1, base_movie("The game of thrones"))) \
            .add(MovieRent(1, children_movie("Cinderella"))) \
            .add(MovieRent(1, regular_movie("Mr. Robot"))) \
            .add(MovieRent(3, regular_movie("The Hobbit"))) \
            .print_receipt("Fred")

        expected = '<!DOCTYPE html>\n' \
                   '<html>\n' \
                   '<head>\n' \
                   '<title>Video store - statement for Fred</title>\n' \
                   '</head>\n' \
                   '<body>\n' \
                   '<h1>Rental Record for Fred</h1>\n' \
                   '<ul>\n' \
                   '<li>The game of thrones 3</li>\n' \
                   '<li>Cinderella 1.5</li>\n' \
                   '<li>Mr. Robot 2</li>\n' \
                   '<li>The Hobbit 3.5</li>\n' \
                   '</ul>\n' \
                   '<br>You owed 10.0<br>You earned 4 frequent renter points\n' \
                   '</body>\n' \
                   '</html>\n'

        self.assertEqual(display.storage, expected)
