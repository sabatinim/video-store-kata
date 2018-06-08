
#ifdef UNIT_TESTING
#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"

using namespace Catch;

TEST_CASE("My first test case") {

    REQUIRE_THAT("A_STRING" ,Equals("A_STRING"));
}

#endif

