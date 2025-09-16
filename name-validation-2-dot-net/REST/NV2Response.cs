
namespace name_validation_2_dot_net.REST
{
    public class NameInfoV2Response
    {
        public NameInfoV2 NameInfoV2 { get; set; }

        public Error Error { get; set; }
        public override string ToString()
        {
            return $"NameInfoV2: {NameInfoV2}\n" +
                $"Error: {{{Error}}}";
        }
    }
    public class NameInfoV2
    {
        public BestGuessName BestGuessName { get; set; }
        public string NameIn { get; set; }
        public string NameClassification { get; set; }
        public string Prefix { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public bool FirstNameFound { get; set; }
        public bool IsCommonFirstName { get; set; }
        public string FirstNameOrigin { get; set; }
        public string FirstNameSimilar { get; set; }
        public bool LastNameFound { get; set; }
        public bool IsCommonLastName { get; set; }
        public string LastNameOrigin { get; set; }
        public string LastNameSimilar { get; set; }
        public string Gender { get; set; }
        public string FirstNameAlt { get; set; }
        public string MiddleNameAlt { get; set; }
        public string LastNameAlt { get; set; }
        public bool FirstNameAltFound { get; set; }
        public bool LastNameAltFound { get; set; }
        public string GenderAlt { get; set; }
        public string RelatedNames { get; set; }
        public bool IsCorrectedName { get; set; }
        public bool IsBusinessName { get; set; }
        public string BusinessName { get; set; }
        public int VulgarityScore { get; set; }
        public int CelebrityScore { get; set; }
        public int BogusScore { get; set; }
        public int GarbageScore { get; set; }
        public int FirstNameDictionaryScore { get; set; }
        public int MiddleNameDictionaryScore { get; set; }
        public int LastNameDictionaryScore { get; set; }
        public int OverallNameScore { get; set; }
        public string IsNameGood { get; set; }
        public string StatusCodes { get; set; }
        public string Status { get; set; }
        public override string ToString()
        {
            string Output = $"{{BestGuessName: {BestGuessName}\n" +
                $"NameIn: {NameIn}\n" +
                $"NameClassification: {NameClassification}\n" +
                $"Prefix: {Prefix}\n" +
                $"FirstName:  {FirstName}\n" +
                $"MiddleName: {MiddleName}\n" +
                $"LastName:  {LastName}\n" +
                $"Suffix:   {Suffix}\n" +
                $"FirstNameFound: {FirstNameFound}\n" +
                $"IsCommonFirstName: {IsCommonFirstName}\n" +
                $"FirstNameOrigin: {FirstNameOrigin}\n" +
                $"FirstNameSimilar: {FirstNameSimilar}\n" +
                $"LastNameFound: {LastNameFound}\n" +
                $"IsCommonLastName: {IsCommonLastName}\n" +
                $"LastNameOrigin: {LastNameOrigin}\n" +
                $"LastNameSimilar: {LastNameSimilar}\n" +
                $"Gender: {Gender}\n" +
                $"FirstNameAlt: {FirstNameAlt}\n" +
                $"MiddleNameAlt: {MiddleNameAlt}\n" +
                $"LastNameAlt: {LastNameAlt}\n" +
                $"FirstNameAltFound: {FirstNameAltFound}\n" +
                $"LastNameAltFound: {LastNameAltFound}\n" +
                $"GenderAlt: {GenderAlt}\n" +
                $"RelatedNames: {RelatedNames}\n" +
                $"IsCorrectedName: {IsCorrectedName}\n" +
                $"IsBusinessName: {IsBusinessName}\n" +
                $"BusinessName: {BusinessName}\n" +
                $"VulgarityScore: {VulgarityScore}\n" +
                $"CelebrityScore: {CelebrityScore}\n" +
                $"BogusScore: {BogusScore}\n" +
                $"GarbageScore: {GarbageScore}\n" +
                $"FirstNameDictionaryScore: {FirstNameDictionaryScore}\n" +
                $"MiddleNameDictionaryScore: {MiddleNameDictionaryScore}\n" +
                $"LastNameDictionaryScore: {LastNameDictionaryScore}\n" +
                $"OverallNameScore: {OverallNameScore}\n" +
                $"IsNameGood: {IsNameGood}\n" +
                $"StatusCodes: {StatusCodes}\n" +
                $"Status: {Status}\n";
            return Output;
        }

    }
    public class BestGuessName
    {
        public string Prefix { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Suffix { get; set; }
        public override string ToString()
        {
            return $"{{Prefix: {Prefix}\n" +
            $"FirstName: {FirstName}\n" +
            $"MiddleName: {MiddleName}\n" +
            $"LastName: {LastName}\n" +
            $"Suffix: {Suffix} }}\n";
        }
    }
    public class Error
    {
        public string Type { get; set; }

        public string TypeCode { get; set; }

        public string Desc { get; set; }

        public string DescCode { get; set; }
        public override string ToString()
        {
            return $"Type: {Type}\n" +
                $"TypeCode: {TypeCode}\n" +
                $"Desc: {Desc}\n" +
                $"DescCode: {DescCode} ";
        }
    }

}
