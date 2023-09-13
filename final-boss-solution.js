class Messages {
  constructor(client) {
    this.client = client;
    console.log('in constructor')
  }

  async create({ from, to, body }) {
   const params = new FormData();
   params.append("From", from)
   params.append("To", to)
   params.append("Body", body)

   return await fetch(`https://api.twilio.com/2010-04-01/Accounts/${this.client.accountId}/Messages.json`, {
     method: "POST",
     body: params,
     headers: {
       'Authorization': `Basic ${Buffer.from(this.client.accountId + ":" + this.client.authToken).toString('base64')}`
     }
   }).then(r => r.json())
  }
}

class MyClient {
  constructor(accountId, authToken) {
    this.accountId = accountId;
    this.authToken = authToken;
  }

  get messages() {
    return new Messages(this)
  }
}

module.exports = MyClient;
