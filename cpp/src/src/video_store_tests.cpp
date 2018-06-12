#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"

using namespace std;

class User
{
private:
    string name;
    
public:
    User(string name)
    {
        this->name = name;
    }
    
    string get_name()
    {
        return this->name;
    }
};

class RegularMovie{
    
public:
    string title;
    int rentalDays;
    
public:
    RegularMovie(string title,int rentalDays)
    {
        this->title = title;
        this->rentalDays = rentalDays;
    }
    
    string get_title()
    {
        return this->title;
    }
    
    long price()
    {
        return 3.0l;
    }
};

class VideoStore
{
private:
    User *user;
    RegularMovie *regularMovie;
    
public:
    VideoStore(User *user,RegularMovie *regularMovie)
    {
        this->user = user;
        this->regularMovie = regularMovie;
    }
    
    string printReceipt()
    {
        return "Rental Record for "+this->user->get_name()+" - "+this->regularMovie->get_title()+" "+to_string(this->regularMovie->price())+"";
    }

};

TEST_CASE( "Rent a regular movie for one day" ) {
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            new RegularMovie("A_REGULAR_MOVIE",1));
    
    CHECK( videoStore->printReceipt() == "Rental Record for Fred - A_REGULAR_MOVIE 3.0" );
}



