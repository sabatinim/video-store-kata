import unittest

from lib.core import Rent, regular_movie, base_movie, children_movie, RentGroup


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

    def test_rent_children_movie(self):
        self.__assert_movie({
            1: 1.5, 2: 1.5,
            3: 1.5, 4: 3.0,
            5: 4.5, 6: 6.0
        }, children_movie())

    def test_rent_multiple_type(self):
        total = RentGroup(
            Rent(4, children_movie()),
            Rent(4, base_movie()),
            Rent(4, regular_movie())
        ).total_price()
        assert (total == 20.0)

    def __assert_movie(self, expected, movie):
        for k, v in expected.items():
            p = Rent(k, movie).price_for()
            assert (p == v)
