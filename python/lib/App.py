#!/usr/bin/env python

from lib.core import MovieRentGroup, MovieRent, children_movie, base_movie, regular_movie, VideoStore
from lib.receipt import PlainTextReceipt, HtmlReceipt, Receipt


class StdOutDisplay:
    def __init__(self, *receipt_group: Receipt):
        self._receipt_group = receipt_group

    def print(self, user, rent_group: MovieRentGroup):
        for r in self._receipt_group:
            print(f'--------------{r}--------------')
            print(r.generate(user, rent_group))


VideoStore(StdOutDisplay(PlainTextReceipt(), HtmlReceipt())) \
    .add(MovieRent(1, base_movie("The game of thrones"))) \
    .add(MovieRent(1, children_movie("Cinderella"))) \
    .add(MovieRent(1, regular_movie("Mr. Robot"))) \
    .add(MovieRent(3, regular_movie("The Hobbit"))) \
    .print_receipt("Fred")
