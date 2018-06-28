#include <list>

#include <iomanip> // setprecision
#include <sstream> // stringstream
#include "RegularMovie.cpp"
#include "User.cpp"

class VideoStore
{
private:
    User *user;
    RegularMovie *regularMovie;
    std::list<RegularMovie*> regularMovieGroup;
    
    
    static std::string printPrice(RegularMovie *regularMovie) {
        std::stringstream stream;
        stream << std::fixed << std::setprecision(1) << regularMovie->price();
        return stream.str();
        
    }
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
