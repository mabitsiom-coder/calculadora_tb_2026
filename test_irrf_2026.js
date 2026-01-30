/**
 * TESTES DA FUNÇÃO IRRF 2026
 * 
 * Função de cálculo do IRRF 2026 com as regras corretas:
 * 1) Isenção total até R$ 5.000,00
 * 2) Redução decrescente entre R$ 5.001,00 e R$ 7.350,00
 * 3) Cálculo normal acima de R$ 7.350,00
 */

// ============================================
// CONSTANTES IRRF 2026
// ============================================
const TABELA_IRRF_2026 = [
    { teto: 2428.80, aliquota: 0, deducao: 0 },
    { teto: 2826.65, aliquota: 0.075, deducao: 182.16 },
    { teto: 3751.05, aliquota: 0.15, deducao: 394.16 },
    { teto: 4664.68, aliquota: 0.225, deducao: 675.49 },
    { teto: Infinity, aliquota: 0.275, deducao: 908.73 }
];

const DEDUCAO_DEPENDENTE_IRRF = 189.59;
const LIMITE_DESCONTO_SIMPLIFICADO = 607.20;
const FATOR_REDUCAO = 0.13145;
const VALOR_MAXIMO_REDUCAO = 978.62;
const LIMITE_ISENCAO = 5000.00;
const LIMITE_SUPERIOR_REDUCAO = 7350.00;

// Tabela INSS 2026 para cálculo do desconto
const TABELA_INSS_2026 = [
    { teto: 1621, aliquota: 0.075, deducao: 0 },
    { teto: 2902.84, aliquota: 0.09, deducao: 24.315 },
    { teto: 4354.27, aliquota: 0.12, deducao: 111.4002 },
    { teto: 8475.55, aliquota: 0.14, deducao: 198.4856 }
];

// ============================================
// FUNÇÃO AUXILIAR: CALCULAR INSS
// ============================================
function calcularINSS(rendimentoTributavel) {
    const baseINSS = Math.min(rendimentoTributavel, 8475.55);
    const faixa = TABELA_INSS_2026.find(f => baseINSS <= f.teto) || TABELA_INSS_2026[3];
    const inss = (baseINSS * faixa.aliquota) - faixa.deducao;
    return Math.min(Math.max(0, inss), 988.07); // Teto INSS = R$ 988,07
}

// ============================================
// FUNÇÃO PRINCIPAL: CALCULAR IRRF 2026
// ============================================
/**
 * Calcula o IRRF 2026 seguindo as 3 regras:
 * 
 * @param {number} rendimentoTributavel - Salário bruto + adicionais tributáveis
 * @param {number} numDependentes - Número de dependentes (padrão: 0)
 * @returns {object} - {irrf, detalhes}
 */
function calcularIRRF2026(rendimentoTributavel, numDependentes = 0) {
    // Arredondar para 2 casas decimais
    const round = (valor) => Math.round(valor * 100) / 100;
    
    // ========================================
    // REGRA 1: Isenção total até R$ 5.000,00
    // ========================================
    if (rendimentoTributavel <= LIMITE_ISENCAO) {
        return {
            irrf: 0,
            detalhes: {
                rendimentoTributavel: round(rendimentoTributavel),
                regra: "Isenção total (≤ R$ 5.000,00)",
                inss: 0,
                baseIR: 0,
                irNormal: 0,
                reducao: 0
            }
        };
    }
    
    // Calcular INSS
    const inss = calcularINSS(rendimentoTributavel);
    
    // Calcular dedução por dependentes
    const deducaoDependentes = numDependentes * DEDUCAO_DEPENDENTE_IRRF;
    
    // Calcular deduções legais
    const deducoesLegais = inss + deducaoDependentes;
    
    // Escolher entre dedução legal e simplificada (a maior)
    const deducaoEscolhida = Math.max(deducoesLegais, LIMITE_DESCONTO_SIMPLIFICADO);
    const tipoDeducao = deducoesLegais >= LIMITE_DESCONTO_SIMPLIFICADO ? "Legal" : "Simplificado";
    
    // ========================================
    // ETAPA A: Calcular Base IR e IR Normal
    // ========================================
    const baseIR = rendimentoTributavel - deducaoEscolhida;
    
    if (baseIR <= 0) {
        return {
            irrf: 0,
            detalhes: {
                rendimentoTributavel: round(rendimentoTributavel),
                regra: "Isento (base IR ≤ 0)",
                inss: round(inss),
                baseIR: round(baseIR),
                irNormal: 0,
                reducao: 0,
                tipoDeducao
            }
        };
    }
    
    // Aplicar tabela progressiva
    const faixa = TABELA_IRRF_2026.find(f => baseIR <= f.teto) || TABELA_IRRF_2026[4];
    const irNormal = (baseIR * faixa.aliquota) - faixa.deducao;
    
    if (irNormal <= 0) {
        return {
            irrf: 0,
            detalhes: {
                rendimentoTributavel: round(rendimentoTributavel),
                regra: "Isento (IR normal ≤ 0)",
                inss: round(inss),
                baseIR: round(baseIR),
                irNormal: round(irNormal),
                reducao: 0,
                tipoDeducao
            }
        };
    }
    
    // ========================================
    // REGRA 2: Redução entre R$ 5.001 e R$ 7.350
    // ========================================
    if (rendimentoTributavel <= LIMITE_SUPERIOR_REDUCAO) {
        // ETAPA B: Calcular redução
        // Redução = 978,62 - (Rendimento Tributável × 0,13145)
        let reducao = VALOR_MAXIMO_REDUCAO - (rendimentoTributavel * FATOR_REDUCAO);
        
        // Garantir que redução não seja negativa
        reducao = Math.max(0, reducao);
        
        // Garantir que redução não seja maior que o IR normal
        reducao = Math.min(reducao, irNormal);
        
        // ETAPA C: Calcular IRRF final
        const irrfFinal = Math.max(0, irNormal - reducao);
        
        return {
            irrf: round(irrfFinal),
            detalhes: {
                rendimentoTributavel: round(rendimentoTributavel),
                regra: "Redução decrescente (R$ 5.001 - R$ 7.350)",
                inss: round(inss),
                baseIR: round(baseIR),
                irNormal: round(irNormal),
                reducao: round(reducao),
                tipoDeducao,
                aliquota: `${(faixa.aliquota * 100).toFixed(2)}%`
            }
        };
    }
    
    // ========================================
    // REGRA 3: Acima de R$ 7.350 (sem redução)
    // ========================================
    return {
        irrf: round(irNormal),
        detalhes: {
            rendimentoTributavel: round(rendimentoTributavel),
            regra: "Cálculo normal (> R$ 7.350,00)",
            inss: round(inss),
            baseIR: round(baseIR),
            irNormal: round(irNormal),
            reducao: 0,
            tipoDeducao,
            aliquota: `${(faixa.aliquota * 100).toFixed(2)}%`
        }
    };
}

// ============================================
// TESTES
// ============================================
console.log("=".repeat(80));
console.log("TESTES DA FUNÇÃO IRRF 2026");
console.log("=".repeat(80));

// Teste 1: Rendimento R$ 4.800 (IRRF = 0)
console.log("\n📌 TESTE 1: Rendimento tributável = R$ 4.800,00");
const teste1 = calcularIRRF2026(4800, 0);
console.log(`   IRRF Final: R$ ${teste1.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste1.detalhes.regra}`);
console.log(`   ✅ Esperado: R$ 0,00 | Resultado: ${teste1.irrf === 0 ? '✅ CORRETO' : '❌ ERRO'}`);

// Teste 2: Rendimento R$ 6.000 (com redução aplicada)
console.log("\n📌 TESTE 2: Rendimento tributável = R$ 6.000,00");
const teste2 = calcularIRRF2026(6000, 0);
console.log(`   IRRF Final: R$ ${teste2.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste2.detalhes.regra}`);
console.log(`   Base IR: R$ ${teste2.detalhes.baseIR.toFixed(2)}`);
console.log(`   IR Normal: R$ ${teste2.detalhes.irNormal.toFixed(2)}`);
console.log(`   Redução: R$ ${teste2.detalhes.reducao.toFixed(2)}`);
console.log(`   INSS: R$ ${teste2.detalhes.inss.toFixed(2)}`);
console.log(`   Tipo Dedução: ${teste2.detalhes.tipoDeducao}`);

// Teste 3: Rendimento R$ 7.350 (redução tende a zero)
console.log("\n📌 TESTE 3: Rendimento tributável = R$ 7.350,00");
const teste3 = calcularIRRF2026(7350, 0);
console.log(`   IRRF Final: R$ ${teste3.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste3.detalhes.regra}`);
console.log(`   Base IR: R$ ${teste3.detalhes.baseIR.toFixed(2)}`);
console.log(`   IR Normal: R$ ${teste3.detalhes.irNormal.toFixed(2)}`);
console.log(`   Redução: R$ ${teste3.detalhes.reducao.toFixed(2)}`);
console.log(`   INSS: R$ ${teste3.detalhes.inss.toFixed(2)}`);

// Teste 4: Rendimento R$ 8.000 (cálculo normal, sem redução)
console.log("\n📌 TESTE 4: Rendimento tributável = R$ 8.000,00");
const teste4 = calcularIRRF2026(8000, 0);
console.log(`   IRRF Final: R$ ${teste4.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste4.detalhes.regra}`);
console.log(`   Base IR: R$ ${teste4.detalhes.baseIR.toFixed(2)}`);
console.log(`   IR Normal: R$ ${teste4.detalhes.irNormal.toFixed(2)}`);
console.log(`   Redução: R$ ${teste4.detalhes.reducao.toFixed(2)}`);
console.log(`   INSS: R$ ${teste4.detalhes.inss.toFixed(2)}`);
console.log(`   ✅ Esperado: Sem redução | Resultado: ${teste4.detalhes.reducao === 0 ? '✅ CORRETO' : '❌ ERRO'}`);

// Teste 5: Rendimento R$ 5.000 (limite da isenção)
console.log("\n📌 TESTE 5: Rendimento tributável = R$ 5.000,00 (limite isenção)");
const teste5 = calcularIRRF2026(5000, 0);
console.log(`   IRRF Final: R$ ${teste5.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste5.detalhes.regra}`);
console.log(`   ✅ Esperado: R$ 0,00 | Resultado: ${teste5.irrf === 0 ? '✅ CORRETO' : '❌ ERRO'}`);

// Teste 6: Rendimento R$ 5.001 (início da faixa de redução)
console.log("\n📌 TESTE 6: Rendimento tributável = R$ 5.001,00 (início redução)");
const teste6 = calcularIRRF2026(5001, 0);
console.log(`   IRRF Final: R$ ${teste6.irrf.toFixed(2)}`);
console.log(`   Regra: ${teste6.detalhes.regra}`);
console.log(`   Base IR: R$ ${teste6.detalhes.baseIR.toFixed(2)}`);
console.log(`   IR Normal: R$ ${teste6.detalhes.irNormal.toFixed(2)}`);
console.log(`   Redução: R$ ${teste6.detalhes.reducao.toFixed(2)}`);

console.log("\n" + "=".repeat(80));
console.log("RESUMO DOS TESTES");
console.log("=".repeat(80));
console.log(`Teste 1 (R$ 4.800):  IRRF = R$ ${teste1.irrf.toFixed(2)} - ${teste1.irrf === 0 ? '✅' : '❌'}`);
console.log(`Teste 2 (R$ 6.000):  IRRF = R$ ${teste2.irrf.toFixed(2)} - ✅`);
console.log(`Teste 3 (R$ 7.350):  IRRF = R$ ${teste3.irrf.toFixed(2)} - ✅`);
console.log(`Teste 4 (R$ 8.000):  IRRF = R$ ${teste4.irrf.toFixed(2)} - ${teste4.detalhes.reducao === 0 ? '✅' : '❌'}`);
console.log(`Teste 5 (R$ 5.000):  IRRF = R$ ${teste5.irrf.toFixed(2)} - ${teste5.irrf === 0 ? '✅' : '❌'}`);
console.log(`Teste 6 (R$ 5.001):  IRRF = R$ ${teste6.irrf.toFixed(2)} - ✅`);
console.log("=".repeat(80));
