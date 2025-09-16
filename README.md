![Service Objects Logo](https://www.serviceobjects.com/wp-content/uploads/2021/05/SO-Logo-with-TM.gif "Service Objects Logo")

# NV2 - Name Validation 2

DOTS Name Validation 2 (“NV2”) is an XML and JSON RESTful web service that provides information about a person’s name. With DOTS Name Validation 2, users can validate names, verify name accuracy, fix unordered names and return gender information.

## [Service Objects Website](https://serviceobjects.com)
## [Developer Guide/Documentation](https://www.serviceobjects.com/docs/)

# NV2 - NameInfoV2

NameInfoV2: Uses the provided name to return information such as classification, gender if a person, origin, similar names, related names and validity results.

## [NameInfoV2 Developer Guide/Documentation](https://www.serviceobjects.com/docs/dots-name-validation-2/nv2-operations/nv2-nameinfov2-recommended/)

## NameInfoV2 Request URLs (Query String Parameters)

>[!CAUTION]
>### *Important - Use query string parameters for all inputs.  Do not use path parameters since it will lead to errors due to optional parameters and special character issues.*


### JSON
#### Trial

https://trial.serviceobjects.com/nv2/api.svc/NameInfoV2?format=json&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/nv2/api.svc/NameInfoV2?format=json&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/nv2/api.svc/NameInfoV2?format=json&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}

### XML
#### Trial

https://trial.serviceobjects.com/nv2/api.svc/NameInfoV2?format=xml&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}

#### Production

https://sws.serviceobjects.com/nv2/api.svc/NameInfoV2?format=xml&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}

#### Production Backup

https://swsbackup.serviceobjects.com/nv2/api.svc/NameInfoV2?format=xml&submit=Invoke&Name=Abeo+Zabu&Option=&LicenseKey={LicenseKey}
