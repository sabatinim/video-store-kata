#!/usr/bin/env python

from lib.core import RentGroup, Rent, children_movie, base_movie, regular_movie, VideoStore
from lib.receipt import PlainTextReceipt, HtmlReceipt


class StdOutDisplay:
    def __init__(self, *receipt_group):
        self._receipt_group = receipt_group

    def print(self, user, rent_group: RentGroup):
        for r in self._receipt_group:
            print(f'--------------{r}--------------')
            print(r().generate(user, rent_group))


VideoStore(StdOutDisplay(PlainTextReceipt, HtmlReceipt)) \
    .add(Rent(1, base_movie("The game of thrones"))) \
    .add(Rent(1, children_movie("Cinderella"))) \
    .add(Rent(1, regular_movie("Mr. Robot"))) \
    .add(Rent(3, regular_movie("The Hobbit"))) \
    .print_receipt("Fred")
