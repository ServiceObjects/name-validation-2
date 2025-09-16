import { NameInfoV2Client } from "../name-validation-2-nodejs/REST/name_info_v2_rest.js";

export async function getNameInfoV2RestGO(licenseKey, isLive) {
    console.log("\n-----------------------------------------");
    console.log("Name Validation 2 - NameInfoV2 - REST SDK");
    console.log("-----------------------------------------");

    const name = "John Smith";
    const option = "1";
    const timeoutSeconds = 15;

    console.log("\n* Input *\n");
    console.log(`Name           : ${name}`);
    console.log(`Option         : ${option}`);
    console.log(`License Key    : ${licenseKey}`);
    console.log(`Is Live        : ${isLive}`);
    console.log(`Timeout Seconds: ${timeoutSeconds}`);

    try {
        const response = await NameInfoV2Client.invoke(
            name,
            option,
            licenseKey,
            isLive,
            timeoutSeconds
        );

        if (response.Error) {
            console.log("\n* Error *\n");
            console.log(`Error Type     : ${response.Error.Type}`);
            console.log(`Error Type Code: ${response.Error.TypeCode}`);
            console.log(`Error Desc     : ${response.Error.Desc}`);
            console.log(`Error Desc Code: ${response.Error.DescCode}`);
            return;
        }

        console.log("\n* Name Info *\n");
        if (response.NameInfoV2) {
            console.log(`Name In               : ${response.NameInfoV2.NameIn}`);
            console.log(`Name Classification   : ${response.NameInfoV2.NameClassification}`);
            console.log(`Prefix                : ${response.NameInfoV2.Prefix}`);
            console.log(`First Name            : ${response.NameInfoV2.FirstName}`);
            console.log(`Middle Name           : ${response.NameInfoV2.MiddleName}`);
            console.log(`Last Name             : ${response.NameInfoV2.LastName}`);
            console.log(`Suffix                : ${response.NameInfoV2.Suffix}`);
            console.log(`First Name Found      : ${response.NameInfoV2.FirstNameFound}`);
            console.log(`Is Common First Name  : ${response.NameInfoV2.IsCommonFirstName}`);
            console.log(`First Name Origin     : ${response.NameInfoV2.FirstNameOrigin}`);
            console.log(`First Name Similar    : ${response.NameInfoV2.FirstNameSimilar}`);
            console.log(`Last Name Found       : ${response.NameInfoV2.LastNameFound}`);
            console.log(`Is Common Last Name   : ${response.NameInfoV2.IsCommonLastName}`);
            console.log(`Last Name Origin      : ${response.NameInfoV2.LastNameOrigin}`);
            console.log(`Last Name Similar     : ${response.NameInfoV2.LastNameSimilar}`);
            console.log(`Gender                : ${response.NameInfoV2.Gender}`);
            console.log(`First Name Alt        : ${response.NameInfoV2.FirstNameAlt}`);
            console.log(`Middle Name Alt       : ${response.NameInfoV2.MiddleNameAlt}`);
            console.log(`Last Name Alt         : ${response.NameInfoV2.LastNameAlt}`);
            console.log(`First Name Alt Found  : ${response.NameInfoV2.FirstNameAltFound}`);
            console.log(`Last Name Alt Found   : ${response.NameInfoV2.LastNameAltFound}`);
            console.log(`Gender Alt            : ${response.NameInfoV2.GenderAlt}`);
            console.log(`Related Names         : ${response.NameInfoV2.RelatedNames}`);
            console.log(`Is Corrected Name     : ${response.NameInfoV2.IsCorrectedName}`);
            console.log(`Is Business Name      : ${response.NameInfoV2.IsBusinessName}`);
            console.log(`Business Name         : ${response.NameInfoV2.BusinessName}`);
            console.log(`Vulgarity Score       : ${response.NameInfoV2.VulgarityScore}`);
            console.log(`Celebrity Score       : ${response.NameInfoV2.CelebrityScore}`);
            console.log(`Bogus Score           : ${response.NameInfoV2.BogusScore}`);
            console.log(`Garbage Score         : ${response.NameInfoV2.GarbageScore}`);
            console.log(`First Name Dict Score : ${response.NameInfoV2.FirstNameDictionaryScore}`);
            console.log(`Middle Name Dict Score: ${response.NameInfoV2.MiddleNameDictionaryScore}`);
            console.log(`Last Name Dict Score  : ${response.NameInfoV2.LastNameDictionaryScore}`);
            console.log(`Overall Name Score    : ${response.NameInfoV2.OverallNameScore}`);
            console.log(`Is Name Good          : ${response.NameInfoV2.IsNameGood}`);
            console.log(`Status Codes          : ${response.NameInfoV2.StatusCodes}`);
            console.log(`Status                : ${response.NameInfoV2.Status}`);

            console.log("\n* Best Guess Name *\n");
            if (response.NameInfoV2.BestGuessName) {
                console.log(`Prefix     : ${response.NameInfoV2.BestGuessName.Prefix}`);
                console.log(`First Name : ${response.NameInfoV2.BestGuessName.FirstName}`);
                console.log(`Middle Name: ${response.NameInfoV2.BestGuessName.MiddleName}`);
                console.log(`Last Name  : ${response.NameInfoV2.BestGuessName.LastName}`);
                console.log(`Suffix     : ${response.NameInfoV2.BestGuessName.Suffix}`);
            } else {
                console.log("No best guess name found.");
            }
        } else {
            console.log("No name info found.");
        }


    } catch (e) {
        console.log(`\nException occurred: ${e.message}`);
    }
}