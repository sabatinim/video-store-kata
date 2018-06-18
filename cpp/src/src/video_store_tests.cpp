#define CATCH_CONFIG_MAIN  // This tells Catch to provide a main() - only do this in one cpp file
#include "catch.hpp"
#include <list>

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
    
    long price()
    {
        return 3.0;
    }
};

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
    

    VideoStore(User *user,RegularMovie *regularMovie)
    {
        this->user = user;
        this->regularMovie = regularMovie;
    }
    
    std::string printReceipt()
    {
        return std::string("Rental Record for "+
        this->user->get_name()+
        " - "+
        this->regularMovie->get_title()+
        " "+
        std::to_string(this->regularMovie->price())+
        "");
    }
    
    std::string printReceiptGroup()
    {
        std::string result = "Rental Record for "+this->user->get_name()+" - ";
        int i=0;
        for (RegularMovie* regularMovie : this->regularMovieGroup) {
            std::string separator = (i==0)?"":" - ";
            result += std::string(separator +regularMovie->get_title()+" "+std::to_string(regularMovie->price()));
            i++;
        }
        
        return result;
    }
};


TEST_CASE( "Rent two regular movie for one day" ) {
   
    std::list<RegularMovie*> regularMovieGroup = {new RegularMovie("A_REGULAR_MOVIE",1), new RegularMovie("ANOTHER_REGULAR_MOVIE",1)};
    
    VideoStore *videoStore = new VideoStore(new User("Fred"),
                                            regularMovieGroup);
    
    CHECK( videoStore->printReceiptGroup() == "Rental Record for Fred - A_REGULAR_MOVIE 3 - ANOTHER_REGULAR_MOVIE 3" );
}



