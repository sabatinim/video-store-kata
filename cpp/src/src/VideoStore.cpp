#include <list>

#include <iomanip> // setprecision
#include <sstream> // stringstream
#include "Movies.cpp"
#include "User.cpp"


class MoviePrinter
{
    
};

class Display
{
    
    static std::string printPrice(double regularMovie) {
        std::stringstream stream;
        stream << std::fixed << std::setprecision(1) << regularMovie;
        return stream.str();
    }
    
public:
    std::string print(std::list<Movie*> regularMovieGroup,std::string name)
    {
        std::string result = "Rental Record for "+name+" - ";
        
        int i=0;
        for (Movie* regularMovie : regularMovieGroup)
        {
            std::string separator = (i==0)?"":" - ";
            result +=  std::string(separator +regularMovie->get_title() +" "+ printPrice(regularMovie->price()));
            i++;
        }
        return result;

    }
    
};


class VideoStore
{
private:
    User *user;
    Display *display;
    
public:
    
    VideoStore(User *user,Display *display)
    {
        this->user = user;
        this->display = display;
    }
    
    std::string printReceipt(std::list<Movie*> regularMovieGroup)
    {
        return display->print(regularMovieGroup,this->user->get_name());
    }
};

