import unittest

from lib.core import RentGroup, Rent, children_movie, base_movie, regular_movie
from lib.receipt import PlainTextReceipt


class MovieTests(unittest.TestCase):

    def test_xx(self):
        actual = PlainTextReceipt(
            "Fred",
            RentGroup(
                Rent(1, base_movie("The game of thrones")),
                Rent(1, children_movie("Cinderella")),
                Rent(1, regular_movie("Mr. Robot")),
                Rent(3, regular_movie("The Hobbit"))
            )
        ).generate()

        expected = 'Rental Record for Fred\n' \
                   '- The game of thrones 3\n' \
                   '- Cinderella 1.5\n' \
                   '- Mr. Robot 2\n' \
                   '- The Hobbit 3.5\n\n' \
                   'You owed 10.0\n' \
                   'You earned 4 frequent renter points'

        self.assertEqual(actual, expected)
