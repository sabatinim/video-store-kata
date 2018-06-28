#include <list>

#include <iomanip> // setprecision
#include <sstream> // stringstream
#include "Movies.cpp"
#include "User.cpp"

class VideoStore
{
private:
    User *user;
    std::list<Movie*> regularMovieGroup;
    
    
    static std::string printPrice(Movie *regularMovie) {
        std::stringstream stream;
        stream << std::fixed << std::setprecision(1) << regularMovie->price();
        return stream.str();
        
    }
public:
    
    VideoStore(User *user,std::list<Movie*> regularMovieGroup)
    {
        this->user = user;
        this->regularMovieGroup = regularMovieGroup;
    }
    
    std::string printReceipt()
    {
        std::string result = "Rental Record for "+this->user->get_name()+" - ";
        int i=0;
        for (Movie* regularMovie : this->regularMovieGroup) {
            
            std::string separator = (i==0)?"":" - ";
            result += std::string(separator +regularMovie->get_title()+" "+printPrice(regularMovie));
            i++;
        }
        return result;
    }
};
