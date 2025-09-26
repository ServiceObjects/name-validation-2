class BestGuessName {
    constructor(data = {}) {
        this.Prefix = data.Prefix;
        this.FirstName = data.FirstName;
        this.MiddleName = data.MiddleName;
        this.LastName = data.LastName;
        this.Suffix = data.Suffix;
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
        this.BestGuessName = data.BestGuessName ? new BestGuessName(data.BestGuessName) : "";
        this.NameIn = data.NameIn;
        this.NameClassification = data.NameClassification;
        this.Prefix = data.Prefix;
        this.FirstName = data.FirstName;
        this.MiddleName = data.MiddleName;
        this.LastName = data.LastName;
        this.Suffix = data.Suffix;
        this.FirstNameFound = data.FirstNameFound;
        this.IsCommonFirstName = data.IsCommonFirstName;
        this.FirstNameOrigin = data.FirstNameOrigin;
        this.FirstNameSimilar = data.FirstNameSimilar;
        this.LastNameFound = data.LastNameFound;
        this.IsCommonLastName = data.IsCommonLastName;
        this.LastNameOrigin = data.LastNameOrigin;
        this.LastNameSimilar = data.LastNameSimilar;
        this.Gender = data.Gender;
        this.FirstNameAlt = data.FirstNameAlt;
        this.MiddleNameAlt = data.MiddleNameAlt;
        this.LastNameAlt = data.LastNameAlt;
        this.FirstNameAltFound = data.FirstNameAltFound;
        this.LastNameAltFound = data.LastNameAltFound;
        this.GenderAlt = data.GenderAlt;
        this.RelatedNames = data.RelatedNames;
        this.IsCorrectedName = data.IsCorrectedName;
        this.IsBusinessName = data.IsBusinessName;
        this.BusinessName = data.BusinessName;
        this.VulgarityScore = data.VulgarityScore;
        this.CelebrityScore = data.CelebrityScore;
        this.BogusScore = data.BogusScore;
        this.GarbageScore = data.GarbageScore;
        this.FirstNameDictionaryScore = data.FirstNameDictionaryScore;
        this.MiddleNameDictionaryScore = data.MiddleNameDictionaryScore;
        this.LastNameDictionaryScore = data.LastNameDictionaryScore;
        this.OverallNameScore = data.OverallNameScore;
        this.IsNameGood = data.IsNameGood;
        this.StatusCodes = data.StatusCodes;
        this.Status = data.Status;
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
        this.Type = data.Type;
        this.TypeCode = data.TypeCode;
        this.Desc = data.Desc;
        this.DescCode = data.DescCode;
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