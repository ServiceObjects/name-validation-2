import { getNameInfoV2RestGO } from "./name_info_v2_rest_sdk_example.js";
import { getNameInfoV2SoapGO } from "./name_info_v2_soap_sdk_example.js";

export async function main() {
    const licenseKey = "LICENSE KEY";
    const isLive = false; 

    // Name Validation 2 - NameInfoV2 - REST SDK
    await getNameInfoV2RestGO(licenseKey, isLive);

    // Name Validation 2 - NameInfoV2 - SOAP SDK
     await getNameInfoV2SoapGO(licenseKey, isLive);
}
main().catch((err) => console.error("Error:", err));