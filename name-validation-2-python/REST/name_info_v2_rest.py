
import requests
from nv2_response import NameInfoV2Response, NameInfoV2, BestGuessName, Error

# Endpoint URLs for Name Validation 2 NameInfoV2 REST API
primary_url = 'https://sws.serviceobjects.com/NV2/api.svc/NameInfoV2?'
backup_url = 'https://swsbackup.serviceobjects.com/NV2/api.svc/NameInfoV2?'
trial_url = 'https://trial.serviceobjects.com/NV2/api.svc/NameInfoV2?'

def get_name_info_v2(
    name: str,
    option: str,
    license_key: str,
    is_live: bool = True,
    timeout_seconds: int = 15
) -> NameInfoV2Response:
    """
    Call Name Validation 2 NameInfoV2 API to retrieve name validation information.

    Parameters:
        name: The name to validate.
        option: Comma-separated list of options for additional processing (optional).
        license_key: Your license key to use the service.
        is_live: Value to determine whether to use the live or trial servers (default: True).
        timeout_seconds: Timeout, in seconds, for the call to the service (default: 15).

    Returns:
        NameInfoV2Response: Parsed JSON response with name information or error details.
    """
    params = {
        'Name': name,
        'Option': option,
        'LicenseKey': license_key,
        'format': 'json' 
    }

    # Select the base URL: production vs trial
    url = primary_url if is_live else trial_url

    # Attempt primary (or trial) endpoint first
    try:
        response = requests.get(url, params=params, timeout=timeout_seconds)
        response.raise_for_status()
        data = response.json()

        # If API returned an error in JSON payload, trigger fallback
        error = getattr(response, 'Error', None)
        if not (error is None or getattr(error, 'TypeCode', None) != "3"):
            if is_live:
                # Try backup URL
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()

            # If still error, propagate exception
            if 'Error' in data:
                raise RuntimeError(f"NV2 service error: {data['Error']}")

            else:
                # Trial mode error is terminal
                raise RuntimeError(f"NV2 trial error: {data['Error']}")

        # Convert JSON response to NameInfoV2Response for structured access
        error = Error(**data.get('Error', {})) if data.get('Error') else None
        name_info_v2 = None
        if data.get('NameInfoV2'):
            best_guess_name = BestGuessName(**data['NameInfoV2'].get('BestGuessName', {})) if data['NameInfoV2'].get('BestGuessName') else None
            name_info_v2 = NameInfoV2(
                BestGuessName=best_guess_name,
                NameIn=data['NameInfoV2'].get('NameIn'),
                NameClassification=data['NameInfoV2'].get('NameClassification'),
                Prefix=data['NameInfoV2'].get('Prefix'),
                FirstName=data['NameInfoV2'].get('FirstName'),
                MiddleName=data['NameInfoV2'].get('MiddleName'),
                LastName=data['NameInfoV2'].get('LastName'),
                Suffix=data['NameInfoV2'].get('Suffix'),
                FirstNameFound=data['NameInfoV2'].get('FirstNameFound'),
                IsCommonFirstName=data['NameInfoV2'].get('IsCommonFirstName'),
                FirstNameOrigin=data['NameInfoV2'].get('FirstNameOrigin'),
                FirstNameSimilar=data['NameInfoV2'].get('FirstNameSimilar'),
                LastNameFound=data['NameInfoV2'].get('LastNameFound'),
                IsCommonLastName=data['NameInfoV2'].get('IsCommonLastName'),
                LastNameOrigin=data['NameInfoV2'].get('LastNameOrigin'),
                LastNameSimilar=data['NameInfoV2'].get('LastNameSimilar'),
                Gender=data['NameInfoV2'].get('Gender'),
                FirstNameAlt=data['NameInfoV2'].get('FirstNameAlt'),
                MiddleNameAlt=data['NameInfoV2'].get('MiddleNameAlt'),
                LastNameAlt=data['NameInfoV2'].get('LastNameAlt'),
                FirstNameAltFound=data['NameInfoV2'].get('FirstNameAltFound'),
                LastNameAltFound=data['NameInfoV2'].get('LastNameAltFound'),
                GenderAlt=data['NameInfoV2'].get('GenderAlt'),
                RelatedNames=data['NameInfoV2'].get('RelatedNames'),
                IsCorrectedName=data['NameInfoV2'].get('IsCorrectedName'),
                IsBusinessName=data['NameInfoV2'].get('IsBusinessName'),
                BusinessName=data['NameInfoV2'].get('BusinessName'),
                VulgarityScore=data['NameInfoV2'].get('VulgarityScore'),
                CelebrityScore=data['NameInfoV2'].get('CelebrityScore'),
                BogusScore=data['NameInfoV2'].get('BogusScore'),
                GarbageScore=data['NameInfoV2'].get('GarbageScore'),
                FirstNameDictionaryScore=data['NameInfoV2'].get('FirstNameDictionaryScore'),
                MiddleNameDictionaryScore=data['NameInfoV2'].get('MiddleNameDictionaryScore'),
                LastNameDictionaryScore=data['NameInfoV2'].get('LastNameDictionaryScore'),
                OverallNameScore=data['NameInfoV2'].get('OverallNameScore'),
                IsNameGood=data['NameInfoV2'].get('IsNameGood'),
                StatusCodes=data['NameInfoV2'].get('StatusCodes'),
                Status=data['NameInfoV2'].get('Status')
            )

        return NameInfoV2Response(
            NameInfoV2=name_info_v2,
            Error=error
        )

    except requests.RequestException as req_exc:
        # Network or HTTP-level error occurred
        if is_live:
            try:
                # Fallback to backup URL on network failure
                response = requests.get(backup_url, params=params, timeout=timeout_seconds)
                response.raise_for_status()
                data = response.json()
                if 'Error' in data:
                    raise RuntimeError(f"NV2 backup error: {data['Error']}") from req_exc

                # Convert JSON response to NameInfoV2Response for structured access
                error = Error(**data.get('Error', {})) if data.get('Error') else None
                name_info_v2 = None
                if data.get('NameInfoV2'):
                    best_guess_name = BestGuessName(**data['NameInfoV2'].get('BestGuessName', {})) if data['NameInfoV2'].get('BestGuessName') else None
                    name_info_v2 = NameInfoV2(
                        BestGuessName=best_guess_name,
                        NameIn=data['NameInfoV2'].get('NameIn'),
                        NameClassification=data['NameInfoV2'].get('NameClassification'),
                        Prefix=data['NameInfoV2'].get('Prefix'),
                        FirstName=data['NameInfoV2'].get('FirstName'),
                        MiddleName=data['NameInfoV2'].get('MiddleName'),
                        LastName=data['NameInfoV2'].get('LastName'),
                        Suffix=data['NameInfoV2'].get('Suffix'),
                        FirstNameFound=data['NameInfoV2'].get('FirstNameFound'),
                        IsCommonFirstName=data['NameInfoV2'].get('IsCommonFirstName'),
                        FirstNameOrigin=data['NameInfoV2'].get('FirstNameOrigin'),
                        FirstNameSimilar=data['NameInfoV2'].get('FirstNameSimilar'),
                        LastNameFound=data['NameInfoV2'].get('LastNameFound'),
                        IsCommonLastName=data['NameInfoV2'].get('IsCommonLastName'),
                        LastNameOrigin=data['NameInfoV2'].get('LastNameOrigin'),
                        LastNameSimilar=data['NameInfoV2'].get('LastNameSimilar'),
                        Gender=data['NameInfoV2'].get('Gender'),
                        FirstNameAlt=data['NameInfoV2'].get('FirstNameAlt'),
                        MiddleNameAlt=data['NameInfoV2'].get('MiddleNameAlt'),
                        LastNameAlt=data['NameInfoV2'].get('LastNameAlt'),
                        FirstNameAltFound=data['NameInfoV2'].get('FirstNameAltFound'),
                        LastNameAltFound=data['NameInfoV2'].get('LastNameAltFound'),
                        GenderAlt=data['NameInfoV2'].get('GenderAlt'),
                        RelatedNames=data['NameInfoV2'].get('RelatedNames'),
                        IsCorrectedName=data['NameInfoV2'].get('IsCorrectedName'),
                        IsBusinessName=data['NameInfoV2'].get('IsBusinessName'),
                        BusinessName=data['NameInfoV2'].get('BusinessName'),
                        VulgarityScore=data['NameInfoV2'].get('VulgarityScore'),
                        CelebrityScore=data['NameInfoV2'].get('CelebrityScore'),
                        BogusScore=data['NameInfoV2'].get('BogusScore'),
                        GarbageScore=data['NameInfoV2'].get('GarbageScore'),
                        FirstNameDictionaryScore=data['NameInfoV2'].get('FirstNameDictionaryScore'),
                        MiddleNameDictionaryScore=data['NameInfoV2'].get('MiddleNameDictionaryScore'),
                        LastNameDictionaryScore=data['NameInfoV2'].get('LastNameDictionaryScore'),
                        OverallNameScore=data['NameInfoV2'].get('OverallNameScore'),
                        IsNameGood=data['NameInfoV2'].get('IsNameGood'),
                        StatusCodes=data['NameInfoV2'].get('StatusCodes'),
                        Status=data['NameInfoV2'].get('Status')
                    )

                return NameInfoV2Response(
                    NameInfoV2=name_info_v2,
                    Error=error
                )
            except Exception as backup_exc:
                raise RuntimeError("NV2 service unreachable on both endpoints") from backup_exc
        else:
            raise RuntimeError(f"NV2 trial error: {str(req_exc)}") from req_exc