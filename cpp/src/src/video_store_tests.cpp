#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"
#include <list>

#include <iomanip> // setprecision
#include <sstream> // stringstream


class User
{
private:
    std::string name;
    
public:
    User(std::string name)
    {
        this->name = name;
    }
    
    std::string get_name()
    {
        return this->name;
    }
};

class RegularMovie{
    
public:
    std::string title;
    int rentalDays;
    
public:
    RegularMovie(std::string title,int rentalDays)
    {
        this->title = title;
        this->rentalDays = rentalDays;
    }
    
    std::string get_title()
    {
        return this->title;
    }
    
    int extrafeeDays() {
        return this->rentalDays -2;
    }
    
    double price()
    {
        if(extrafeeDays() > 0)
            return 3.0 + 1.5 * extrafeeDays();
        return 3.0;
    }
};

static std::string printPrice(RegularMovie *regularMovie) {
    std::stringstream stream;
    stream << std::fixed << std::setprecision(1) << regularMovie->price();
    return stream.str();
    
}

class VideoStore
{
private:
    User *user;
    RegularMovie *regularMovie;
    std::list<RegularMovie*> regularMovieGroup;
    
public:
    
    VideoStore(User *user,std::list<RegularMovie*> regularMovieGroup)
    {
        this->user = user;
        this->regularMovieGroup = regularMovieGroup;
    }
    
    std::string printReceipt()
    {
        std::string result = "Rental Record for "+this->user->get_name()+" - ";
        int i=0;
        for (RegularMovie* regularMovie : this->regularMovieGroup) {
            
            std::string separator = (i==0)?"":" - ";
            result += std::string(separator +regularMovie->get_title()+" "+printPrice(regularMovie));
            i++;
        }
        return result;
    }
};

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
