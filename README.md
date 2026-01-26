# 📊 Calculadoras Trabalhistas 2026

Sistema integrado de calculadoras para Departamento Pessoal, desenvolvido para facilitar os cálculos de folha de pagamento conforme a legislação trabalhista brasileira vigente em 2026.

## 📋 Descrição

Este projeto oferece um conjunto completo de calculadoras trabalhistas em uma única interface web, permitindo cálculos precisos de salários, encargos e descontos para diferentes regimes de contratação.

## ✨ Funcionalidades

### 🔹 Calculadora CLT (Consolidação das Leis do Trabalho)
- Cálculo de salário base e proporcional
- Gestão de jornada de trabalho (150h, 180h, 220h)
- Cálculo automático de dias úteis e não úteis
- **Adicionais e Proventos:**
  - Gratificações e comissões
  - Adicional de insalubridade (10%, 20%, 40%)
  - Adicional de periculosidade (30%)
  - Gratificação de função (40%)
  - Adicional por tempo de serviço (anuênio, biênio, triênio, quadriênio, quinquênio)
  - Quebra de caixa (8%, 10%, 20%)
- **Horas Extras e Adicionais:**
  - Horas extras 100%
  - Horas extras variáveis (com percentual customizável)
  - Adicional noturno (20%, 25%, 30%, 50%)
  - Intrajornada e interjornada
  - Cálculo automático de reflexos DSR
- **Descontos:**
  - INSS (tabela progressiva 2026)
  - IRRF (tabela atualizada maio/2025)
  - Faltas e atrasos
  - Verbas não tributáveis (personalizáveis)
- **Verbas Não Tributáveis:**
  - Proventos fixos e percentuais
  - Descontos fixos e percentuais
  - Configuração de base de cálculo customizável

### 🔹 Calculadora Pró-Labore
- Cálculo de pró-labore para sócios e administradores
- Comparação entre regime normal e simplificado de IRRF
- Cálculo de INSS e IRRF
- Identificação automática da melhor opção tributária
- Tabelas de referência INSS e IRRF

### 🔹 Calculadora Horista (Comum)
- Cálculo para trabalhadores horistas
- Gestão de horas trabalhadas
- Cálculos proporcionais

### 🔹 Calculadora Horista Grupo Meta
- Calculadora especializada para o Grupo Meta
- Regras específicas de cálculo

## 🎯 Tabelas Vigentes (2026)

### INSS 2026
| Faixa Salarial | Alíquota | Dedução |
|----------------|----------|---------|
| Até R$ 1.621,00 | 7,5% | - |
| R$ 1.621,01 a R$ 2.902,84 | 9% | R$ 24,31 |
| R$ 2.902,85 a R$ 4.354,27 | 12% | R$ 111,40 |
| R$ 4.354,28 a R$ 8.475,55 | 14% | R$ 198,48 |

**Teto INSS:** R$ 8.475,55

### IRRF (Vigência: Maio/2025)
| Faixa Salarial | Alíquota | Dedução |
|----------------|----------|---------|
| Até R$ 2.428,80 | Isento | - |
| R$ 2.428,81 a R$ 2.826,65 | 7,5% | R$ 182,16 |
| R$ 2.826,66 a R$ 3.751,05 | 15% | R$ 394,16 |
| R$ 3.751,06 a R$ 4.664,68 | 22,5% | R$ 675,49 |
| Acima de R$ 4.664,68 | 27,5% | R$ 908,73 |

**Dedução por Dependente:** R$ 189,59  
**Desconto Simplificado:** R$ 607,20

## 🚀 Como Usar

1. **Abra o arquivo** `Calculadora 2026.html` em seu navegador
2. **Selecione a calculadora** desejada no menu superior
3. **Preencha os campos** com as informações do funcionário
4. **Visualize os resultados** automaticamente no painel lateral

### Dicas de Uso:
- ✅ Use o checkbox "Sobrescrever" para editar manualmente valores calculados automaticamente
- ✅ Clique no botão "✏️ Editar Base" para alterar a base de cálculo de adicionais
- ✅ O botão "Limpar Dados" restaura todos os campos aos valores padrão
- ✅ Todos os cálculos são atualizados em tempo real

## 💻 Tecnologias Utilizadas

- **HTML5** - Estrutura da aplicação
- **CSS3** - Estilização e layout responsivo
- **JavaScript** - Lógica de cálculos e interatividade
- **Tailwind CSS** - Framework CSS para design moderno
- **Font Awesome** - Ícones
- **Lucide Icons** - Ícones adicionais
- **Google Fonts (Inter)** - Tipografia

## 📱 Responsividade

O sistema é totalmente responsivo e funciona perfeitamente em:
- 💻 Desktops
- 📱 Tablets
- 📱 Smartphones

## 🎨 Interface

- Design moderno e intuitivo
- Cores e badges para fácil identificação de valores
- Painel lateral com resumo em tempo real
- Tabelas de referência integradas
- Modais para configurações avançadas

## 📂 Estrutura de Arquivos

```
01 ATUALIZADO 2026/
├── Calculadora 2026.html          # Arquivo principal da aplicação
├── styles.css                      # Estilos customizados
├── README.md                       # Este arquivo
├── 2026.docx                       # Documentação adicional
└── .git/                           # Controle de versão
```

## 🔧 Configurações Especiais

### Base de Cálculo Editável
Alguns adicionais permitem editar a base de cálculo:
- **Insalubridade:** Salário mínimo ou salário base do empregado
- **Periculosidade:** Salário base do empregado ou remuneração total
- **Tempo de Serviço:** Remuneração da calculadora ou salário base

### Verbas Não Tributáveis
Configure proventos e descontos que não entram nas bases de:
- INSS
- IRRF
- FGTS

Exemplos:
- ✅ Auxílio transporte
- ✅ Salário-família
- ✅ Prêmios (art. 457 §4º CLT)
- ✅ Empréstimos
- ✅ Pensão alimentícia
- ✅ Vale-transporte (6%)

## 📊 Quadro Resumo

O painel lateral exibe:
- ✅ Total de proventos
- ✅ Total de descontos
- ✅ Salário líquido
- ✅ Base INSS
- ✅ Base IRRF
- ✅ Método IRRF aplicado
- ✅ FGTS (8%)

## ⚖️ Conformidade Legal

Todas as calculadoras seguem:
- CLT (Consolidação das Leis do Trabalho)
- Portarias do Ministério do Trabalho
- Receita Federal (IRRF)
- INSS (Previdência Social)
- Legislação trabalhista vigente em 2026

## 🔄 Atualizações

O sistema está atualizado com:
- ✅ Tabela INSS 2026
- ✅ Tabela IRRF (vigência maio/2025)
- ✅ Salário mínimo 2026: R$ 1.621,00
- ✅ Teto INSS: R$ 8.475,55

## 📝 Notas Importantes

> **Atenção:** Este sistema é uma ferramenta de apoio para cálculos trabalhistas. Sempre consulte um contador ou advogado trabalhista para validação final dos valores, especialmente em casos complexos ou situações específicas.

## 🐛 Suporte

Para reportar problemas ou sugerir melhorias, entre em contato com o departamento de TI ou RH.

## 📄 Licença

Este projeto é de uso interno do departamento pessoal.

---

**Desenvolvido para facilitar o trabalho do Departamento Pessoal** 💼

*Última atualização: Janeiro 2026*
