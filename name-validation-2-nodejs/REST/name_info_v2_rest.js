import axios from 'axios';
import querystring from 'querystring';
import { NameInfoV2Response } from './nv2_response.js';

/**
 * @constant
 * @type {string}
 * @description The base URL for the live ServiceObjects Name Validation 2 API service.
 */
const LiveBaseUrl = 'https://sws.serviceobjects.com/NV2/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the backup ServiceObjects Name Validation 2 API service.
 */
const BackupBaseUrl = 'https://swsbackup.serviceobjects.com/NV2/api.svc/';

/**
 * @constant
 * @type {string}
 * @description The base URL for the trial ServiceObjects Name Validation 2 API service.
 */
const TrialBaseUrl = 'https://trial.serviceobjects.com/NV2/api.svc/';

/**
 * <summary>
 * Checks if a response from the API is valid by verifying that it either has no Error object
 * or the Error.TypeCode is not equal to '3'.
 * </summary>
 * <param name="response" type="Object">The API response object to validate.</param>
 * <returns type="boolean">True if the response is valid, false otherwise.</returns>
 */
const isValid = (response) => !response?.Error || response.Error.TypeCode !== '3';

/**
 * <summary>
 * Constructs a full URL for the NameInfoV2 API endpoint by combining the base URL
 * with query parameters derived from the input parameters.
 * </summary>
 * <param name="params" type="Object">An object containing all the input parameters.</param>
 * <param name="baseUrl" type="string">The base URL for the API service (live, backup, or trial).</param>
 * <returns type="string">The constructed URL with query parameters.</returns>
 */
const buildUrl = (params, baseUrl) =>
    `${baseUrl}NameInfoV2?${querystring.stringify(params)}&format=json`;

/**
 * <summary>
 * Performs an HTTP GET request to the specified URL with a given timeout.
 * </summary>
 * <param name="url" type="string">The URL to send the GET request to.</param>
 * <param name="timeoutSeconds" type="number">The timeout duration in seconds for the request.</param>
 * <returns type="Promise<NameInfoV2Response>">A promise that resolves to a NameInfoV2Response object containing the API response data.</returns>
 * <exception cref="Error">Thrown if the HTTP request fails, with a message detailing the error.</exception>
 */
const httpGet = async (url, timeoutSeconds) => {
    try {
        const response = await axios.get(url, { timeout: timeoutSeconds * 1000 });
        return new NameInfoV2Response(response.data);
    } catch (error) {
        throw new Error(`HTTP request failed: ${error.message}`);
    }
};

/**
 * <summary>
 * Provides functionality to call the ServiceObjects Name Validation 2 API's NameInfoV2 endpoint,
 * retrieving name validation information with fallback to a backup endpoint for reliability in live mode.
 * </summary>
 */
const NameInfoV2Client = {
    /**
     * <summary>
     * Asynchronously invokes the NameInfoV2 API endpoint, attempting the primary endpoint
     * first and falling back to the backup if the response is invalid (Error.TypeCode == '3') in live mode.
     * </summary>
     * @param {string} Name - The name to validate.
     * @param {string} Option - Comma-separated list of options for additional processing (optional).
     * @param {string} LicenseKey - Your license key to use the service.
     * @param {boolean} isLive - Value to determine whether to use the live or trial servers.
     * @param {number} timeoutSeconds - Timeout, in seconds, for the call to the service.
     * @returns {Promise<NameInfoV2Response>} - A promise that resolves to a NameInfoV2Response object.
     */
    async invokeAsync(Name, Option = '', LicenseKey, isLive = true, timeoutSeconds = 15) {
        const params = {
            Name,
            Option,
            LicenseKey
        };

        const url = buildUrl(params, isLive ? LiveBaseUrl : TrialBaseUrl);
        let response = await httpGet(url, timeoutSeconds);

        if (isLive && !isValid(response)) {
            const fallbackUrl = buildUrl(params, BackupBaseUrl);
            const fallbackResponse = await httpGet(fallbackUrl, timeoutSeconds);
            return isValid(fallbackResponse) ? fallbackResponse : response;
        }

        return response;
    },

    /**
     * <summary>
     * Synchronously invokes the NameInfoV2 API endpoint by wrapping the async call
     * and awaiting its result immediately.
     * </summary>
     * @returns {NameInfoV2Response} - A NameInfoV2Response object with name validation details or an error.
     */
    invoke(Name, Option = '', LicenseKey, isLive = true, timeoutSeconds = 15) {
        return (async () => await this.invokeAsync(
            Name, Option, LicenseKey, isLive, timeoutSeconds
        ))();
    }
};

export { NameInfoV2Client, NameInfoV2Response };