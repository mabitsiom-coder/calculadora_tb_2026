const TABELA_IRRF_2026 = [
    { teto: 2428.80, aliquota: 0, deducao: 0 },
    { teto: 2826.65, aliquota: 0.075, deducao: 182.16 },
    { teto: 3751.05, aliquota: 0.15, deducao: 394.16 },
    { teto: 4664.68, aliquota: 0.225, deducao: 675.49 },
    { teto: Infinity, aliquota: 0.275, deducao: 908.73 }
];

function calcularIRRF2026(base) {
    // 1. Calcular IRRF pela tabela progressiva "padrão" (bruto)
    let f = TABELA_IRRF_2026.find(x => base <= x.teto) || TABELA_IRRF_2026[4];
    let irrf_bruto = (base * f.aliquota) - f.deducao;
    if (irrf_bruto < 0) irrf_bruto = 0;

    let irrf_final = 0;
    let metodo = "";

    // 2. Aplicar descontos progressivos
    if (base <= 5000.00) {
        irrf_final = 0;
        metodo = "Isenção Total";
    } else if (base <= 5500.00) {
        // Desconto de 75% no IMPOSTO DEVIDO (conforme interpretacao usual de "Desconto de IR")
        irrf_final = irrf_bruto * (1 - 0.75);
        metodo = "Desconto de 75%";
    } else if (base <= 6000.00) {
        irrf_final = irrf_bruto * (1 - 0.50);
        metodo = "Desconto de 50%";
    } else if (base <= 6500.00) {
        irrf_final = irrf_bruto * (1 - 0.25);
        metodo = "Desconto de 25%";
    } else if (base <= 7350.00) {
        irrf_final = irrf_bruto * (1 - 0.10);
        metodo = "Desconto de 10%";
    } else {
        irrf_final = irrf_bruto;
        metodo = "Tabela Padrão";
    }
    return {
        base,
        bruto: irrf_bruto.toFixed(2),
        final: irrf_final.toFixed(2),
        metodo
    };
}

console.log(calcularIRRF2026(4500));
console.log(calcularIRRF2026(5200));
console.log(calcularIRRF2026(5800));
console.log(calcularIRRF2026(6200));
console.log(calcularIRRF2026(7000));
console.log(calcularIRRF2026(7400));
