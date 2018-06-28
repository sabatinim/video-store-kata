#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"
#include <list>
#include "VideoStore.cpp"


TEST_CASE( "Rent two regular movie for one day" ) {
   
    std::list<RegularMovie*> regularMovieGroup = {new RegularMovie("A_REGULAR_MOVIE",1), new RegularMovie("ANOTHER_REGULAR_MOVIE",1)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            regularMovieGroup);
    
    CHECK( videoStore->printReceipt() == "Rental Record for Fred - A_REGULAR_MOVIE 3.0 - ANOTHER_REGULAR_MOVIE 3.0" );
}


TEST_CASE( "Rent a regular movie for three days" ) {
    
    std::list<RegularMovie*> regularMovieGroup = {new RegularMovie("A_REGULAR_MOVIE",3)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            regularMovieGroup);
    
    CHECK( videoStore->printReceipt() == "Rental Record for Fred - A_REGULAR_MOVIE 4.5" );
}

TEST_CASE( "Rent a regular movie for five days" ) {
    
    std::list<RegularMovie*> regularMovieGroup = {new RegularMovie("A_REGULAR_MOVIE",5)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            regularMovieGroup);
    
    CHECK( videoStore->printReceipt() == "Rental Record for Fred - A_REGULAR_MOVIE 7.5" );
}

TEST_CASE( "Rent two regular movie for several days" ) {
    
    std::list<RegularMovie*> regularMovieGroup = {
        new RegularMovie("A_REGULAR_MOVIE",2),
        new RegularMovie("ANOTHER_REGULAR_MOVIE",5)
    };
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            regularMovieGroup);
    
    CHECK( videoStore->printReceipt() == "Rental Record for Fred - A_REGULAR_MOVIE 3.0 - ANOTHER_REGULAR_MOVIE 7.5" );
}

