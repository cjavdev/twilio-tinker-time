# What is an SDK?

💼 Software Development Kit

An SDK is a set of tools to build software for a particular platform.

Typically, an SDK will include a bit more than the library code and will
often ship with documentation, debugging tools, tools for automated testing,
and code examples.

## Lingo

First let's talk about a few terms:

* Library: A collection of pre-written code that developers can use. Some SDKs
  are referred to primarily as libraries, though an SDK often contains multiple
  libraries. In web development, you might also hear "Client Library" or
  "Server-side Library" and "Client-side Library."
  [./server-side-vs-client-side.md]((see the difference here)).

* Framework: While not exactly the same as an SDK, frameworks provide a
  foundational structure to develop software, and sometimes the term is used
  interchangeably.

* API Wrapper: Thin layer of code that maps the features and functions of an
  API to a specific language for convenience.

* Bindings: This one is a bit older, but you may see it in the wild.


### Conflation of terms

It's easy to see why the terms SDK and API might be used interchangeably or be
misunderstood:

**SDKs often include APIs**: As mentioned, an SDK might come bundled with one or
more APIs. So when developers use an SDK, they're often directly interacting
with its included API(s).

**Method names in SDKs**: The actual functions or methods that developers call when
using an SDK can be considered the SDK's API. For instance, if you're using a
game development SDK, the function to draw an object on the screen is part of
the SDK's API.

**Web APIs vs. Other APIs**: When people say "API" in modern tech contexts, they
often mean "Web API," especially RESTful ones. This is due to the rise of web
services and cloud computing. However, it's important to remember that not all
APIs are web-based.


When we say API in this session, we'll mean "Web API" and refer to the set of
HTTP endpoints exposed by Twilio for working with their services.

## Client vs server SDKs

When building a modern web application there are really 2 places that code
runs: client (usually your browser or a mobile app), server (usually some
computer in AWS or Azure). When a web page first loads, it downloads the code
to run on your browser from the server, then as you interact with the
application, data is often sent back to the server or through APIs using SDKs
to save your place.


1. Client SDKs

Client SDKs are designed to be integrated into client-side applications, such
as mobile apps or web frontends. They typically interact directly with the
end-user's device. E.g. a little chat widget on a website, or the payment input
fields for typing your credit card.

Advantages:

* User Experience: Allows for seamless and immediate interaction without
  waiting for server-side processing.

* Offloading: Offloads some tasks from the server, reducing server load.

* Direct Interaction: Can leverage device-specific features and capabilities,
  like the camera or accelerometer on a mobile phone.


2. Server SDKs

Server SDKs are designed for server-side applications. They handle backend
operations, communicate with other servers, and often involve tasks that
shouldn't be exposed to the client for security reasons.

Advantages:

* Security: Can securely store and manage sensitive data like API keys and user
  credentials.

* Data Processing: Can handle heavy data processing without impacting client
  performance.

* Centralization: Provides a single point for data management, updates, and
  logic, ensuring consistent experiences for all users.


### Key differences:

* Where the code is run: Client SDKs operate on the user's device (browser,
mobile app), while Server SDKs operate on the server.

* Security Considerations: Client SDKs are exposed to the user, so sensitive
operations (like transactions) are usually deferred to Server SDKs which can
securely manage sensitive information.

* Performance and Efficiency: Client SDKs can enhance responsiveness by handling
tasks directly on the client side. In contrast, Server SDKs can perform more
intensive tasks without affecting client-side performance.

In many real-world applications, Client SDKs and Server SDKs are used together.
The client SDK may help collect information or provide a user interface, while the
server SDK handles data storage, authentication, and other sensitive operations.


## Concept check

Take a look at this page for Twilio: https://www.twilio.com/docs/libraries

Which of these libraries are written with JavaScript and are Client SDKs vs Server SDKs?


