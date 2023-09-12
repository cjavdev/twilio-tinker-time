# Using server-side SDKs

## Exercise: Sending a SMS message

On Replit in the `index.js` file, find the `/messages` route and add some code that
uses the Twilio SDK to send a message from your Twilio number to yourself.

Then, render the ID of the message sent back in the JSON response.

**Hint**: [Twilio documentation](https://www.twilio.com/docs/sms/quickstart/node)


## Exercise: Fetch a list of conversations

When end users send chat messages through the Flex WebChat interface, those
create new Conversation objects. A `Conversation` represents the thread of
messages between two or more `Participants` on a given channel.

Once we've chatted through the Flex WebChat, our account will contain several
conversations that we can interact with through the API and in turn, through
the SDK.

On Replit in the `index.js` file, find the `/conversations` route and add the code
to fetch conversations from the Twilio API.

The start time and a friendly name for the conversation should appear in the
Conversations section of the app.
