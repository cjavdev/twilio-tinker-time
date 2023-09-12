# Getting started with client SDKs

## Installation

Recall that our browser is going to request some code from the server when the
page loads. That code, including any SDK code, needs to be available for the
browser to download. There are several common approches to installing a client SDK:

* CDN (Content Delivery Network)
* Bootstrapping some JavaScript (this will often be a tiny amount of JavaScript that will request more code from the third party's server)
* Self hosting

Usually third parties will ofter several alternatives.

### CDN

A CDN is another web server that you can reference in the HTML you deliver
to the client so that the browser knows to go download an SDK from their server.

CDNs can be faster and often have better caching and more servers located
physically closer to your users than your own server.

If your web front end is very basic, you'll likely point to a CDN to download
an SDK rather than keeping a copy on your server.


Here's an example script tag for loading Tailwind CSS, a popular CSS framework from a CDN:

```html
<html>
  <head>


    <script src="https://cdn.tailwindcss.com"></script>


  </head>
  <body class="p-10">
    <h1 class="text-3xl font-bold">
      Tinker Time Twilio
    </h1>
  </body>
</html>
```

### Bootstrapping

Here's a common example for installing a client side SDK, this time for Google Maps:

```html
<html>
  <head>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
  </head>
  <body>
    <div id="map"></div>

    <!-- prettier-ignore -->
    <script>(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
        ({key: "AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg", v: "weekly"});</script>
  </body>
</html>
```

### Self-hosting

To self-host, you'd download the SDK code and then include it in your client-side
JavaScript either directly or via a build process. Many client-side JavaScript
SDKs will show how to install with `npm` and expect you to have some build
process to include those modules in your bundled JavaScript.


## Basic Debugging

[Open up the browser's developer tools](https://balsamiq.com/support/faqs/browserconsole/#:~:text=To%20open%20the%20developer%20console)


# Environment setup

Rather than spend extra time on environment setup, we'll use Replit today.

> Replit is an online integrated development environment (IDE) that can be used with a variety of programming languages, including JavaScript, Python, Go, C++, Node.js, Rust, and any other language available with the Nix packager.

If you're playing along at home and want to get set up outside of Replit, you'll need to set up your environment:

### Setup Node.js:

If you haven't already, install Node.js (I recommend using [asdf](https://blog.logrocket.com/manage-node-js-versions-using-asdf/))

Verify the installation by running `node -v` and `npm -v` in your terminal.

### Install Twilio Node SDK:

Run `npm install twilio` in your project directory.

### Set Up Twilio Account:

Sign up for a Twilio account if you haven't here.

Navigate to the Twilio Console and take note of your `ACCOUNT_SID` and `AUTH_TOKEN`.


# Exercise 1: Installing the client-side Twilio Flex Chat SDK

Installing the client-side SDK for working with Twilio's Flex Chat involves a bit of both loading a javascript file from a CDN and writing a small
bit of JavaScript to initialize the WebChat.

Follow the steps outlined in the [Twilio Documentation](https://www.twilio.com/docs/flex/developer/messaging/webchat/setup#consuming-from-cdn)
to install the Flex WebChat widget using the CDN Option 1 onto the page called `public/chat.html` on Replit.

If you don't see anything on the page, open the browser's developer tools and see if there are any error messages in the console.

# Exercise 2: Installing the server-side Twilio SDK

There are several tools in each language for installing libraries and SDKs.
These are often referred to as package managers. In node, the most common is `npm` or Node Package Manager.

> `npm` is a package manager for the JavaScript programming language maintained by npm, Inc. npm is the default package manager for Node.js. It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.

Twilio publishes its SDK to the `npm` registry. Check out the `npm` registry listing for [twilio-node](https://www.npmjs.com/package/twilio).

From the shell on replit, we can run `npm install twilio`.

That command will add `twilio` to our `package.json` file and download the SDK
code into a special directory called `node_modules` which will contain the
`twilio` package _and_ any libraries that the `twilio` package needs in order
to work.

Now that the SDK is installed, we can try to use it:

```js
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')
const client = twilio(accountSid, authToken);

console.log({ client });
```

Note that `process.env.TWILIO_ACCOUNT_SID` and `process.env.TWILIO_AUTH_TOKEN`
are both referring to environment variables. Environment variables offer a
simple way to store credentials in a bit safer way than hard coding.
Technically hard coding the string values for these strings here would also
work, but is not advised.

<img width="1721" alt="image" src="https://github.com/cjavdev/twilio-tinker-time/assets/3710766/3c8925ee-29cf-429d-a160-1d0d1de55aab">


When you restart the server, you should see a log statement with your
initialized server-side SDK that is ready to make requests!
