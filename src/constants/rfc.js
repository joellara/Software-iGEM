export const RFC10 = { name: "RFC 10" }
export const RFC12 = { name: "RFC 12" }
export const RFC21 = { name: "RFC 21" }
export const RFC23 = { name: "RFC 23" }
export const RFC25 = { name: "RFC 25" }
export const RFC100 = { name: "RFC 100" }

export const RFCs = [
    RFC10.name,
    RFC12.name,
    RFC21.name,
    RFC23.name,
    RFC25.name,
    RFC100.name
]

RFC10["illegal"] = ["EcoRI", "XbaI", "SpeI", "PstI"]
RFC10["avoid"] = ["NotI"]
RFC10["prefix"] = "EcoRI" + "NotI" + "T" + "XbaI" + "G"
RFC10["prefix2"] = "EcoRI" + "NotI" + "T" + "TCTAG"
RFC10["suffix"] = "T" + "SpeI" + "A" + "NotI" + "PstI"
RFC10["scar"] = "TACTAGAG"
RFC10["scar2"] = "TACTAG"

// {
//     "EcoRI": "GAATTC",
//     "XbaI": "TCTAGA",
//     "SpeI": "ACTAGT",
//     "PstI": "CTGCAG",
//     "NotI": "GCGGCCGC",
//     "NheI": "GCTAGC",
//     "PvuII": "CAGCTG",
//     "XhoI": "CTCGAG",
//     "AvrII": "CCTAGG",
//     "SapI": "GCTCTTC",
//     "SapI_2": "GAAGAGC",
//     "BglII": "AGATCT",
//     "BamHI": "GGATCC",
//     "NgoMIV": "GCCGGC",
//     "AgeI": "ACCGGT"
// }
