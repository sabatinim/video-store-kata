#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"
#include <list>
#include "VideoStore.cpp"


TEST_CASE( "Rent two regular movie for one day" ) {
   
    std::list<Movie*> regularMovieGroup = {
        new Regular("A_REGULAR_MOVIE",1),
        new Regular("ANOTHER_REGULAR_MOVIE",1)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(regularMovieGroup) == "Rental Record for Fred - A_REGULAR_MOVIE 3.0 - ANOTHER_REGULAR_MOVIE 3.0" );
}


TEST_CASE( "Rent a regular movie for three days" ) {
    
    std::list<Movie*> regularMovieGroup = {new Regular("A_REGULAR_MOVIE",3)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(regularMovieGroup) == "Rental Record for Fred - A_REGULAR_MOVIE 4.5" );
}

TEST_CASE( "Rent a regular movie for five days" ) {
    
    std::list<Movie*> regularMovieGroup = {new Regular("A_REGULAR_MOVIE",5)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(regularMovieGroup) == "Rental Record for Fred - A_REGULAR_MOVIE 7.5" );
}

TEST_CASE( "Rent two regular movie for several days" ) {
    
    std::list<Movie*> regularMovieGroup = {
        new Regular("A_REGULAR_MOVIE",2),
        new Regular("ANOTHER_REGULAR_MOVIE",5)
    };
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(regularMovieGroup) == "Rental Record for Fred - A_REGULAR_MOVIE 3.0 - ANOTHER_REGULAR_MOVIE 7.5" );
}


TEST_CASE( "Rent a new release movie for one day" ) {

    std::list<Movie*> movieGroup = {
        new NewRelease("A_NEW_RELEASE_MOVIE",1)
    };

    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));

    CHECK( videoStore->printReceipt(movieGroup) == "Rental Record for Fred - A_NEW_RELEASE_MOVIE 3.0" );
}

TEST_CASE( "Rent a new release movie for three day" ) {
    
    std::list<Movie*> movieGroup = {
        new NewRelease("A_NEW_RELEASE_MOVIE",3)
    };
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(movieGroup) == "Rental Record for Fred - A_NEW_RELEASE_MOVIE 9.0" );
}

TEST_CASE( "Rent two new release movie for several days" ) {
    
    std::list<Movie*> movieGroup =
    {
        new NewRelease("A_NEW_RELEASE_MOVIE",3),
        new NewRelease("ANOTHER_NEW_RELEASE_MOVIE",4)
    };
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new Display(new MoviePrinter()));
    
    CHECK( videoStore->printReceipt(movieGroup) == "Rental Record for Fred - A_NEW_RELEASE_MOVIE 9.0 - ANOTHER_NEW_RELEASE_MOVIE 12.0" );
}
