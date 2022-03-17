import unittest

from lib.core import MovieRentGroup, MovieRent, children_movie, base_movie, regular_movie, VideoStore
from lib.receipt import PlainTextReceipt, HtmlReceipt, Receipt


class InMemoryDisplay:

    def __init__(self, *receipt_group: Receipt):
        self.storage = []
        self._receipt_group = receipt_group

    def print(self, user, rent_group: MovieRentGroup):
        for r in self._receipt_group:
            self.storage.append(r.generate(user, rent_group))


class MovieTests(unittest.TestCase):

    def test_acceptance(self):
        display = InMemoryDisplay(PlainTextReceipt(), HtmlReceipt())

        VideoStore(display) \
            .add(MovieRent(1, base_movie("The game of thrones"))) \
            .add(MovieRent(1, children_movie("Cinderella"))) \
            .add(MovieRent(1, regular_movie("Mr. Robot"))) \
            .add(MovieRent(3, regular_movie("The Hobbit"))) \
            .print_receipt("Fred")

        expected_plain_text = 'Rental Record for Fred\n' \
                              '- The game of thrones 3\n' \
                              '- Cinderella 1.5\n' \
                              '- Mr. Robot 2\n' \
                              '- The Hobbit 3.5\n\n' \
                              'You owed 10.0\n' \
                              'You earned 4 frequent renter points'

        expected_html = '<!DOCTYPE html>\n' \
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

        self.assertEqual(display.storage, [expected_plain_text, expected_html])
