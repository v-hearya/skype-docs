 ## Acquire and assign service phone number
 
 This section will help you aquire a service phone number and assign it to the service application's endpoint for receiving incoming calls from the PSTN.
 
## Getting the service phone number

1. Go to [Office 365 admin center](https://portal.office.com/adminportal/home).
2. Sign in using the tenant credentials. 
3. Click the **Admin Centers** tab in the left  column and select **Skype for Business** option.
  
  ![alt text](images/ServiceNumberPicture1.png "image")

4. In left column, select **Voice** -> **Phone Numbers**

  ![alt text](images/ServiceNumberPicture2.png "image")

5. Click **+** button at the top and then select **New Service Numbers** to add a new service phone number.

  ![alt text](images/ServiceNumberPicture3.png "image")

6. Fill in all the required information and click **add**

  ![alt text](images/ServiceNumberPicture4.png "image")

7. Now click **acquire numbers** to confirm.

  ![alt text](images/ServiceNumberPicture5.png "image")


8. Once you acquire the service number by following the above mentioned steps, It will be added to the list of **[Phone Numbers](https://admin0a.online.lync.com/LSCP/Voice.aspx)**.

  ![alt text](images/ServiceNumberPicture2.png "image")

9. Go throught this **Phone Numbers** list and find the phone number that is **Unassigned** and has **Number Type as Service**. This is the phone number that we will assign to the application's endpoint and anyone can call this number to reach the application. 

## Assigning the service phone number to application's endpoint

Once you acquire the service phone number by following the above mentioned steps, it can easily be assigned to the application's endpoint by using the PowerShell cmdlets. You will need to complete the following steps to run the admin PowerShell:

1. [Download and install the Skype for Business Online Connector module](http://go.microsoft.com/fwlink/?LinkId=294688)

2. Open Windows PowerShell as Administrator and run the following:

```PowerShell
Import-PSSession (New-CsOnlineSession -Credential Get-Credential)
```

3. You will be prompted with windows PowerShell credential dialog box. Sign in using the tenant credentials.

4. Use the following PowerShell cmdlet to create new application endpoint and assign  the service phone number.  

```PowerShell
  New-CsOnlineApplicationEndpoint -Uri "sip:avbridgetest@metio.onmicrosoft.com" -ApplicationId "8f851ab7-e245-4ec2-ac8f-7db14cc8fcf7" -Name "AVBridgeTest" -PhoneNumber +14256160796

```
   Alternatively, you can update the existing application endpoint's phone number by using the following cmdlet.
  
  ```PowerShell
    Set-CsOnlineApplicationEndpoint -PhoneNumber +14256160796
  ```
>Note: Please refer [Setting up a Trusted Application Endpoint](./TrustedApplicationEndpoint.md) for details on PowerShell cmdlets and related parameters. 
