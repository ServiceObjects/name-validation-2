from dataclasses import dataclass
from typing import Optional

@dataclass
class BestGuessName:
    Prefix: Optional[str] = None
    FirstName: Optional[str] = None
    MiddleName: Optional[str] = None
    LastName: Optional[str] = None
    Suffix: Optional[str] = None

    def __str__(self) -> str:
        return (f"Prefix: {self.Prefix}\n"
                f"FirstName: {self.FirstName}\n"
                f"MiddleName: {self.MiddleName}\n"
                f"LastName: {self.LastName}\n"
                f"Suffix: {self.Suffix}")

@dataclass
class NameInfoV2:
    BestGuessName: Optional[BestGuessName] = None
    NameIn: Optional[str] = None
    NameClassification: Optional[str] = None
    Prefix: Optional[str] = None
    FirstName: Optional[str] = None
    MiddleName: Optional[str] = None
    LastName: Optional[str] = None
    Suffix: Optional[str] = None
    FirstNameFound: Optional[bool] = None
    IsCommonFirstName: Optional[bool] = None
    FirstNameOrigin: Optional[str] = None
    FirstNameSimilar: Optional[str] = None
    LastNameFound: Optional[bool] = None
    IsCommonLastName: Optional[bool] = None
    LastNameOrigin: Optional[str] = None
    LastNameSimilar: Optional[str] = None
    Gender: Optional[str] = None
    FirstNameAlt: Optional[str] = None
    MiddleNameAlt: Optional[str] = None
    LastNameAlt: Optional[str] = None
    FirstNameAltFound: Optional[bool] = None
    LastNameAltFound: Optional[bool] = None
    GenderAlt: Optional[str] = None
    RelatedNames: Optional[str] = None
    IsCorrectedName: Optional[bool] = None
    IsBusinessName: Optional[bool] = None
    BusinessName: Optional[str] = None
    VulgarityScore: Optional[int] = None
    CelebrityScore: Optional[int] = None
    BogusScore: Optional[int] = None
    GarbageScore: Optional[int] = None
    FirstNameDictionaryScore: Optional[int] = None
    MiddleNameDictionaryScore: Optional[int] = None
    LastNameDictionaryScore: Optional[int] = None
    OverallNameScore: Optional[int] = None
    IsNameGood: Optional[str] = None
    StatusCodes: Optional[str] = None
    Status: Optional[str] = None

    def __str__(self) -> str:
        return (f"{{BestGuessName: {self.BestGuessName.__str__() if self.BestGuessName else 'None'}\n"
                f"NameIn: {self.NameIn}\n"
                f"NameClassification: {self.NameClassification}\n"
                f"Prefix: {self.Prefix}\n"
                f"FirstName: {self.FirstName}\n"
                f"MiddleName: {self.MiddleName}\n"
                f"LastName: {self.LastName}\n"
                f"Suffix: {self.Suffix}\n"
                f"FirstNameFound: {self.FirstNameFound}\n"
                f"IsCommonFirstName: {self.IsCommonFirstName}\n"
                f"FirstNameOrigin: {self.FirstNameOrigin}\n"
                f"FirstNameSimilar: {self.FirstNameSimilar}\n"
                f"LastNameFound: {self.LastNameFound}\n"
                f"IsCommonLastName: {self.IsCommonLastName}\n"
                f"LastNameOrigin: {self.LastNameOrigin}\n"
                f"LastNameSimilar: {self.LastNameSimilar}\n"
                f"Gender: {self.Gender}\n"
                f"FirstNameAlt: {self.FirstNameAlt}\n"
                f"MiddleNameAlt: {self.MiddleNameAlt}\n"
                f"LastNameAlt: {self.LastNameAlt}\n"
                f"FirstNameAltFound: {self.FirstNameAltFound}\n"
                f"LastNameAltFound: {self.LastNameAltFound}\n"
                f"GenderAlt: {self.GenderAlt}\n"
                f"RelatedNames: {self.RelatedNames}\n"
                f"IsCorrectedName: {self.IsCorrectedName}\n"
                f"IsBusinessName: {self.IsBusinessName}\n"
                f"BusinessName: {self.BusinessName}\n"
                f"VulgarityScore: {self.VulgarityScore}\n"
                f"CelebrityScore: {self.CelebrityScore}\n"
                f"BogusScore: {self.BogusScore}\n"
                f"GarbageScore: {self.GarbageScore}\n"
                f"FirstNameDictionaryScore: {self.FirstNameDictionaryScore}\n"
                f"MiddleNameDictionaryScore: {self.MiddleNameDictionaryScore}\n"
                f"LastNameDictionaryScore: {self.LastNameDictionaryScore}\n"
                f"OverallNameScore: {self.OverallNameScore}\n"
                f"IsNameGood: {self.IsNameGood}\n"
                f"StatusCodes: {self.StatusCodes}\n"
                f"Status: {self.Status}\n")

@dataclass
class Error:
    Type: Optional[str] = None
    TypeCode: Optional[str] = None
    Desc: Optional[str] = None
    DescCode: Optional[str] = None

    def __str__(self) -> str:
        return (f"Type: {self.Type}\n"
                f"TypeCode: {self.TypeCode}\n"
                f"Desc: {self.Desc}\n"
                f"DescCode: {self.DescCode} ")

@dataclass
class NameInfoV2Response:
    NameInfoV2: Optional[NameInfoV2] = None
    Error: Optional[Error] = None

    def __str__(self) -> str:
        name_info = str(self.NameInfoV2) if self.NameInfoV2 else "None"
        error = str(self.Error) if self.Error else "None"
        return (f"NameInfoV2: {name_info}\n"
                f"Error: {error}")