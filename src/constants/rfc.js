export const RESTRICTION_SITES = {
    EcoRI: "GAATTC",
    XbaI: "TCTAGA",
    SpeI: "ACTAGT",
    PstI: "CTGCAG",
    NotI: "GCGGCCGC",
    NheI: "GCTAGC",
    PvuII: "CAGCTG",
    XhoI: "CTCGAG",
    AvrII: "CCTAGG",
    SapI: "GCTCTTC",
    SapI_2: "GAAGAGC",
    BglII: "AGATCT",
    BamHI: "GGATCC",
    NgoMIV: "GCCGGC",
    AgeI: "ACCGGT"
}
export const RFC10 = {
    name: "RFC 10",
    illegal: ["EcoRI", "XbaI", "SpeI", "PstI"],
    avoid: ["NotI"],
    prefix:
        RESTRICTION_SITES["EcoRI"] +
        RESTRICTION_SITES["NotI"] +
        "T" +
        RESTRICTION_SITES["XbaI"] +
        "G",
    prefix2:
        RESTRICTION_SITES["EcoRI"] + RESTRICTION_SITES["NotI"] + "T" + "TCTAG",
    suffix:
        "T" +
        RESTRICTION_SITES["SpeI"] +
        "A" +
        RESTRICTION_SITES["NotI"] +
        RESTRICTION_SITES["PstI"],
    scar: "TACTAGAG",
    scar2: "TACTAG"
}
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
