import unittest

from lib.core import Rent, regular_movie, base_movie


class MovieTests(unittest.TestCase):

    def test_rent_regular_movie(self):
        self.__assert_movie({
            1: 2.0, 2: 2.0,
            3: 3.5, 4: 5.0,
            5: 6.5, 6: 8.0
        }, regular_movie())

    def test_rent_base_movie(self):
        self.__assert_movie({
            1: 3.0, 2: 6.0,
            3: 9.0, 4: 12.0,
            5: 15.0, 6: 18.0
        }, base_movie())

    def __assert_movie(self, expected, movie):
        for k, v in expected.items():
            p = Rent(k, movie).price_for()
            assert (p == v)
