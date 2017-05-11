# Trusted Application - Azure web app samples

These quick-start Trusted Application Azure web app samples can be configured and deployed to an Azure Cloud Service in just few simple steps. 

- **AudioVideoIVRSample** - This sample enables PSTN incoming IVR with DTMF recognition, play audio prompts, stop the audio prompts.

- **CallTransferSample** - This sample Enables PSTN incoming call with audio prompt and transfer the call  to a SIP user URI
<a name="prerequisite"></a>
## Prerequisite 

1. **Aquire the service phone number**
   
    In the upcoming sections, You will need to register the application in Azure Active Directory and assign service phone number to the application's trusted endpoint. So make sure that you complete the steps mentioned in [Acquire the service phone number](../../docs/AquireServiceNumber.md) section before proceeding.

2. **Clone the samples and restore the NuGet packages**
3. **Deploy the sample to Azure App Service** 

    These samples run in a cloud service such as Azure. Please follow the steps in [Publish To Azure](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-dotnet#publish-to-azure) to deploy the sample app to Azure app service. Once the sample is successfully deployed and launched in your default browser, **save the URL from the address bar somewhere safe for use in the upcoming steps.**, for example: **https://avbridgesample.azurewebsites.net** 

## Getting Started
<a name="Registration"></a>
### 1. Registration

Use the [quick registration tool](https://aka.ms/skypeappregistration) for registering Skype for Business Trusted Applications in Azure and Skype for Business Online, that eliminates the need to register an Application manually in Azure portal. The steps are as follows.

a) **Sign in** - Use an account which has azure subscription available to sign in to [quick registration tool](https://aka.ms/skypeappregistration)

b) **Name of your application** - Set the name to  your desired application name.

c) **App ID URI and Callback uri for your application** - Retrieve the saved URL from the step 3 of **[prerequisite](#prerequisite)** and append **/callback** to it, for example: **https://avbridgesample.azurewebsites.net/callback**. Set this URL as your application's **Callback uri**. You do not need to change the prefilled value of **App ID URI** for these samples. 

d) **Application Permissions** - Select the relevant permissions for sample application.

e) **Create my application** - This final step successfully registers your application with Azure and generates an Application ID and Client Secret for your application. **Please save  App ID URI, Callback uri, Application ID, and Client Secret somewhere safe for use in the upcoming steps.**

>NOTE: You can optionally manually register your application in Azure Portal, where you will get a Client ID and set an App ID URI. Refer to [Registration in Azure Active Directory](https://github.com/OfficeDev/skype-docs/blob/master/Skype/Trusted-Application-API/docs/RegistrationInAzureActiveDirectory.md) for details.

<a name="Provisioning"></a>
### 2.  Tenant admin consent and Trusted Endpoint creation

The final application registration step 3 of [quick registration tool](https://aka.ms/skypeappregistration)   includes Tenant Admin consent and Trusted Endpoint setup.

a) **Tenant admin consent**

When the application is registered in AAD, it is registered in the context of a tenant.  For a tenant to use the Service Application, for example, when the application is developed as a multi-tenant application, it must be consented to by that tenant's admin. 
    
Follow the instructions in step 3 or refer to [Tenant Admin Consent](https://github.com/OfficeDev/skype-docs/blob/master/Skype/Trusted-Application-API/docs/TenantAdminConsent.md) to provide the tenant consent.
    
b) **Trusted Endpoint setup**
      
Setup application's endpoint by using the following command in the Skype for Business Admin PowerShell. Update the placeholder parameter to a desired SIP Address within your tenant domain. e.g. helpdesk@contoso.com 
    
>Note: These samples require you to assign a service phone number to the applications's endpoint. Anyone can call this number to reach  your application. Please make sure that you have [Aquired the service phone number](../../docs/AquireServiceNumber.md) before running the following PowerShell cmdlet. 
    
```PowerShell
  New-CsOnlineApplicationEndpoint -Uri "sip:sample_endpoint@domain.com" -ApplicationId "Your_Application_ID" -Name "avbridgesample" -PhoneNumber Your_Service_Number
```
    
>Note: Please refer [Setting up a Trusted Application Endpoint](../../docs/TrustedApplicationEndpoint.md) for details on PowerShell cmdlets and related parameters. 

## Running the sample

1. Open the sample project with Visual Studio

2. Modify the web.config as follow:
    
    
| Key  |  Replace the value with  |
| ------------- |:-------------:|
| MyAudienceUri   |  Application's App ID URI (refer step e) of [Registration](#Registration)) 
|MyCallbackUri |   Application' s Callback uri (refer step e) of [Registration](#Registration))  
| ApplicationEndpointId |   The Trusted endpoint's sip uri ID(refer [Trusted Endpoint setup](#Provisioning))  |
| AAD_ClientId |   Application's ID (refer step e) of [Registration](#Registration))     |
| AAD_ClientSecret |   Application's Client Secret value (refer step e) of [Registration](#Registration))    |
|MyAgentList|  sip uri of any agent who should receive the incoming calls|

>Note: The **sip uri** for **ApplicationEndpointId** and **MyAgentList** should belong to the same tenant domain. e.g. ApplicationEndpointId = helpdesk@contoso.com and MyAgentList = abc@contoso.com  

3. Redeploy the sample. Please refer [Update the app and redeploy](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-dotnet#update-the-app-and-redeploy) section for more detail.

4. Call the service phone number associated with the application 