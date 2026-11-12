// Avaliador Pedagógico Cumulativo de 20 Fases (Total: 4.0 Pontos)
class Evaluator {
    constructor() {
        this.levelStats = {};
        for (let i = 1; i <= 20; i++) {
            this.levelStats[i] = {
                attempts: 0,
                completed: false,
                code: '',
                earnedScore: 0.0 // Cada fase vale até 0.20 pontos (20 x 0.20 = 4.0 pts)
            };
        }
        this.startTime = Date.now();
    }

    recordAttempt(levelId, code, result) {
        if (!this.levelStats[levelId]) return;
        const stat = this.levelStats[levelId];
        stat.attempts++;
        stat.code = code;

        if (result.sucesso) {
            stat.completed = true;
            stat.earnedScore = this.computeLevelScore(levelId, code, stat.attempts);
        } else {
            // Pontuação parcial proporcional aos objetivos cumpridos
            const ratio = (result.atingidos || 0) / (result.total || 1);
            stat.earnedScore = Math.max(stat.earnedScore, Math.round(ratio * 0.08 * 100) / 100);
        }
    }

    computeLevelScore(levelId, code, attempts) {
        const MAX_PHASE = 0.20; // 0.20 pontos por fase (20 x 0.20 = 4.00)

        // Fases 1 a 4: Instruções e Sequenciamento
        if (levelId >= 1 && levelId <= 4) {
            if (attempts <= 2) return MAX_PHASE;
            if (attempts <= 4) return 0.16;
            return 0.12;
        }
        // Fases 5 a 8: Algoritmo e Causalidade
        else if (levelId >= 5 && levelId <= 8) {
            if (attempts <= 2) return MAX_PHASE;
            if (attempts <= 4) return 0.16;
            return 0.12;
        }
        // Fases 9 a 12: Decomposição de Problemas
        else if (levelId >= 9 && levelId <= 12) {
            if (attempts <= 2) return MAX_PHASE;
            if (attempts <= 4) return 0.16;
            return 0.12;
        }
        // Fases 13 a 16: Reconhecimento de Padrões
        else if (levelId >= 13 && levelId <= 16) {
            const usouLoop = /repetir\s*\(/i.test(code) || /for\s+/i.test(code) || /\.\w+\s*\(\s*\d+\s*\)/.test(code);
            if (usouLoop) {
                return attempts <= 3 ? MAX_PHASE : 0.17;
            } else {
                // Resolveu sem identificar/usar o laço do pilar
                return 0.10;
            }
        }
        // Fases 17 a 20: Abstração e Funções
        else if (levelId >= 17 && levelId <= 20) {
            const usouFuncao = /(?:funcao|function|def)\s+[a-zA-Z0-9_]+/i.test(code);
            if (usouFuncao) {
                return attempts <= 3 ? MAX_PHASE : 0.17;
            } else {
                // Resolveu sem abstrair em função
                return 0.10;
            }
        }

        return 0.12;
    }

    getCurrentTotalScore() {
        let total = 0;
        for (let i = 1; i <= 20; i++) {
            total += this.levelStats[i].earnedScore;
        }
        return Math.min(4.0, Math.round(total * 100) / 100);
    }

    computeFinalEvaluation() {
        let notaTotal = this.getCurrentTotalScore();

        // Cada pilar é composto por 4 fases (4 x 0.20 = 0.80 pontos).
        // Convertido para a escala padrão 0.0 a 4.0 por pilar no Boletim:
        const calcPilarScale = (startLvl, endLvl) => {
            let sum = 0;
            for (let i = startLvl; i <= endLvl; i++) {
                sum += this.levelStats[i].earnedScore;
            }
            return Math.min(4.0, Math.round((sum / 0.80) * 4.0 * 10) / 10);
        };

        const pInstrucoes = calcPilarScale(1, 4);
        const pAlgoritmo = calcPilarScale(5, 8);
        const pDecomposicao = calcPilarScale(9, 12);
        const pPadroes = calcPilarScale(13, 16);
        const pAbstracao = calcPilarScale(17, 20);

        let notaDiscreta = 0;
        let conceito = '';
        let badgeColor = '';
        let feedbackGeral = '';

        if (notaTotal >= 3.6) {
            notaDiscreta = 4;
            conceito = 'Nível 4 - Avançado / Excelente';
            badgeColor = '#2ed573';
            feedbackGeral = 'Excelente desempenho! Você concluiu os desafios com autonomia e precisão matemática. Dominou os 20 níveis aplicando algoritmos precisos, decomposição organizada, laços nos padrões e funções na abstração!';
        } else if (notaTotal >= 2.6) {
            notaDiscreta = 3;
            conceito = 'Nível 3 - Proficiente';
            badgeColor = '#1e90ff';
            feedbackGeral = 'Muito bom trabalho! Você completou a maior parte das fases com sucesso e raciocínio lógico sólido. Para atingir a nota máxima 4.0, busque sempre otimizar padrões com repetição e abstrair tarefas em funções.';
        } else if (notaTotal >= 1.6) {
            notaDiscreta = 2;
            conceito = 'Nível 2 - Básico';
            badgeColor = '#ffa502';
            feedbackGeral = 'Bom progresso! Você conseguiu resolver instruções e passos simples, mas encontrou desafios ao estruturar etapas maiores ou otimizar tarefas com repetição e abstração.';
        } else if (notaTotal >= 0.6) {
            notaDiscreta = 1;
            conceito = 'Nível 1 - Em Desenvolvimento Inicial';
            badgeColor = '#ff4757';
            feedbackGeral = 'Você iniciou sua caminhada no Pensamento Computacional. Continue praticando o sequenciamento dos comandos e a leitura atenta das dicas para fortalecer sua base lógica.';
        } else {
            notaDiscreta = 0;
            conceito = 'Nível 0 - Em Andamento / Inicial';
            badgeColor = '#747d8c';
            feedbackGeral = 'Pontuação inicial ou avaliação finalizada nas etapas iniciais. Continue praticando para avançar pelos 20 níveis!';
        }

        const elapsedSeconds = Math.round((Date.now() - this.startTime) / 1000);

        return {
            notaFinal: notaTotal,
            notaDiscreta: notaDiscreta,
            conceito: conceito,
            badgeColor: badgeColor,
            feedbackGeral: feedbackGeral,
            tempoSegundos: elapsedSeconds,
            pilares: {
                instrucoes: pInstrucoes,
                algoritmo: pAlgoritmo,
                decomposicao: pDecomposicao,
                padroes: pPadroes,
                abstracao: pAbstracao
            },
            detalhesNiveis: this.levelStats
        };
    }
}

window.Evaluator = Evaluator;
