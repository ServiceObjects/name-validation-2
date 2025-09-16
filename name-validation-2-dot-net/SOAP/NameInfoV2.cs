using NV2Reference;

namespace name_validation_2_dot_net.SOAP
{
    /// <summary>
    /// Provides functionality to call the ServiceObjects DOTS Name Validation 2 SOAP service's ValidateNameV2 operation,
    /// retrieving name validation information (e.g., name parsing, gender, scores) with fallback to a backup endpoint
    /// for reliability in live mode.
    /// </summary>
    public class NameInfoV2Validation
    {
        private const string LiveBaseUrl = "https://sws.serviceobjects.com/NV2/api.svc/soap";
        private const string BackupBaseUrl = "https://swsbackup.serviceobjects.com/NV2/api.svc/soap";
        private const string TrialBaseUrl = "https://trial.serviceobjects.com/NV2/api.svc/soap";

        private readonly string _primaryUrl;
        private readonly string _backupUrl;
        private readonly int _timeoutMs;
        private readonly bool _isLive;

        /// <summary>
        /// Initializes URLs/timeout/IsLive.
        /// </summary>
        public NameInfoV2Validation(bool isLive)
        {
            _timeoutMs = 10000; 
            _isLive = isLive;

            _primaryUrl = isLive ? LiveBaseUrl : TrialBaseUrl;
            _backupUrl = isLive ? BackupBaseUrl : TrialBaseUrl;

            if (string.IsNullOrWhiteSpace(_primaryUrl))
                throw new InvalidOperationException("Primary URL not set.");
            if (string.IsNullOrWhiteSpace(_backupUrl))
                throw new InvalidOperationException("Backup URL not set.");
        }

        /// <summary>
        /// This is the primary operation for validating and parsing a name. Given a name and optional parameters,
        /// </summary>
        /// <param name="Name">The name to validate (required).</param>
        /// <param name="Option">Comma-separated list of options for additional processing (optional).</param>
        /// <param name="LicenseKey">Your license key to use the service.</param>
        /// <returns>A <see cref="Task{NameInfoV2Response}"/> containing an <see cref="NameInfoV2Response"/> object with name validation details or an error.</returns>
        /// <exception cref="Exception">Thrown if both primary and backup endpoints fail.</exception>
        public async Task<NameInfoV2Response> ValidateNameV2(string Name, string Option, string LicenseKey)
        {
            NV2LibraryClient clientPrimary = null;
            NV2LibraryClient clientBackup = null;

            try
            {
                // Attempt primary endpoint
                clientPrimary = new NV2LibraryClient();
                clientPrimary.Endpoint.Address = new System.ServiceModel.EndpointAddress(_primaryUrl);
                clientPrimary.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                NameInfoV2Response response = await clientPrimary.ValidateNameV2Async(
                    Name, Option, LicenseKey).ConfigureAwait(false);

                if (_isLive && !IsValid(response))
                {
                    throw new InvalidOperationException("Primary endpoint returned null or a fatal TypeCode=3 error for ValidateNameV2");
                }
                return response;
            }
            catch (Exception primaryEx)
            {
                try
                {
                    clientBackup = new NV2LibraryClient();
                    clientBackup.Endpoint.Address = new System.ServiceModel.EndpointAddress(_backupUrl);
                    clientBackup.InnerChannel.OperationTimeout = TimeSpan.FromMilliseconds(_timeoutMs);

                    return await clientBackup.ValidateNameV2Async(
                        Name, Option, LicenseKey).ConfigureAwait(false);
                }
                catch (Exception backupEx)
                {
                    throw new Exception(
                        $"Both primary and backup endpoints failed.\n" +
                        $"Primary error: {primaryEx.Message}\n" +
                        $"Backup error: {backupEx.Message}");
                }
                finally
                {
                    clientBackup?.Close();
                }
            }
            finally
            {
                clientPrimary?.Close();
            }
        }

        private static bool IsValid(NameInfoV2Response response) =>
            response?.Error == null || response.Error.TypeCode != "3";
    }
}