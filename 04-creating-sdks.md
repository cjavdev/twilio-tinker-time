# Creating SDKs

One of my favorite ways to learn how something works is to
try to intuit how it may work and try to reimplement from
scratch.

Before we get into the final boss exercise: writing our own
baby-SDK for Twilio, let's talk about how SDKs are made.

SDKs often come from two main pipelines: the community, or directly from the
company with the API.

Sometimes, a company may provide SDKs in several languages, and the community
will supplement with support for less common languages.

For instance, a team inside of Stripe builds and maintains 7 SDKs for: [node.js](https://github.com/stripe/stripe-node),
[Ruby](https://github.com/stripe/stripe-ruby),
[Python](https://github.com/stripe/stripe-python),
[PHP](https://github.com/stripe/stripe-php),
[Go](https://github.com/stripe/stripe-go),
[Java](https://github.com/stripe/stripe-java), and
[.NET](https://github.com/stripe/stripe-dotnet). The community has created
libraries for working with Stripe in other languages like [Rust](https://docs.rs/stripe-rust/latest/stripe/), [Perl](https://metacpan.org/pod/Net::Stripe), and my favorite named library: [Elixir - stripity-stripe](https://github.com/beam-community/stripity-stripe).

As a library maintainer, it can be challenging to keep up with all the changes
to SDKs as an API evolves. For example, as new properties are added or removed
from the API, those might require code changes (depending on the language and
how the library is implemented).

One solution for keeping a library consistent and dependable is auto generation.

There are several tools for taking some artifact that describes what an API
looks like and generating the code for the underlying libraries from those
artifacts. The most popular suite of such tools is called [OpenAPI](https://www.openapis.org/) (f.k.a.
Swagger).

Twilio even [has a doc showing how to generate Rust
bindings](https://www.twilio.com/docs/openapi/generating-a-rust-client-for-twilios-api)
from [Twilio's OpenAPI spec](https://github.com/twilio/twilio-oai).

For more nitty gritty about SDK generation, checkout a [talk I gave at Rubyconf 2022](https://www.youtube.com/watch?v=aV1obsuDmjU)!

# Final Boss Exercise: baby-SDK for Twilio

![1200px-Babybowser](https://github.com/cjavdev/twilio-tinker-time/assets/3710766/b7a5be12-2827-47b0-9bdc-4ec651e86aba)


Alright, let's build our own baby-SDK for Twilio.

Let's reverse engineer something that matches the same
patterns we saw in the real Twilio node.js SDK.

Let's disect this Node.js snippet from their [api
docs](https://www.twilio.com/docs/sms/api/message-resource) and also look at
the cURL API reference.

```js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({from: '+15557122661', body: 'Hi there', to: '+15558675310'})
      .then(message => console.log(message.sid));
```

In order to send a message we need:

* Account SID
* Auth Token
* From phone number
* To phone number
* Message body

The cURL reference tells us a bit more about which part of the HTTP request
should contain which piece of data:

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=+15557122661" \
--data-urlencode "Body=Hi there" \
--data-urlencode "To=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

The Account SID is in the URL path _and_ in the credentials (`-u` means use Basic Authentication and pass the username and password joined by a `:`)

The Auth Token is sent as the password in the credentials.

We see the from, to, and body are in the "data" or body of the request.

From here, it's a matter of constructing an API call with JavaScript to make
the same HTTP request. `fetch` is a tool that's been available in the browser
for a long time, but is also now available in Node.js!

[`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) let's us make
HTTP requests with JavaScript.

## Part 1: Using fetch

Use `fetch` in the `/messages` route on Replit to replace the current use of
the Twilio SDK.


**Hint 1**: Here's how you use string interpolation in JavaScript to combine strings and variables (note the backtic):

```js
const starshipNumber = 9;
const url = `https://swapi.dev/api/starships/${starshipNumber}/`
```

**Hint 2**: Here's how you combine the username and password in JavaScript for basic authentication:


```js
const authHeaderValue = `Basic ${Buffer.from(username + ":" + password).toString('base64')}`
```

**Hint 3**: Here's how you construct url encoded request body data:

```js
const params = new FormData();
params.append("name", "Death Star")
params.append("passengers", "843342")
```

## Part 2: Building the Class structure

Benevolent SDK maintainers do well to structure their SDKs in a way that is consistent, predictable, and
in a way that improves the experience of the end developer.

For example, listing all conversation messages and listing conversation participants is pretty similar:

```js
// List conversation messages
client
  .conversations
  .v1
  .conversations('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .messages
  .list
  .then(message => console.log(message.conversationSid));

// List conversation participants
client
  .conversations
  .v1
  .conversations('CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .participants
  .list({limit: 20})
  .then(participants => participants.forEach(p => console.log(p.sid)));
```

Let's first work on creating a client that can store credentials and return some objects that know how to make requests.

You may want to use classes or JavaScript objects for this bit.
