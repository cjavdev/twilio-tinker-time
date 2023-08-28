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

### Self hosting

To self host, you'd download the SDK code then include it in your client side
JavaScript either directly or via a build process. Many client side JavaScript
SDKs will show how to install with `npm` and expect that you have some build
process set up to include those modules in your bundled JavaScript.


## Basic Debugging

[Open up the browser's developer tools](https://balsamiq.com/support/faqs/browserconsole/#:~:text=To%20open%20the%20developer%20console,(on%20Windows%2FLinux)


# Exercise

Follow the steps outlined in the [Twilio Documentation](https://www.twilio.com/docs/flex/developer/messaging/webchat/setup#consuming-from-cdn)
to install their Flex WebChat widget using the CDN Option 1 onto the page called `public/chat.html` on Replit.

If you don't see anything on the page, open the browser's developer tools and see if there are any error messages in the console.


