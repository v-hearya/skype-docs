# Getting Started

This article will help you build and enable a Skype for Business bot using the Microsoft Bot Framework. 

**In this section we’ll cover:**
-	[Creating a Skype for Business bot](#create-bot)
-	[Adding a bot to Skype for Business](#add-bot)
-	[Feature Support](#feature-support)
-	[Creating outbound bots](#create-outbound-bots)
-	[Supported Skype for Business versions](#version-suport)
-	[Removing a bot – Developer](#remove-bot-dev)
-	[Removing a bot – Tenant Administrator](#remove-bot-tenant)

<a name="create-bot"></a>
## Creating a Skype for Business bot
Skype for Business bots are created using the Microsoft Bot Framework.  Bots created with the framework can easily be configured to work with Skype for Business.  See the Microsoft Bot Framework Overview to learn how to:
1.	Build a bot using the C# SDK, Node.js SDK or REST API
2.	Test it using the Bot Framework Emulator
3.	Deploy the bot to a cloud service, such as Microsoft Azure
4.	Register the bot with the Microsoft Bot Framework, and click Add Skype for Business as a channel.  Enable the channel in the configuration page.
5.	Add the bot to a Skype for Business tenant by clicking Add to Skype for Business.

<a name="add-bot"></a>
## Adding a bot to Skype for Business
Bots can only be added to Skype for Business by Tenant Administrators of a Skype for Business Online environment.  By clicking Add to Skype for Business, you will launch a page that contains instructions for registering your bot. E.g. https://skypeappregistration.azurewebsites.net/bot/29415286-5a43-4a00-9dc5-bcbc2ce1f59e 
The instructions contain the following information:

To add your bot to Skype for Business, you must be the Tenant Administrator of a Skype for Business Online environment. A Tenant Administrator can easily add your bot by using the Skype for Business Admin PowerShell cmdlets. Complete the following steps to add a bot:

1.	Download and install the Skype for Business Online Connector module
2.	Open Windows PowerShell as Administrator and run the following 

Import-PSSession (New-CsOnlineSession -Credential Get-Credential)

3.	Enter your Admin credentials
4.	Run the following cmdlet

New-CsOnlineApplicationEndpoint 41ec7d50-ba91-1208-73ee-136b88859725 -Name NameOfTheBot -Uri sip:username@yourdomain.com

This command registers an instance of your bot with a Skype for Business Online tenant. A Skype for Business Admin can replace the name parameter with their desired Display Name and replace the Uri parameter with a unique user account from their domain (eg. mybot@contoso.com)

NOTE: A newly registered bot can take up to 8 hours to be discoverable by all users in the Skype for Business tenant. More details on using PowerShell to manage bots and apps for Skype for Business can be found here.

<a name="feature-support"></a>
## Feature Support
For a full list of current supported features please refer to the Skype for Business Channel Inspector.
Messages
Your bot can send plain text, HTML, and emoticons to a user or group. Users can send rich text, HTML, and emoticons to your bot.
Typing indicator
Your bot can send a typing indicator using the C# SDK, Node.js SDK or REST API to tell the user that the bot is preparing to respond, for example when processing a request.
Basic format
The Skype for Business ID of a user is available for your bot, and is sent along with the Display Name with every message.
{
  "type": "message",
  "timestamp": "2017-05-02T18:22:05.4521432Z",
  "serviceUrl": "https://webpoolbl20r02.infra.lync.com/platformservice/tgt-b5eccd26b71c5653a9f3e8faecd568db/botframework",
  "channelId": "skypeforbusiness",
  "from": {
    "id": "sip:user@contoso.com",
    "name": "Contoso User"
  },
  "conversation": {
    "isGroup": true,
    "id": "ZmMyYmY4OGMjc2lwOmppZWluY29taW5nYm90ZXA4QDBtY29ycDJjbG91ZHBlcmYub25taWNyb3NvZnQuY2t"
  },
  "recipient": {
    "id": "sip:bot@contoso.com",
    "name": "sip:bot@contoso.com"
  },
  "text": "Hello World",
  "attachments": [],
  "entities": [],
  "replyToId": "2"
}

}
The from field contains the unique user Skype for Business identity SIP URI and user Display Name. The to field contains the App Skype for Business identity SIP URI and bot Display Name.
Skype for Business emoticons
Skype for Business emoticons can be sent by using emoticon keyword.
{
  "text": ":)"
}
Cards and buttons
Skype for Business does not support cards and buttons in the Developer Preview.  Cards and buttons fallback to text. 
Groups
A bot can be enabled for groups in outgoing bot scenarios.  A bot can message multiple users in a group conversation.  Skype for Business does not support adding an additional participant to a 1:1 bot conversation. 

<a name="create-outbound-bots"></a>
## Creating outbound bots
Skype for Business bots can initiate outbound messages to users proactively because they are enabled by a Tenant Administrator.  In order to initiate an outbound message, your bot must be Skype for Business tenant-specific (your code must be written for a bot that will be only be deployed in a single tenant. Eg. bot@contoso.com).  In addition, in order to initiate an outbound message, your bot must also have the Skype for Business identity of the user or users the bot will be messaging directly eg. user@contoso.com).
Your bot will also need to add the Skype for Business Channel entry point URL (https://api.skypeforbusiness.com/platformservice/botframework) to the Trusted Service URLs.
Here’s a code snippet that illustrates how to initiate an outbound message to a Skype for Business user using the C# Bot Builder SDK.

MicrosoftAppCredentials.TrustServiceUrl(“https://api.skypeforbusiness.com/platformservice/botframework”);     
to = new string[] {“sip:usera@contoso.com”, “sip:userb@contoso.com”};
public async Task MakeOutboundCall(string[] to, string topic)
        {
            var connector = new ConnectorClient(new Uri(https://api.skypeforbusiness.com/ platformservice/botframework/)); //initial entry point to talk to the Skype for Business channel
            List<ChannelAccount> participants = new List<ChannelAccount>();
            foreach (string t in to)
            {
                participants.Add(new ChannelAccount(t, t + " name"));
            }
            ConversationParameters cpMessage = new ConversationParameters(true, new ChannelAccount(sip:bot@contoso.com, "DisplayNameofBot"),  participants, topic);
            ConversationResourceResponse  response = await connector.Conversations.CreateConversationAsync(cpMessage);
            ConversationId = response.Id;
            this.UpdateServiceUrl(response.ServiceUrl); //remember response ServiceURL to send additional message requests to the same conversation
        }

<a name="version-suport"></a>
## Supported Skype for Business versions

The Skype for Business Bot Framework channel is currently supported for Skype for Business Online.  Skype for Business Server 2015 is not supported.

<a name="remove-bot-dev"></a>
## Removing a bot - Developer
Disabling a bot
To stop your bot receiving messages and remove it from directories go to your Bot Dashboard and Edit the Skype for Business channel. Disable the bot.
Deleting a bot
To delete your bot completely go to your Bot Dashboard and Edit the Skype for Business channel. Select the Delete button at the bottom.

<a name="remove-bot-tenant"></a>
## Removing a bot – Skype for Business Tenant Administrator
Deleting a bot
To delete a bot completely from a Skype for Business Tenant, you must be the Tenant Administrator of a Skype for Business Online environment. A Tenant Administrator can easily add your bot by using the Skype for Business Admin PowerShell cmdlets. Complete the following steps to delete a bot:

1.	Download and install the Skype for Business Online Connector module
2.	Open Windows PowerShell as Administrator and run the following 

Import-PSSession (New-CsOnlineSession -Credential Get-Credential)

3.	Enter your Admin credentials
4.	Run the following cmdlet

Remove-CsOnlineApplicationEndpoint -Uri sip:username@yourdomain.com

This command removes the instance of a bot with a Skype for Business Online tenant. A Skype for Business Admin must replace the URI of the user account from their domain (eg. mybot@contoso.com) they created when adding the bot.  More details on using PowerShell to manage bots and apps for Skype for Business can be found here.

