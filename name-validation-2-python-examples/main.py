from name_info_v2_rest_sdk_example import get_name_info_v2_rest_sdk_go
from name_info_v2_soap_sdk_example import get_name_info_v2_soap_sdk_go

if __name__ == "__main__":  
  # Your license key from Service Objects.  
  # Trial license keys will only work on the trial environments and production  
  # license keys will only work on production environments.  
  license_key = "LICENSE KEY"  
  is_live = False

  # Name Validation 2 - NameInfoV2 - REST SDK
  get_name_info_v2_rest_sdk_go(is_live, license_key)

  # Name Validation 2 - NameInfoV2 - SOAP SDK
  get_name_info_v2_soap_sdk_go(is_live, license_key)
