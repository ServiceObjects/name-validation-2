import { soap } from 'strong-soap';
import { NameInfoV2Response } from './nv2_response.js';

/**
 * <summary>
 * A class that provides functionality to call the ServiceObjects Name Validation 2 SOAP service's NameInfoV2 endpoint,
 * retrieving name validation information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
class NameInfoV2Soap {
    /**
     * <summary>
     * Initializes a new instance of the NameInfoV2Soap class with the provided input parameters,
     * setting up primary and backup WSDL URLs based on the live/trial mode.
     * </summary>
     * @param {string} Name - The name to validate.
     * @param {string} Option - Comma-separated list of options for additional processing (optional).
     * @param {string} LicenseKey - Your license key to use the service.
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @throws {Error} Thrown if LicenseKey is empty or null.
     */
    constructor(Name, Option = '', LicenseKey, isLive = true, timeoutSeconds = 15) {
        if (!LicenseKey) {
            throw new Error("LicenseKey is required and cannot be empty or null.");
        }

        this.args = {
            Name,
            Option,
            LicenseKey
        };

        this.isLive = isLive;
        this.timeoutSeconds = timeoutSeconds;

        this.LiveBaseUrl = "https://sws.serviceobjects.com/NV2/api.svc?wsdl";
        this.BackupBaseUrl = "https://swsbackup.serviceobjects.com/NV2/api.svc?wsdl";
        this.TrialBaseUrl = "https://trial.serviceobjects.com/NV2/api.svc?wsdl";

        this._primaryWsdl = this.isLive ? this.LiveBaseUrl : this.TrialBaseUrl;
        this._backupWsdl = this.isLive ? this.BackupBaseUrl : this.TrialBaseUrl;
    }

    /**
     * <summary>
     * Asynchronously calls the NameInfoV2 SOAP endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode
     * or if the primary call fails.
     * </summary>
     * <returns type="Promise<NameInfoV2Response>">A promise that resolves to a NameInfoV2Response object containing name validation details or an error.</returns>
     * <exception cref="Error">Thrown if both primary and backup calls fail, with detailed error messages.</exception>
     */
    async getNameInfo() {
        try {
            const primaryResult = await this._callSoap(this._primaryWsdl, this.args);

            if (this.isLive && !this._isValid(primaryResult)) {
                console.warn("Primary returned Error.TypeCode == '3', falling back to backup...");
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            }

            return primaryResult;
        } catch (primaryErr) {
            try {
                const backupResult = await this._callSoap(this._backupWsdl, this.args);
                return backupResult;
            } catch (backupErr) {
                throw new Error(`Both primary and backup calls failed:\nPrimary: ${primaryErr.message}\nBackup: ${backupErr.message}`);
            }
        }
    }

    /**
     * <summary>
     * Performs a SOAP service call to the specified WSDL URL with the given arguments,
     * creating a client and processing the response into a NameInfoV2Response object.
     * </summary>
     * <param name="wsdlUrl" type="string">The WSDL URL of the SOAP service endpoint (primary or backup).</param>
     * <param name="args" type="Object">The arguments to pass to the NameInfoV2 method.</param>
     * <returns type="Promise<NameInfoV2Response>">A promise that resolves to a NameInfoV2Response object containing the SOAP response data.</returns>
     * <exception cref="Error">Thrown if the SOAP client creation fails, the service call fails, or the response cannot be parsed.</exception>
     */
    _callSoap(wsdlUrl, args) {
        return new Promise((resolve, reject) => {
            soap.createClient(wsdlUrl, { timeout: this.timeoutSeconds * 1000 }, (err, client) => {
                if (err) return reject(err);

                client.ValidateNameV2(args, (err, result) => {
                    const rawData = result?.ValidateNameV2Result;
                    try {
                        if (!rawData) {
                            return reject(new Error("SOAP response is empty or undefined."));
                        }
                        const parsed = new NameInfoV2Response(rawData);
                        resolve(parsed);
                    } catch (parseErr) {
                        reject(new Error(`Failed to parse SOAP response: ${parseErr.message}`));
                    }
                });
            });
        });
    }

    /**
     * <summary>
     * Checks if a SOAP response is valid by verifying that it exists and either has no Error object
     * or the Error.TypeCode is not equal to '3'.
     * </summary>
     * <param name="response" type="NameInfoV2Response">The NameInfoV2Response object to validate.</param>
     * <returns type="boolean">True if the response is valid, false otherwise.</returns>
     */
    _isValid(response) {
        return response && (!response.Error || response.Error.TypeCode !== "3");
    }
}

export { NameInfoV2Soap };