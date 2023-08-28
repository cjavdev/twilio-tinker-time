# Intro

👋 I'm CJ Avilla [https://cjav.dev](@cjav_dev)

# Objective

My objective is that you leave:

* feeling more confident when talking about and working with SDKs
* with a Replit environment set up where you can experiment, play with your code that uses SDKs, and learn more


### Hard Mode == No libraries alowed

Say we wanted to make an HTTP request to a third party service.

Without a library:

When you implement an HTTP GET request using raw socket programming (without
considering SSL/TLS for HTTPS), the code is surprisingly complex.

This simplified example doesn't handle redirects, chunked encoding, parsing
headers, or many other aspects of the HTTP protocol. Plus, if you needed to
make an HTTPS request, you'd have to add SSL/TLS handling on top of this.

Take a quick scan (this is C++ code):


```cpp
#include <iostream>
#include <sys/socket.h>
#include <netdb.h>
#include <string.h>
#include <unistd.h>

int main() {
    const char* hostname = "api.example.com";
    const char* port = "80";
    const char* path = "/data";

    struct addrinfo hints, *res;
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;

    if (getaddrinfo(hostname, port, &hints, &res) != 0) {
        std::cerr << "Failed to resolve host." << std::endl;
        return 1;
    }

    int sockfd = socket(res->ai_family, res->ai_socktype, res->ai_protocol);
    if (sockfd == -1) {
        std::cerr << "Failed to create socket." << std::endl;
        return 1;
    }

    if (connect(sockfd, res->ai_addr, res->ai_addrlen) == -1) {
        std::cerr << "Failed to connect." << std::endl;
        return 1;
    }

    std::string request = "GET " + std::string(path) + " HTTP/1.1\r\n";
    request += "Host: " + std::string(hostname) + "\r\n";
    request += "Connection: close\r\n\r\n";

    send(sockfd, request.c_str(), request.length(), 0);

    char buffer[4096];
    ssize_t bytes_received = recv(sockfd, buffer, sizeof(buffer) - 1, 0);
    if (bytes_received <= 0) {
        std::cerr << "Failed to receive data." << std::endl;
        return 1;
    }
    buffer[bytes_received] = '\0';

    std::cout << buffer << std::endl;

    close(sockfd);
    freeaddrinfo(res);

    return 0;
}
```

Alternatively, using the popular C++ library called cpr (C++ Requests), making
an HTTP GET request is as simple as:

```cpp
#include <cpr/cpr.h>
#include <iostream>

int main() {
    cpr::Response r = cpr::Get(cpr::Url{"https://api.example.com/data"});

    std::cout << r.text << std::endl;  // Prints the HTTP response body

    return 0;
}
```

This example illustrates the power and convenience of libraries. They abstract
away the complex details and allow you to focus on higher-level logic.
