// =========================================================================
// 20 FASES AVALIATIVAS DE PENSAMENTO COMPUTACIONAL
// Cada fase vale rigorosamente 0.20 pts -> 20 x 0.20 = 4.00 pontos no total.
// 5 Pilares x 4 Fases cada. Geometria rigorosa e dicas seguras.
// =========================================================================

const GAME_LEVELS = [
    // =============================================================
    // PILAR 1: INSTRUÇÕES E SEQUENCIAMENTO (Fases 1 a 4) - 0.20 pts cada
    // =============================================================

    // --- FASE 1: Sequência em Linha Reta ---
    {
        id: 1,
        pilar: 'instrucoes',
        pilarNome: 'Instruções 1: Sequência Direta',
        titulo: 'Fase 1: O Primeiro Passo no Corredor',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Instruções são comandos elementares executados em ordem direta.',
            analogia: 'Passos de uma dança: cada movimento ocorre no momento exato.',
            regraOuro: 'Avance em linha reta, recolha o cristal com coletar() e entre no portal.'
        },
        descricao: 'Bem-vindo ao Castelo do Código! Avance pelo corredor seguro, recolha o cristal esmeralda com heroi.coletar() e entre no portal místico de saída.',
        dica: '💡 Dica: O herói já deu o primeiro passo seguro à direita. Adicione os próximos passos, colete o cristal e vá até o portal!',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 2, 0, 0, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar o Cristal Esmeralda', atingido: false },
            { id: 'alcancar_saida', texto: 'Entrar no Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 1: INSTRUÇÕES BÁSICAS
// Dica: O primeiro passo seguro já foi dado!
// ============================================

heroi.moverDireita();
`
    },

    // --- FASE 2: Desvio de Espinho ---
    {
        id: 2,
        pilar: 'instrucoes',
        pilarNome: 'Instruções 2: Mudança de Rota',
        titulo: 'Fase 2: O Desvio Seguro dos Espinhos',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'A direção correta dos comandos evita que o herói colida com perigos.',
            analogia: 'Desviar de uma poça de água: você dá a volta pelo caminho seco.',
            regraOuro: 'Há espinhos diretamente à sua direita! Primeiro desça para desviar.'
        },
        descricao: 'Atenção! Há espinhos pontiagudos logo à direita em (2,1). Desça para o corredor inferior, avance, colete o cristal e vá até a saída!',
        dica: '💡 Dica: A primeira instrução dada é heroi.moverBaixo() para desviar com segurança. Complete o restante do caminho.',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 4, 1, 1, 1, 1, 1],
                [1, 0, 0, 2, 0, 3, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'desviar_espinhos', texto: 'Contornar os Espinhos com Segurança', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar o Cristal Mágico', atingido: false },
            { id: 'alcancar_saida', texto: 'Entrar no Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 2: MUDANÇA DE ROTA E DESVIO
// Dica: Há espinhos à direita! Desça para desviar:
// ============================================

heroi.moverBaixo();
`
    },

    // --- FASE 3: Percurso em Zigue-Zague ---
    {
        id: 3,
        pilar: 'instrucoes',
        pilarNome: 'Instruções 3: Percurso Curvo',
        titulo: 'Fase 3: O Labirinto em Zigue-Zague',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Sequenciar curvas e mudanças de direção em espaços bidimensionais.',
            analogia: 'Fazer o percurso entre cones em uma pista de treino.',
            regraOuro: 'Colete o primeiro cristal, retorne à bifurcação, desça e busque o segundo!'
        },
        descricao: 'Este labirinto possui dois cristais em corredores opostos. Avance até o primeiro cristal, volte para descer pelo corredor sul, recolha o segundo cristal e suba até o portal!',
        dica: '💡 Dica: Siga o fluxo: pegar cristal 1 -> voltar -> descer -> pegar cristal 2 -> subir ao portal.',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 2, 1, 1, 0, 3, 1],
                [1, 0, 1, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 2, 0, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar os 2 Cristais do Percurso', atingido: false },
            { id: 'alcancar_saida', texto: 'Entrar no Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 3: PERCURSO EM ZIGUE-ZAGUE
// Dica: Avance até o primeiro cristal:
// ============================================

heroi.moverDireita();
`
    },

    // --- FASE 4: Desarme de Armadilha ---
    {
        id: 4,
        pilar: 'instrucoes',
        pilarNome: 'Instruções 4: Ação de Desarme',
        titulo: 'Fase 4: A Rota com Desarme de Armadilha',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Comandos de interação contextual (como desarmar) neutralizam ameaças frontais.',
            analogia: 'Desbloquear um cadeado antes de tentar abrir o portão.',
            regraOuro: 'Pare em frente aos espinhos e use heroi.desarmar() antes de pisar neles!'
        },
        descricao: 'Uma armadilha de espinhos bloqueia a passagem em linha reta. Avance até ela, use heroi.desarmar() para recolher os espinhos com segurança, colete o cristal e alcance o portal.',
        dica: '💡 Dica: Avance até (2,1), chame heroi.desarmar(), avance até o cristal e colete!',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 4, 2, 0, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'desarmar_espinho', texto: 'Desarmar os Espinhos com desarmar()', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar o Cristal Mágico', atingido: false },
            { id: 'alcancar_saida', texto: 'Entrar no Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.desarmar()', label: 'desarmar()', icon: '🛡️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 4: DESARME DE ARMADILHA
// Dica: Avance em direção à armadilha:
// ============================================

heroi.moverDireita();
`
    },

    // =============================================================
    // PILAR 2: ALGORITMOS E CAUSALIDADE (Fases 5 a 8) - 0.20 pts cada
    // =============================================================

    // --- FASE 5: Causalidade e Ponte ---
    {
        id: 5,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 1: Causalidade e Ponte',
        titulo: 'Fase 5: O Mecanismo da Ponte Levadiça',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Um Algoritmo obedece a regras de causa e efeito: ações têm pré-requisitos lógicos.',
            analogia: 'Abrir a porta antes de passar: tentar passar com a porta trancada causa colisão.',
            regraOuro: 'Suba para puxar a alavanca antes de tentar cruzar o abismo!'
        },
        descricao: 'Um abismo profundo corta o caminho e a ponte mágica está erguida. Complete o algoritmo:\n1) Suba até a alavanca azul e use heroi.ativarAlavanca()\n2) Desça e atravesse pela ponte que baixou\n3) Alcance o portal.',
        dica: '💡 Dica: Siga a ordem causal: subir -> direita -> ativarAlavanca() -> voltar -> descer -> cruzar a ponte!',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 5, 1, 1, 1, 1, 1],
                [1, 0, 0, 7, 0, 3, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 2 },
        objetivos: [
            { id: 'ativar_alavanca', texto: 'Acionar a Alavanca Azul (Descer a Ponte)', atingido: false },
            { id: 'alcancar_saida', texto: 'Atravessar com Segurança até o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(4)', label: 'moverDireita(4)', icon: '⏩' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' }
        ],
        codigoInicial: `// ============================================
// FASE 5: ALGORITMO E CAUSA/EFEITO
// Dica: Suba primeiro para ir até a alavanca:
// ============================================

heroi.moverCima();
`
    },

    // --- FASE 6: Chave e Combate ---
    {
        id: 6,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 2: Ordem e Combate',
        titulo: 'Fase 6: A Chave e o Sentinela Orc',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Sequenciar ações garante resolver pré-requisitos antes de entrar em combate.',
            analogia: 'Pegar o ingresso antes de entrar na sala de cinema.',
            regraOuro: 'Colete a chave mágica no norte antes de descer para enfrentar o guarda com atacar().'
        },
        descricao: 'O portal está protegido por um sentinela orc armado. Siga a ordem algorítmica:\n1) Avance e recolha o cristal de chave no norte com coletar()\n2) Desça até o corredor do guarda\n3) Use heroi.atacar() para derrotar o orc\n4) Entre no portal.',
        dica: '💡 Dica: Direita -> coletar() -> voltar -> descer -> atacar() -> portal!',
        grade: {
            largura: 8,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 2, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 6, 0, 3, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar a Chave de Cristal no Norte', atingido: false },
            { id: 'derrotar_inimigo', texto: 'Derrotar o Sentinela Orc com atacar()', atingido: false },
            { id: 'alcancar_saida', texto: 'Alcançar a Saída da Câmara', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' }
        ],
        codigoInicial: `// ============================================
// FASE 6: ALGORITMO COM COMBATE
// Dica: Avance até o cristal antes de descer:
// ============================================

heroi.moverDireita();
`
    },

    // --- FASE 7: Circuito das Duas Pontes ---
    {
        id: 7,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 3: Duplo Mecanismo',
        titulo: 'Fase 7: O Circuito das Duas Pontes Mágicas',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Algoritmos complexos coordenam múltiplos mecanismos sequenciais em cadeia.',
            analogia: 'Passar por duas catracas consecutivas com bilhete único.',
            regraOuro: 'Ative a 1ª alavanca, cruze, pegue o cristal, ative a 2ª alavanca e cruze até o fim!'
        },
        descricao: 'Duas pontes levadiças cortam o santuário. Complete o algoritmo:\n1) Acione a 1ª alavanca no norte e cruze a 1ª ponte\n2) Recolha o cristal sagrado no centro\n3) Acione a 2ª alavanca e cruze a 2ª ponte até o portal.',
        dica: '💡 Dica: Siga o fluxo causal: alavanca 1 -> ponte 1 -> cristal -> alavanca 2 -> ponte 2 -> portal!',
        grade: {
            largura: 10,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 5, 1, 1, 0, 5, 1, 1, 1],
                [1, 0, 0, 7, 2, 0, 0, 7, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 2 },
        objetivos: [
            { id: 'acionar_pontes', texto: 'Acionar as Alavancas e Baixar as Pontes', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar o Cristal Central', atingido: false },
            { id: 'alcancar_saida', texto: 'Atravessar até o Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 7: DUPLO MECANISMO EM CADEIA
// Dica: Suba primeiro para acionar a 1ª alavanca:
// ============================================

heroi.moverCima();
`
    },

    // --- FASE 8: Combate e Altar ---
    {
        id: 8,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 4: Resolução Tática',
        titulo: 'Fase 8: A Sequência Tática de Combate e Altar',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Planejamento de rotas com combate preventivo e ativação de mecanismos sagrados.',
            analogia: 'Desarmar um alarme antes de abrir o cofre.',
            regraOuro: 'Derrote o sentinela orc com heroi.atacar(), pegue o cristal e ative o altar sagrado!'
        },
        descricao: 'O caminho para o portal requer superar o guarda com heroi.atacar(), pegar o cristal da câmara e usar heroi.ativarAltar() para abrir o portal.',
        dica: '💡 Dica: Direita -> atacar() -> pegar cristal -> ativar altar -> portal!',
        grade: {
            largura: 9,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 4, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 6, 2, 0, 9, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 2 },
        objetivos: [
            { id: 'derrotar_orc', texto: 'Derrotar o Sentinela com atacar()', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar o Cristal Mágico', atingido: false },
            { id: 'ativar_altar_saida', texto: 'Ativar o Altar e Entrar no Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 8: SEQUÊNCIA TÁTICA DE COMBATE
// Dica: Avance pelo corredor em direção ao sentinela:
// ============================================

heroi.moverDireita();
`
    },

    // =============================================================
    // PILAR 3: DECOMPOSIÇÃO DE PROBLEMAS (Fases 9 a 12) - 0.20 pts cada
    // =============================================================

    // --- FASE 9: A Torre dos Dois Mecanismos ---
    {
        id: 9,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 1: Subproblemas Modulares',
        titulo: 'Fase 9: A Torre dos Dois Mecanismos e Relíquias',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Decomposição é dividir uma grande meta em subproblemas menores, organizados e independentes.',
            analogia: 'Fazer o dever de casa: primeiro resolver a Etapa A, depois a Etapa B, e por fim a Etapa C.',
            regraOuro: 'Divida em 3 blocos: [Etapa A] Torre Norte, [Etapa B] Altar Leste e [Etapa C] Portal.'
        },
        descricao: 'Para abrir o portal sagrado, cumpra as 3 instruções modulares no cenário:\n• Subproblema A: Subir à torre norte, coletar o Cristal de Força e acionar a Alavanca Primária.\n• Subproblema B: Retornar ao corredor leste, recolher o Cristal Místico e consagrar o Altar Sagrado.\n• Subproblema C: Cruzar o Portal Místico liberado.',
        dica: '💡 Dica: Resolva uma etapa por vez! Suba, pegue o cristal, puxe a alavanca, volte, pegue o cristal leste, ative o altar e saia.',
        grade: {
            largura: 9,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 2, 5, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 2, 9, 3, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 2 },
        objetivos: [
            { id: 'subproblema_a', texto: 'Subproblema A: Coletar Cristal e Acionar Alavanca da Torre Norte', atingido: false },
            { id: 'subproblema_b', texto: 'Subproblema B: Coletar Cristal Leste e Ativar o Altar Sagrado', atingido: false },
            { id: 'subproblema_c', texto: 'Subproblema C: Cruzar o Portal Místico com Segurança', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 9: DECOMPOSIÇÃO EM ETAPAS MODULARES
// Dica: Inicie resolvendo a [Etapa A] na Torre Norte:
// ============================================

// --- Etapa A: Torre Norte ---
heroi.moverCima();
`
    },

    // --- FASE 10: Cripta dos Três Guardiões ---
    {
        id: 10,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 2: Três Subproblemas',
        titulo: 'Fase 10: A Cripta dos Três Guardiões Sagrados',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Dividir para conquistar: separar missões complexas em módulos com tarefas específicas.',
            analogia: 'Construir uma casa: 1º Fundação, 2º Paredes, 3º Telhado e Acabamento.',
            regraOuro: 'Execute em 3 etapas: [Etapa A] Runa Norte, [Etapa B] Sentinela Sul, [Etapa C] Altar e Saída.'
        },
        descricao: 'A cripta exige o cumprimento de 3 conjuntos de instruções:\n• Subproblema A (Ala Norte): Desarmar a armadilha de espinhos com heroi.desarmar() e recolher a Runa Glacial.\n• Subproblema B (Ala Sul): Descer, eliminar o Sentinela Orc com heroi.atacar() e coletar a Runa Ígnea.\n• Subproblema C (Santuário Leste): Ativar o Altar Central com heroi.ativarAltar() e entrar no portal.',
        dica: '💡 Dica: Divida seu código em 3 blocos comentados. Avance até o cruzamento, resolva o Norte, depois o Sul e por fim o Altar!',
        grade: {
            largura: 9,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 4, 2, 1, 1, 1, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 9, 3, 1, 1],
                [1, 1, 1, 0, 1, 1, 1, 1, 1],
                [1, 1, 1, 6, 2, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 3 },
        objetivos: [
            { id: 'subproblema_a', texto: 'Subproblema A: Desarmar Espinho e Coletar Runa Norte', atingido: false },
            { id: 'subproblema_b', texto: 'Subproblema B: Derrotar Sentinela e Coletar Runa Sul', atingido: false },
            { id: 'subproblema_c', texto: 'Subproblema C: Consagrar o Altar Sagrado e Sair', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.desarmar()', label: 'desarmar()', icon: '🛡️' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 10: DECOMPOSIÇÃO EM 3 SUBPROBLEMAS
// Dica: Avance até o cruzamento em direção à Ala Norte:
// ============================================

// --- Subproblema A: Ala Norte ---
heroi.moverDireita();
`
    },

    // --- FASE 11: As Quatro Câmaras Cardeais ---
    {
        id: 11,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 3: Quatro Quadrantes',
        titulo: 'Fase 11: A Fortaleza das Quatro Câmaras Cardeais',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Dividir problemas em 4 quadrantes simétricos para manter código legível e limpo.',
            analogia: 'Os quatro pontos cardeais: Norte, Sul, Leste e Oeste.',
            regraOuro: 'Visite cada câmara em ordem, recolha os 4 cristais, ative o altar central e saia!'
        },
        descricao: 'Esta grande fortaleza possui 4 câmaras em cada extremo. Decomponha em 4 passos: colete os 4 cristais, ative o Altar Sagrado central e cruze o portal.',
        dica: '💡 Dica: Divida em: Câmaras do lado Oeste -> Câmaras do lado Leste -> Altar central -> Saída.',
        grade: {
            largura: 9,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 2, 1, 1, 1, 1, 2, 1, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1],
                [1, 0, 0, 0, 9, 0, 0, 3, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1],
                [1, 2, 1, 1, 1, 1, 2, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 3 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar os 4 Cristais das Câmaras', atingido: false },
            { id: 'ativar_altar_saida', texto: 'Consagrar o Altar Central e Alcançar o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 11: QUATRO QUADRANTES
// Dica: Inicie subindo para a primeira câmara noroeste:
// ============================================

heroi.moverCima();
`
    },

    // --- FASE 12: Grande Labirinto Composto ---
    {
        id: 12,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 4: Sistema Composto',
        titulo: 'Fase 12: O Grande Labirinto de Mecanismos e Guardiões',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Decomposição profunda de sistemas combinando mecanismos, combate e magia.',
            analogia: 'Uma missão espacial com múltiplos protocolos independentes.',
            regraOuro: 'Divida em 3 blocos: 1) Alavanca Norte, 2) Combate Sul, 3) Cruzar Ponte e Altar Leste.'
        },
        descricao: 'Este grande desafio de decomposição exige:\n• Etapa 1: Subir e acionar a alavanca em (2,1) para baixar a ponte levadiça\n• Etapa 2: Descer, derrotar o orc em (2,5) e recolher o cristal\n• Etapa 3: Cruzar a ponte, desarmar os espinhos em (6,1), pegar as runas, ativar o altar e sair!',
        dica: '💡 Dica: Resolva uma ala por vez com foco e organização em blocos comentados!',
        grade: {
            largura: 10,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 5, 1, 1, 1, 4, 2, 1, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
                [1, 0, 0, 7, 0, 0, 0, 9, 3, 1],
                [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
                [1, 0, 6, 2, 1, 1, 0, 2, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 3 },
        objetivos: [
            { id: 'alavanca_ponte', texto: 'Acionar a Alavanca e Baixar a Ponte', atingido: false },
            { id: 'limpar_perigos', texto: 'Derrotar o Orc e Desarmar os Espinhos', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar os Cristais das Câmaras', atingido: false },
            { id: 'ativar_altar_portal', texto: 'Consagrar o Altar e Entrar no Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.desarmar()', label: 'desarmar()', icon: '🛡️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 12: DECOMPOSIÇÃO EM SISTEMA COMPOSTO
// Dica: Suba primeiro para acionar a alavanca da ponte:
// ============================================

// --- Etapa 1: Alavanca Norte ---
heroi.moverCima();
`
    },

    // =============================================================
    // PILAR 4: RECONHECIMENTO DE PADRÕES (Fases 13 a 16) - 0.20 pts cada
    // =============================================================

    // --- FASE 13: Ritmo dos 4 Cristais ---
    {
        id: 13,
        pilar: 'padroes',
        pilarNome: 'Padrões 1: Repetição Simples',
        titulo: 'Fase 13: O Ritmo dos Quatro Cristais e a Ponte',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Reconhecimento de Padrões é identificar sequências idênticas e automatizá-las usando laços ou parâmetros.',
            analogia: 'Bater palmas no ritmo da música: repetir o mesmo movimento 4 vezes.',
            regraOuro: '⭐ NOTA MÁXIMA: Use repetir(4) { ... } OU parâmetros como heroi.moverDireita(4).'
        },
        descricao: 'A galeria possui 4 cristais mágicos alinhados e uma ponte levadiça. Use repetição inteligente (laço repetir(4) ou comandos com número no parêntese), puxe a alavanca para baixar a ponte e entre no portal!',
        dica: '💡 Dica: Identifique o padrão [moverDireita + coletar] repetido 4 vezes! Depois puxe a alavanca e cruze a ponte.',
        grade: {
            largura: 10,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 2, 2, 2, 2, 5, 7, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar os 4 Cristais da Galeria', atingido: false },
            { id: 'usar_repeticao', texto: '⭐ Bônus de Padrão: Usar laço repetir(4) ou parâmetros numéricos', atingido: false },
            { id: 'ativar_ponte_portal', texto: 'Acionar a Alavanca e Cruzar a Ponte até o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' },
            { cmd: 'repetir(4) {\n    heroi.moverDireita();\n    heroi.coletar();\n}', label: 'repetir(4) { ... }', icon: '🔁' }
        ],
        codigoInicial: `// ============================================
// FASE 13: RECONHECIMENTO DE PADRÕES (Laços ou Parâmetros)
// Dica: Reconheça o padrão [moverDireita + coletar] repetido 4 vezes:
// ============================================

repetir(4) {
    heroi.moverDireita();
    // Complete aqui com heroi.coletar()...
}

// Depois avance até a alavanca, ative-a e cruze a ponte!
`
    },

    // --- FASE 14: Galeria Composta e Sentinela ---
    {
        id: 14,
        pilar: 'padroes',
        pilarNome: 'Padrões 2: Laço Composto',
        titulo: 'Fase 14: A Grande Galeria Composta e o Sentinela',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Padrões compostos envolvem ciclos de múltiplas ações repetidas em blocos.',
            analogia: 'Passada de atleta: dar dois passos e saltar.',
            regraOuro: '⭐ NOTA MÁXIMA: Identifique o ciclo [2 passos para direita + coletar] e automatize com repetir(3)!'
        },
        descricao: 'Esta grande galeria possui 3 cristais espaçados exatamente a 2 passos de distância, protegidos por um Sentinela Orc no fim da rota.\n\nUse repetição (repetir(3) ou parâmetros numéricos), derrote o orc com heroi.atacar() e entre no portal!',
        dica: '💡 Dica: Cada cristal está a 2 passos! Use repetir(3) { heroi.moverDireita(2); heroi.coletar(); } e derrote o guarda.',
        grade: {
            largura: 11,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 2, 0, 2, 0, 2, 6, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar os 3 Cristais da Galeria', atingido: false },
            { id: 'usar_repeticao', texto: '⭐ Bônus de Padrão: Usar laço repetir(...) ou parâmetros numéricos', atingido: false },
            { id: 'derrotar_guardiao', texto: 'Derrotar o Sentinela Orc com atacar() e Alcançar o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'repetir(3) {\n    heroi.moverDireita(2);\n    heroi.coletar();\n}', label: 'repetir(3) { ... }', icon: '🔁' }
        ],
        codigoInicial: `// ============================================
// FASE 14: RECONHECIMENTO DE PADRÕES COMPOSTOS
// Dica: Automatize o ciclo de 2 passos + coletar repetido 3 vezes:
// ============================================

repetir(3) {
    heroi.moverDireita(2);
    // Complete aqui com heroi.coletar()...
}

// Depois ataque o sentinela e entre no portal!
`
    },

    // --- FASE 15: Degraus da Torre (Escada Lógica) ---
    {
        id: 15,
        pilar: 'padroes',
        pilarNome: 'Padrões 3: Padrão Bidimensional',
        titulo: 'Fase 15: O Padrão dos Degraus da Torre (Escada Lógica)',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Padrões podem combinar movimentos em múltiplos eixos (diagonal em escada).',
            analogia: 'Descer uma escadaria: dar um passo à frente e um degrau para baixo.',
            regraOuro: '⭐ NOTA MÁXIMA: Identifique o ciclo [moverDireita, moverBaixo, coletar] repetido 4 vezes!'
        },
        descricao: 'A descida da torre possui 4 cristais em degraus perfeitamente simétricos. O ciclo que se repete é: avançar para a direita, descer um degrau e coletar o cristal.\n\nUse repetir(4) ou parâmetros para automatizar a descida!',
        dica: '💡 Dica: Dentro do laço de 4 repetições: moverDireita() -> moverBaixo() -> coletar()!',
        grade: {
            largura: 8,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 1, 1, 1, 1, 1],
                [1, 1, 2, 0, 1, 1, 1, 1],
                [1, 1, 1, 2, 0, 1, 1, 1],
                [1, 1, 1, 1, 2, 0, 1, 1],
                [1, 1, 1, 1, 1, 2, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'coletar_gemas', texto: 'Coletar os 4 Cristais nos Degraus', atingido: false },
            { id: 'usar_repeticao', texto: '⭐ Bônus de Padrão: Usar laço repetir(4) ou parâmetros', atingido: false },
            { id: 'alcancar_saida', texto: 'Alcançar o Portal no Fim da Escada', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'repetir(4) {\n    heroi.moverDireita();\n    heroi.moverBaixo();\n    heroi.coletar();\n}', label: 'repetir(4) { ... }', icon: '🔁' }
        ],
        codigoInicial: `// ============================================
// FASE 15: PADRÃO EM ESCADA
// Dica: Reconheça o ciclo [moverDireita + moverBaixo + coletar]:
// ============================================

repetir(4) {
    heroi.moverDireita();
    // Complete aqui com moverBaixo() e coletar()...
}

// Depois dê o passo final para o portal!
`
    },

    // --- FASE 16: Corredor de Desarme e Coleta Rítmica ---
    {
        id: 16,
        pilar: 'padroes',
        pilarNome: 'Padrões 4: Ações Rítmicas Compostas',
        titulo: 'Fase 16: O Corredor de Desarme e Coleta Rítmica',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Padrões que alternam ferramentas de interação e movimento em sequência periódica.',
            analogia: 'Uma linha de montagem industrial que fura, rosqueia e inspeciona cada peça.',
            regraOuro: '⭐ NOTA MÁXIMA: Identifique o ciclo [desarmar, avançar 2 passos, coletar] repetido 3 vezes!'
        },
        descricao: 'Este corredor antigo possui 3 seções idênticas com armadilha e cristal. Use repetição inteligente para desarmar cada armadilha, recolher os cristais e sair no portal com maestria!',
        dica: '💡 Dica: Siga o padrão: desarmar() -> moverDireita(2) -> coletar() repetido 3 vezes!',
        grade: {
            largura: 11,
            altura: 5,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 4, 2, 4, 2, 4, 2, 0, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'desarmar_armadilhas', texto: 'Desarmar as 3 Armadilhas de Espinhos', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar os 3 Cristais da Galeria', atingido: false },
            { id: 'usar_repeticao', texto: '⭐ Bônus de Padrão: Usar laço repetir(3) ou parâmetros', atingido: false },
            { id: 'alcancar_saida', texto: 'Entrar no Portal Místico', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.desarmar()', label: 'desarmar()', icon: '🛡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'repetir(3) {\n    heroi.desarmar();\n    heroi.moverDireita(2);\n    heroi.coletar();\n}', label: 'repetir(3) { ... }', icon: '🔁' }
        ],
        codigoInicial: `// ============================================
// FASE 16: DESARME E COLETA RÍTMICA
// Dica: Inicie desarmando a primeira armadilha à sua frente:
// ============================================

heroi.desarmar();
`
    },

    // =============================================================
    // PILAR 5: ABSTRAÇÃO E FUNÇÕES (Fases 17 a 20) - 0.20 pts cada
    // =============================================================

    // --- FASE 17: Função Reutilizável Simples ---
    {
        id: 17,
        pilar: 'abstracao',
        pilarNome: 'Abstração 1: Função Reutilizável',
        titulo: 'Fase 17: O Primeiro Feitiço Abstrato',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Abstração é empacotar uma rotina completa dentro de uma Função reutilizável para não duplicar código.',
            analogia: 'Um botão de controle remoto: aperta um botão e uma série de ações acontecem sozinhas.',
            regraOuro: '⭐ NOTA MÁXIMA: Defina funcao purificarCamara() { ... } e chame-a nas 2 câmaras!'
        },
        descricao: 'Existem 2 câmaras mágicas que exigem exatamente o mesmo ritual: avançar, purificar o altar elemental com heroi.purificar(), coletar a essência com heroi.coletar() e retornar ao corredor principal.\n\nInstruções:\n1) Defina a função modular purificarCamara()\n2) Execute-a na 1ª Câmara (Norte) e na 2ª Câmara (Sul)\n3) Consagre o Altar Sagrado com heroi.ativarAltar() e cruze o Portal!',
        dica: '💡 Dica: Complete o corpo da função. Depois invoque purificarCamara(), desça com heroi.moverBaixo(2), invoque novamente e vá ao altar!',
        grade: {
            largura: 8,
            altura: 6,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 0, 9, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'purificar_camaras', texto: 'Purificar e Coletar os Recursos das 2 Câmaras', atingido: false },
            { id: 'usar_abstracao', texto: '⭐ Bônus de Abstração: Criar e Usar Função funcao', atingido: false },
            { id: 'ativar_altar_portal', texto: 'Consagrar o Altar Sagrado e Alcançar a Saída', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverDireita(4)', label: 'moverDireita(4)', icon: '🚀' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.moverEsquerda(2)', label: 'moverEsquerda(2)', icon: '⏪' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.purificar()', label: 'purificar()', icon: '🔮' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' },
            { cmd: 'funcao purificarCamara() {\n    heroi.moverDireita();\n    heroi.purificar();\n    heroi.moverDireita();\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao purificarCamara()', icon: '📦' }
        ],
        codigoInicial: `// ============================================
// FASE 17: ABSTRAÇÃO (Criando Funções Modulares)
// Dica: Crie a função reutilizável do ritual das câmaras:
// ============================================

funcao purificarCamara() {
    heroi.moverDireita();
    // Complete com purificar(), coletar() e retorno...
}

// Invoque para a primeira câmara:
purificarCamara();
`
    },

    // --- FASE 18: Três Câmaras Gêmeas ---
    {
        id: 18,
        pilar: 'abstracao',
        pilarNome: 'Abstração 2: Reutilização em Múltiplos Níveis',
        titulo: 'Fase 18: O Ritual das Três Câmaras Gêmeas',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'A mesma função abstrata pode ser reaproveitada quantas vezes forem necessárias ao longo do mapa.',
            analogia: 'Uma função de somar: funciona para qualquer par de números sem precisar recriar a matemática.',
            regraOuro: '⭐ NOTA MÁXIMA: Invoque a mesma função purificarCamara() nas 3 câmaras!'
        },
        descricao: 'O templo possui 3 andares com câmaras idênticas. Crie a função abstrata, invoque-a no 1º andar, desça com heroi.moverBaixo(2), invoque no 2º andar, desça, invoque no 3º andar, ative o altar e termine a missão!',
        dica: '💡 Dica: Uma única função resolve os 3 andares. Basta chamá-la após se deslocar no corredor!',
        grade: {
            largura: 9,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 0, 0, 9, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'purificar_tres_camaras', texto: 'Purificar e Coletar Recursos das 3 Câmaras', atingido: false },
            { id: 'usar_abstracao', texto: '⭐ Bônus de Abstração: Criar e Reutilizar Função funcao', atingido: false },
            { id: 'ativar_altar_portal', texto: 'Consagrar o Altar e Alcançar a Saída', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.purificar()', label: 'purificar()', icon: '🔮' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' },
            { cmd: 'funcao purificarCamara() {\n    heroi.moverDireita();\n    heroi.purificar();\n    heroi.moverDireita();\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao purificarCamara()', icon: '📦' }
        ],
        codigoInicial: `// ============================================
// FASE 18: REUTILIZAÇÃO EM 3 ANDARES
// Dica: Crie a função e chame-a em cada andar:
// ============================================

funcao purificarCamara() {
    heroi.moverDireita();
    // Complete aqui...
}

// Invoque no primeiro andar:
purificarCamara();
`
    },

    // --- FASE 19: Abstração Tática de Ataque e Coleta ---
    {
        id: 19,
        pilar: 'abstracao',
        pilarNome: 'Abstração 3: Rotinas Táticas',
        titulo: 'Fase 19: A Abstração Tática de Ataque e Coleta',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Abstração também organiza rotinas de ação e combate em procedimentos reutilizáveis.',
            analogia: 'Uma jogada ensaiada no futebol: todos executam a rotina combinada.',
            regraOuro: '⭐ NOTA MÁXIMA: Crie a função funcao derrotarPosto() que ataca o orc, recolhe a relíquia e recua!'
        },
        descricao: 'Três postos avançados orcs protegem cristais preciosos em cada câmara. Encapsule a rotina tática na função derrotarPosto(), execute nos 3 postos, ative o altar sagrado e entre no portal!',
        dica: '💡 Dica: funcao derrotarPosto() { heroi.atacar(); heroi.moverDireita(2); heroi.coletar(); heroi.moverEsquerda(2); }',
        grade: {
            largura: 10,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 6, 2, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 6, 2, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 6, 2, 0, 0, 0, 9, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'derrotar_postos', texto: 'Derrotar os 3 Guardiões Orcs dos Postos', atingido: false },
            { id: 'coletar_gemas', texto: 'Coletar os 3 Cristais Guardados', atingido: false },
            { id: 'usar_abstracao', texto: '⭐ Bônus de Abstração: Criar Função funcao', atingido: false },
            { id: 'ativar_altar_portal', texto: 'Consagrar Altar e Cruzar o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverEsquerda(2)', label: 'moverEsquerda(2)', icon: '⏪' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' },
            { cmd: 'funcao derrotarPosto() {\n    heroi.atacar();\n    heroi.moverDireita(2);\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao derrotarPosto()', icon: '📦' }
        ],
        codigoInicial: `// ============================================
// FASE 19: ABSTRAÇÃO DE ROTINAS TÁTICAS
// Dica: Crie a rotina de combate e coleta:
// ============================================

funcao derrotarPosto() {
    heroi.atacar();
    // Complete aqui...
}

// Invoque para o primeiro posto:
derrotarPosto();
`
    },

    // --- FASE 20: Grande Santuário Mestre (Desafio Final 4.0!) ---
    {
        id: 20,
        pilar: 'abstracao',
        pilarNome: 'Abstração 4: O Desafio Mestre 4.0',
        titulo: 'Fase 20: O Grande Santuário dos Quatro Elementos',
        pontosFase: 0.20,
        conceitoDidatico: {
            definicao: 'Abstração em alto nível integra todos os pilares: modularizar tarefas para dominar sistemas complexos com clareza.',
            analogia: 'O cockpit de um foguete: funções prontas operando sistemas inteiros com simplicidade.',
            regraOuro: '⭐ NOTA MÁXIMA (4.0 TOTAL): Invoque a função ritualCamara() nas 3 câmaras, derrote o sentinela e ative o altar!'
        },
        descricao: 'Este é o grande desafio final da sua avaliação! O santuário possui 3 grandes câmaras elementais (Fogo, Gelo e Trovão) e uma câmara real protegida por um Guardião Orc Titã.\n\nInstruções completas do cenário:\n1) Crie a função abstrata ritualCamara() que entra na câmara, purifica o elemento, recolhe o cristal mestre e retorna ao corredor\n2) Chame a função na 1ª, 2ª e 3ª Câmaras\n3) Avance pelo grande salão, derrote o Guardião Titã com heroi.atacar()\n4) Consagre o Altar da Vitória com heroi.ativarAltar() e cruze o Portal Final para conquistar a Nota 4.0!',
        dica: '💡 Dica de Mestre: Complete a função ritualCamara(). Chame-a na 1ª câmara, desça com heroi.moverBaixo(2), chame na 2ª, desça, chame na 3ª, derrote o orc, ative o altar e termine vitorioso com 4.0!',
        grade: {
            largura: 11,
            altura: 7,
            mapa: [
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 8, 2, 0, 6, 0, 9, 0, 3, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
            ]
        },
        heroiInicio: { x: 1, y: 1 },
        objetivos: [
            { id: 'purificar_tres_camaras', texto: 'Purificar e Coletar os 3 Cristais das Câmaras', atingido: false },
            { id: 'usar_abstracao', texto: '⭐ Bônus de Abstração: Criar e Usar Função funcao', atingido: false },
            { id: 'derrotar_guardiao', texto: 'Derrotar o Guardião Orc Titã com atacar()', atingido: false },
            { id: 'conquistar_final', texto: 'Ativar Altar da Vitória e Cruzar o Portal Final (Nota 4.0!)', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.moverDireita(3)', label: 'moverDireita(3)', icon: '🚀' },
            { cmd: 'heroi.moverEsquerda(2)', label: 'moverEsquerda(2)', icon: '⏪' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.purificar()', label: 'purificar()', icon: '🔮' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' },
            { cmd: 'funcao ritualCamara() {\n    heroi.moverDireita();\n    heroi.purificar();\n    heroi.moverDireita();\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao ritualCamara()', icon: '📦' }
        ],
        codigoInicial: `// ============================================
// FASE 20: O DESAFIO MESTRE DE ABSTRAÇÃO (NOTA 4.0)
// Dica: Crie a função reutilizável para o ritual das 3 câmaras:
// ============================================

funcao ritualCamara() {
    heroi.moverDireita();
    // Complete aqui: purificar(), coletar() e retornar...
}

// Invoque a função para a primeira câmara:
ritualCamara();
`
    }
];

window.GAME_LEVELS = GAME_LEVELS;
