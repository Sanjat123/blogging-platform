#ifndef BLOG_H
#define BLOG_H

#include <string>
#include <vector>
#include "User.h" 

// Forward declaration
class Comment;

class Blog {
private:
    std::string title;
    std::string description;
    std::string banner_url;
    std::string content_json; 
    std::vector<std::string> tags;

    User* author; 

    std::vector<Comment*> comments;

    int total_likes;
    int total_comments;

public:
    // Constructor (to create a new Blog object)
    Blog(std::string title, std::string desc, User* author) {
        this->title = title;
        this->description = desc;
        this->author = author; 
        this->total_likes = 0;
        this->total_comments = 0;
    }

    // Public method
    void addLike() {
        this->total_likes++;
    }

    // Public method
    std::string getTitle() {
        return this->title;
    }

    // ✅ Corrected method
    std::string getAuthorUsername() {
        return this->author->getUsername();
    }
};

#endif // BLOG_H
