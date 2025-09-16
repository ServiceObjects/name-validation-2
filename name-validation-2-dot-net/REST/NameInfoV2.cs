
namespace name_validation_2_dot_net.REST
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects DOTS Name Validation 2 REST API's NameInfoV2 endpoint,
    /// retrieving name validation information (e.g., name parsing, gender, scores) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class NameInfoV2Client
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/NV2/api.svc/";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/NV2/api.svc/";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/NV2/api.svc/";

        /// <summary>
        /// Synchronously calls the NameInfoV2 REST endpoint to retrieve name validation information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including name, option, license key.</param>
        /// <returns>Deserialized <see cref="NameInfoV2Response"/>.</returns>
        public static NameInfoV2Response Invoke(GetNameInfoInput input)
        {
            // Use query string parameters so missing/optional fields don't break
            // the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            NameInfoV2Response response = Helper.HttpGet<NameInfoV2Response>(url, input.TimeoutSeconds);

            // Fallback on error in live mode
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                NameInfoV2Response fallbackResponse = Helper.HttpGet<NameInfoV2Response>(fallbackUrl, input.TimeoutSeconds);
                return fallbackResponse;
            }

            return response;
        }

        /// <summary>
        /// Asynchronously calls the NameInfoV2 REST endpoint to retrieve name validation information,
        /// attempting the primary endpoint first and falling back to the backup if the response is invalid
        /// (Error.TypeCode == "3") in live mode.
        /// </summary>
        /// <param name="input">The input parameters including name, option, license key.</param>
        /// <returns>Deserialized <see cref="NameInfoV2Response"/>.</returns>
        public static async Task<NameInfoV2Response> InvokeAsync(GetNameInfoInput input)
        {
            // Use query string parameters so missing/optional fields don't break
            // the URL as path parameters would.
            string url = BuildUrl(input, input.IsLive ? LiveBaseUrl : TrialBaseUrl);
            NameInfoV2Response response = await Helper.HttpGetAsync<NameInfoV2Response>(url, input.TimeoutSeconds).ConfigureAwait(false);
            if (input.IsLive && !IsValid(response))
            {
                string fallbackUrl = BuildUrl(input, BackupBaseUrl);
                NameInfoV2Response fallbackResponse = await Helper.HttpGetAsync<NameInfoV2Response>(fallbackUrl, input.TimeoutSeconds).ConfigureAwait(false);
                return fallbackResponse;
            }

            return response;
        }

        // Build the full request URL, including URL-encoded query string
        public static string BuildUrl(GetNameInfoInput input, string baseUrl)
        {
            string qs = "NameInfoV2?" +
                        $"Name={Helper.UrlEncode(input.Name)}" +
                        $"&Option={Helper.UrlEncode(input.Option)}" +
                        $"&LicenseKey={Helper.UrlEncode(input.LicenseKey)}" +
                        "&format=json";
            return baseUrl + qs;
        }

        private static bool IsValid(NameInfoV2Response response) =>
            response?.Error == null || response.Error.TypeCode != "3";

        /// <summary>
        /// This is the primary operation for validating and parsing a name. Given a name and optional parameters,
        /// </summary>
        /// <param name="Name">The name to validate (required).</param>
        /// <param name="Option">Comma-separated list of options for additional processing (optional).</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <param name="IsLive">Option to use live service or trial service.</param>
        /// <param name="TimeoutSeconds">Timeout, in seconds, for the call to the service.</param>
        public record GetNameInfoInput(
            string Name = "",
            string Option = "",
            string LicenseKey = "",
            bool IsLive = true,
            int TimeoutSeconds = 15
        );
    }
}