#include <string>
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
