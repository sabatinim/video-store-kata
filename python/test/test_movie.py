import unittest

from lib.core import MovieRent, regular_movie, base_movie, children_movie, MovieRentGroup


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
        total = MovieRentGroup(
            MovieRent(4, children_movie()),
            MovieRent(4, base_movie()),
            MovieRent(4, regular_movie())
        ).total_price()
        assert (total == 20.0)

    def test_renter_point(self):
        actual = MovieRentGroup(MovieRent(1, children_movie())).rent_points()
        assert (actual == 1)

    def test_renter_point_new_release(self):
        actual = MovieRentGroup(MovieRent(3, base_movie())).rent_points()
        assert (actual == 2)

    def test_renter_point_multiple_movie(self):
        actual = MovieRentGroup(
            MovieRent(1, children_movie()),
            MovieRent(3, base_movie())
        ).rent_points()
        assert (actual == 3)

    def __assert_movie(self, expected, movie):
        for k, v in expected.items():
            p = MovieRent(k, movie).price_for()
            self.assertEqual(p, v)

if __name__ == '__main__':
    unittest.main()