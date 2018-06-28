#include <string>

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
