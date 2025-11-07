#ifndef USER_H
#define USER_H

#include <string>
#include <vector>

class Blog; 

class User {
private:
    // --- Data ---
    std::string fullname;
    std::string email;
    std::string username;
    std::string password_hash; // Hashed password
    std::string bio;

    // Mirrors 'account_info'
    int total_posts;
    int total_reads;

    // Mirrors 'blogs' array
    std::vector<Blog*> blogs; 

public:
    // --- Methods (Abstraction) ---
    
    // Constructor (to create a new User object)
    User(std::string name, std::string email, std::string pass) {
        this->fullname = name;
        this->email = email;
        // In a real C++ app, we would hash the password here
        this->password_hash = "hashed_" + pass; 
        this->username = email.substr(0, email.find('@'));
        this->total_posts = 0;
        this->total_reads = 0;
    }

    std::string getUsername() {
        return this->username;
    }

    std::string getFullname() {
        return this->fullname;
    }

    void incrementPostCount() {
        this->total_posts++;
    }
};

#endif 