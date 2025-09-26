![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# NV2 - Name Validation 2

DOTS Name Validation 2 is an XML and JSON RESTful web service that provides information about a person’s name. With DOTS Name Validation 2, users can validate names, verify name accuracy, fix unordered names and return gender information.

## [Service Objects Website](https://serviceobjects.com)

# NV2 - NameInfoV2

Uses the provided name to return information such as classification, gender if a person, origin, similar names, related names and validity results

### [NameInfoV2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-name-validation-2/nv2-operations/nv2-nameinfov2-recommended/)

## Library Usage

```
// 1. Instantiate the service wrapper
 var nv2 = new NameInfoV2Validation(isLive);

// 2. Build the input
//  Required fields:
//               LicenseKey
//               IsLive
// 
// Optional:
//       Name
//       Option
//       TimeoutSeconds (default: 15)

using name_validation_2_dot_net.SOAP;

// 3 Call the service
string Name = "John Smith";
string Option = "1";
string LicenseKey = "YOUR LICENSE KEY";

NameInfoV2Response response = nv2.ValidateNameV2(Name, Option, licenseKey).Result;

// 4. Inspect results.
if (response.Error is null)
{
    if (response.NameInfoV2 != null)
    {
        Console.WriteLine("\r\n* Name Info *\r\n");
        Console.WriteLine($"Name In               : {response.NameInfoV2.NameIn}");
        Console.WriteLine($"Name Classification   : {response.NameInfoV2.NameClassification}");
        Console.WriteLine($"Prefix                : {response.NameInfoV2.Prefix}");
        Console.WriteLine($"First Name            : {response.NameInfoV2.FirstName}");
        Console.WriteLine($"Middle Name           : {response.NameInfoV2.MiddleName}");
        Console.WriteLine($"Last Name             : {response.NameInfoV2.LastName}");
        Console.WriteLine($"Suffix                : {response.NameInfoV2.Suffix}");
        Console.WriteLine($"First Name Found      : {response.NameInfoV2.FirstNameFound}");
        Console.WriteLine($"Is Common First Name  : {response.NameInfoV2.IsCommonFirstName}");
        Console.WriteLine($"First Name Origin     : {response.NameInfoV2.FirstNameOrigin}");
        Console.WriteLine($"First Name Similar    : {response.NameInfoV2.FirstNameSimilar}");
        Console.WriteLine($"Last Name Found       : {response.NameInfoV2.LastNameFound}");
        Console.WriteLine($"Is Common Last Name   : {response.NameInfoV2.IsCommonLastName}");
        Console.WriteLine($"Last Name Origin      : {response.NameInfoV2.LastNameOrigin}");
        Console.WriteLine($"Last Name Similar     : {response.NameInfoV2.LastNameSimilar}");
        Console.WriteLine($"Gender                : {response.NameInfoV2.Gender}");
        Console.WriteLine($"First Name Alt        : {response.NameInfoV2.FirstNameAlt}");
        Console.WriteLine($"Middle Name Alt       : {response.NameInfoV2.MiddleNameAlt}");
        Console.WriteLine($"Last Name Alt         : {response.NameInfoV2.LastNameAlt}");
        Console.WriteLine($"First Name Alt Found  : {response.NameInfoV2.FirstNameAltFound}");
        Console.WriteLine($"Last Name Alt Found   : {response.NameInfoV2.LastNameAltFound}");
        Console.WriteLine($"Gender Alt            : {response.NameInfoV2.GenderAlt}");
        Console.WriteLine($"Related Names         : {response.NameInfoV2.RelatedNames}");
        Console.WriteLine($"Is Corrected Name     : {response.NameInfoV2.IsCorrectedName}");
        Console.WriteLine($"Is Business Name      : {response.NameInfoV2.IsBusinessName}");
        Console.WriteLine($"Business Name         : {response.NameInfoV2.BusinessName}");
        Console.WriteLine($"Vulgarity Score       : {response.NameInfoV2.VulgarityScore}");
        Console.WriteLine($"Celebrity Score       : {response.NameInfoV2.CelebrityScore}");
        Console.WriteLine($"Bogus Score           : {response.NameInfoV2.BogusScore}");
        Console.WriteLine($"Garbage Score         : {response.NameInfoV2.GarbageScore}");
        Console.WriteLine($"First Name Dict Score : {response.NameInfoV2.FirstNameDictionaryScore}");
        Console.WriteLine($"Middle Name Dict Score: {response.NameInfoV2.MiddleNameDictionaryScore}");
        Console.WriteLine($"Last Name Dict Score  : {response.NameInfoV2.LastNameDictionaryScore}");
        Console.WriteLine($"Overall Name Score    : {response.NameInfoV2.OverallNameScore}");
        Console.WriteLine($"Is Name Good          : {response.NameInfoV2.IsNameGood}");
        Console.WriteLine($"Status Codes          : {response.NameInfoV2.StatusCodes}");
        Console.WriteLine($"Status                : {response.NameInfoV2.Status}");

        Console.WriteLine("\r\n* Best Guess Name *\r\n");
        if (response.NameInfoV2.BestGuessName != null)
        {
            Console.WriteLine($"Prefix     : {response.NameInfoV2.BestGuessName.Prefix}");
            Console.WriteLine($"First Name : {response.NameInfoV2.BestGuessName.FirstName}");
            Console.WriteLine($"Middle Name: {response.NameInfoV2.BestGuessName.MiddleName}");
            Console.WriteLine($"Last Name  : {response.NameInfoV2.BestGuessName.LastName}");
            Console.WriteLine($"Suffix     : {response.NameInfoV2.BestGuessName.Suffix}");
        }
        else
        {
            Console.WriteLine("No best guess name found.");
        }
    }
    else
    {
        Console.WriteLine("No name info found.");
    }
}
else
{
    Console.WriteLine("\r\n* Error *\r\n");
    Console.WriteLine($"Error Type     : {response.Error.Type}");
    Console.WriteLine($"Error Type Code: {response.Error.TypeCode}");
    Console.WriteLine($"Error Desc     : {response.Error.Desc}");
    Console.WriteLine($"Error Desc Code: {response.Error.DescCode}");
}
```

