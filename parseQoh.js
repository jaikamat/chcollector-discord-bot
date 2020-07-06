const parseQoh = ({
    FOIL_NM = 0,
    FOIL_LP = 0,
    FOIL_MP = 0,
    FOIL_HP = 0,
    NONFOIL_NM = 0,
    NONFOIL_LP = 0,
    NONFOIL_MP = 0,
    NONFOIL_HP = 0,
}) => {
    const foilQty = FOIL_NM + FOIL_LP + FOIL_MP + FOIL_HP;
    const nonfoilQty = NONFOIL_NM + NONFOIL_LP + NONFOIL_MP + NONFOIL_HP;
    return { foilQty, nonfoilQty };
}

module.exports = parseQoh;