class BestGuessName {
    constructor(data = {}) {
        this.Prefix = data.Prefix || null;
        this.FirstName = data.FirstName || null;
        this.MiddleName = data.MiddleName || null;
        this.LastName = data.LastName || null;
        this.Suffix = data.Suffix || null;
    }

    toString() {
        return `{Prefix: ${this.Prefix}\n` +
               `FirstName: ${this.FirstName}\n` +
               `MiddleName: ${this.MiddleName}\n` +
               `LastName: ${this.LastName}\n` +
               `Suffix: ${this.Suffix}}`;
    }
}

class NameInfoV2 {
    constructor(data = {}) {
        this.BestGuessName = data.BestGuessName ? new BestGuessName(data.BestGuessName) : null;
        this.NameIn = data.NameIn || null;
        this.NameClassification = data.NameClassification || null;
        this.Prefix = data.Prefix || null;
        this.FirstName = data.FirstName || null;
        this.MiddleName = data.MiddleName || null;
        this.LastName = data.LastName || null;
        this.Suffix = data.Suffix || null;
        this.FirstNameFound = data.FirstNameFound || null;
        this.IsCommonFirstName = data.IsCommonFirstName || null;
        this.FirstNameOrigin = data.FirstNameOrigin || null;
        this.FirstNameSimilar = data.FirstNameSimilar || null;
        this.LastNameFound = data.LastNameFound || null;
        this.IsCommonLastName = data.IsCommonLastName || null;
        this.LastNameOrigin = data.LastNameOrigin || null;
        this.LastNameSimilar = data.LastNameSimilar || null;
        this.Gender = data.Gender || null;
        this.FirstNameAlt = data.FirstNameAlt || null;
        this.MiddleNameAlt = data.MiddleNameAlt || null;
        this.LastNameAlt = data.LastNameAlt || null;
        this.FirstNameAltFound = data.FirstNameAltFound || null;
        this.LastNameAltFound = data.LastNameAltFound || null;
        this.GenderAlt = data.GenderAlt || null;
        this.RelatedNames = data.RelatedNames || null;
        this.IsCorrectedName = data.IsCorrectedName || null;
        this.IsBusinessName = data.IsBusinessName || null;
        this.BusinessName = data.BusinessName || null;
        this.VulgarityScore = data.VulgarityScore || null;
        this.CelebrityScore = data.CelebrityScore || null;
        this.BogusScore = data.BogusScore || null;
        this.GarbageScore = data.GarbageScore || null;
        this.FirstNameDictionaryScore = data.FirstNameDictionaryScore || null;
        this.MiddleNameDictionaryScore = data.MiddleNameDictionaryScore || null;
        this.LastNameDictionaryScore = data.LastNameDictionaryScore || null;
        this.OverallNameScore = data.OverallNameScore || null;
        this.IsNameGood = data.IsNameGood || null;
        this.StatusCodes = data.StatusCodes || null;
        this.Status = data.Status || null;
    }

    toString() {
        return `{BestGuessName: ${this.BestGuessName ? this.BestGuessName.toString() : 'null'}\n` +
               `NameIn: ${this.NameIn}\n` +
               `NameClassification: ${this.NameClassification}\n` +
               `Prefix: ${this.Prefix}\n` +
               `FirstName: ${this.FirstName}\n` +
               `MiddleName: ${this.MiddleName}\n` +
               `LastName: ${this.LastName}\n` +
               `Suffix: ${this.Suffix}\n` +
               `FirstNameFound: ${this.FirstNameFound}\n` +
               `IsCommonFirstName: ${this.IsCommonFirstName}\n` +
               `FirstNameOrigin: ${this.FirstNameOrigin}\n` +
               `FirstNameSimilar: ${this.FirstNameSimilar}\n` +
               `LastNameFound: ${this.LastNameFound}\n` +
               `IsCommonLastName: ${this.IsCommonLastName}\n` +
               `LastNameOrigin: ${this.LastNameOrigin}\n` +
               `LastNameSimilar: ${this.LastNameSimilar}\n` +
               `Gender: ${this.Gender}\n` +
               `FirstNameAlt: ${this.FirstNameAlt}\n` +
               `MiddleNameAlt: ${this.MiddleNameAlt}\n` +
               `LastNameAlt: ${this.LastNameAlt}\n` +
               `FirstNameAltFound: ${this.FirstNameAltFound}\n` +
               `LastNameAltFound: ${this.LastNameAltFound}\n` +
               `GenderAlt: ${this.GenderAlt}\n` +
               `RelatedNames: ${this.RelatedNames}\n` +
               `IsCorrectedName: ${this.IsCorrectedName}\n` +
               `IsBusinessName: ${this.IsBusinessName}\n` +
               `BusinessName: ${this.BusinessName}\n` +
               `VulgarityScore: ${this.VulgarityScore}\n` +
               `CelebrityScore: ${this.CelebrityScore}\n` +
               `BogusScore: ${this.BogusScore}\n` +
               `GarbageScore: ${this.GarbageScore}\n` +
               `FirstNameDictionaryScore: ${this.FirstNameDictionaryScore}\n` +
               `MiddleNameDictionaryScore: ${this.MiddleNameDictionaryScore}\n` +
               `LastNameDictionaryScore: ${this.LastNameDictionaryScore}\n` +
               `OverallNameScore: ${this.OverallNameScore}\n` +
               `IsNameGood: ${this.IsNameGood}\n` +
               `StatusCodes: ${this.StatusCodes}\n` +
               `Status: ${this.Status}\n`;
    }
}

class Error {
    constructor(data = {}) {
        this.Type = data.Type || null;
        this.TypeCode = data.TypeCode || null;
        this.Desc = data.Desc || null;
        this.DescCode = data.DescCode || null;
    }

    toString() {
        return `Type: ${this.Type}\n` +
               `TypeCode: ${this.TypeCode}\n` +
               `Desc: ${this.Desc}\n` +
               `DescCode: ${this.DescCode} `;
    }
}

class NameInfoV2Response {
    constructor(data = {}) {
        this.NameInfoV2 = data.NameInfoV2 ? new NameInfoV2(data.NameInfoV2) : null;
        this.Error = data.Error ? new Error(data.Error) : null;
    }

    toString() {
        return `NameInfoV2: ${(this.NameInfoV2 ? this.NameInfoV2.toString() : 'null')}\n` +
               `Error: ${this.Error ? this.Error.toString() : 'null'}`;
    }
}

export{ NameInfoV2Response };