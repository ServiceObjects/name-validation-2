using name_validation_2_dot_net_examples;

//Your license key from Service Objects.
//Trial license keys will only work on the
//trail environments and production license
//keys will only work on production environments.
string LicenseKey = "LICENSE KEY";

bool IsProductionKey = false;

// Name Validation 2 - NameInfoV2 - REST SDK
NameInfoV2RestSdkExample.Go(LicenseKey, IsProductionKey);

// Name Validation 2 - NameInfoV2 - SOAP SDK
NameInfoV2SoapSdkExample.Go(LicenseKey, IsProductionKey);
 