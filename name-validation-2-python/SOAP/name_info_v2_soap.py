from suds.client import Client
from suds import WebFault
from suds.sudsobject import Object

class NameInfoV2Soap:

    def __init__(self, license_key: str, is_live: bool, timeout_ms: int = 10000):
        """
        license_key: Service Objects NV2 license key.
        is_live: Whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds
        """

        self._timeout_s = timeout_ms / 1000.0
        self._is_live = is_live
        self.license_key = license_key

        # WSDL URLs for primary and backup endpoints
        self._primary_wsdl = (
            "https://sws.serviceobjects.com/NV2/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/NV2/api.svc?wsdl"
        )
        self._backup_wsdl = (
            "https://swsbackup.serviceobjects.com/NV2/api.svc?wsdl"
            if is_live else
            "https://trial.serviceobjects.com/NV2/api.svc?wsdl"
        )

    def get_name_info(self, name: str, option: str) -> Object:
        """
        Calls the Name Validation 2 ValidateNameV2 SOAP API to retrieve name validation information.

        Parameters:
        name (str): The name to validate.
        option (str): Comma-separated list of options for additional processing (optional).
        license_key: Service Objects Name Validation license key.
        is_live: Whether to use live or trial endpoints
        timeout_ms: SOAP call timeout in milliseconds

        Returns:
            Object: Raw SOAP response with name information or error details.
        """

        # Common kwargs for both calls
        call_kwargs = dict(
            Name=name,
            Option=option,
            LicenseKey=self.license_key
        )

        # Attempt primary
        try:
            client = Client(self._primary_wsdl, timeout=self._timeout_s)
            # Override endpoint URL if needed:
            # client.set_options(location=self._primary_wsdl.replace('?wsdl', '/soap'))
            response = client.service.ValidateNameV2(**call_kwargs)

            # If response is None or fatal error code, trigger fallback
            if response is None or (hasattr(response, 'Error') and response.Error and response.Error.TypeCode == '3'):
                raise ValueError("Primary returned no result or fatal Error.TypeCode=3")

            return response

        except (WebFault, ValueError, Exception) as primary_ex:
            try:
                client = Client(self._backup_wsdl, timeout=self._timeout_s)
                response = client.service.ValidateNameV2(**call_kwargs)

                if response is None:
                    raise ValueError("Backup returned no result")

                return response

            except (WebFault, Exception) as backup_ex:
                # Raise a combined error if both attempts fail
                msg = (
                    "Both primary and backup endpoints failed.\n"
                    f"Primary error: {str(primary_ex)}\n"
                    f"Backup error: {str(backup_ex)}"
                )
                raise RuntimeError(msg)