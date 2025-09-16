![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# NV2 - Name Validation 2

DOTS Name Validation 2 is an XML and JSON RESTful web service that provides information about a person’s name. With DOTS Name Validation 2, users can validate names, verify name accuracy, fix unordered names and return gender information.

## [Service Objects Website](https://serviceobjects.com)

# NV2 - NameInfoV2

Uses the provided name to return information such as classification, gender if a person, origin, similar names, related names and validity results

### [NameInfoV2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-name-validation-2/nv2-operations/nv2-nameinfov2-recommended/)

## Library Usage

```
# 1. Build the input
#
#  Required fields:
#               LicenseKey
#               IsLive
# 
#  Optional:
#       Name
#       Option
#       TimeoutSeconds (default: 15)

 name = "John Smith";
 option = "1";
 timeoutSeconds = 15;

from name_info_v2_rest import get_name_info_v2

# 2. Call the sync Invoke() method.
 response = get_name_info_v2(
            name, option, license_key, is_live, timeout_seconds
        )

# 3. Inspect results.
if response.Error is None:
    print("\n* Name Info *\n")
    if response.NameInfoV2:
        print(f"Name In               : {response.NameInfoV2.NameIn}")
        print(f"Name Classification   : {response.NameInfoV2.NameClassification}")
        print(f"Prefix                : {response.NameInfoV2.Prefix}")
        print(f"First Name            : {response.NameInfoV2.FirstName}")
        print(f"Middle Name           : {response.NameInfoV2.MiddleName}")
        print(f"Last Name             : {response.NameInfoV2.LastName}")
        print(f"Suffix                : {response.NameInfoV2.Suffix}")
        print(f"First Name Found      : {response.NameInfoV2.FirstNameFound}")
        print(f"Is Common First Name  : {response.NameInfoV2.IsCommonFirstName}")
        print(f"First Name Origin     : {response.NameInfoV2.FirstNameOrigin}")
        print(f"First Name Similar    : {response.NameInfoV2.FirstNameSimilar}")
        print(f"Last Name Found       : {response.NameInfoV2.LastNameFound}")
        print(f"Is Common Last Name   : {response.NameInfoV2.IsCommonLastName}")
        print(f"Last Name Origin      : {response.NameInfoV2.LastNameOrigin}")
        print(f"Last Name Similar     : {response.NameInfoV2.LastNameSimilar}")
        print(f"Gender                : {response.NameInfoV2.Gender}")
        print(f"First Name Alt        : {response.NameInfoV2.FirstNameAlt}")
        print(f"Middle Name Alt       : {response.NameInfoV2.MiddleNameAlt}")
        print(f"Last Name Alt         : {response.NameInfoV2.LastNameAlt}")
        print(f"First Name Alt Found  : {response.NameInfoV2.FirstNameAltFound}")
        print(f"Last Name Alt Found   : {response.NameInfoV2.LastNameAltFound}")
        print(f"Gender Alt            : {response.NameInfoV2.GenderAlt}")
        print(f"Related Names         : {response.NameInfoV2.RelatedNames}")
        print(f"Is Corrected Name     : {response.NameInfoV2.IsCorrectedName}")
        print(f"Is Business Name      : {response.NameInfoV2.IsBusinessName}")
        print(f"Business Name         : {response.NameInfoV2.BusinessName}")
        print(f"Vulgarity Score       : {response.NameInfoV2.VulgarityScore}")
        print(f"Celebrity Score       : {response.NameInfoV2.CelebrityScore}")
        print(f"Bogus Score           : {response.NameInfoV2.BogusScore}")
        print(f"Garbage Score         : {response.NameInfoV2.GarbageScore}")
        print(f"First Name Dict Score : {response.NameInfoV2.FirstNameDictionaryScore}")
        print(f"Middle Name Dict Score: {response.NameInfoV2.MiddleNameDictionaryScore}")
        print(f"Last Name Dict Score  : {response.NameInfoV2.LastNameDictionaryScore}")
        print(f"Overall Name Score    : {response.NameInfoV2.OverallNameScore}")
        print(f"Is Name Good          : {response.NameInfoV2.IsNameGood}")
        print(f"Status Codes          : {response.NameInfoV2.StatusCodes}")
        print(f"Status                : {response.NameInfoV2.Status}")

        print("\n* Best Guess Name *\n")
        if response.NameInfoV2.BestGuessName:
            print(f"Prefix     : {response.NameInfoV2.BestGuessName.Prefix}")
            print(f"First Name : {response.NameInfoV2.BestGuessName.FirstName}")
            print(f"Middle Name: {response.NameInfoV2.BestGuessName.MiddleName}")
            print(f"Last Name  : {response.NameInfoV2.BestGuessName.LastName}")
            print(f"Suffix     : {response.NameInfoV2.BestGuessName.Suffix}")
        else:
            print("No best guess name found.")
    else:
        print("No name info found.")
else:
    print("\n* Error *\n")
    print(f"Error Type       : {response.Error.Type}")
    print(f"Error Type Code  : {response.Error.TypeCode}")
    print(f"Error Description: {response.Error.Desc}")
    print(f"Error Desc Code  : {response.Error.DescCode}")
```

