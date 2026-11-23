// =========================================================================
// 10 FASES AVALIATIVAS DE PENSAMENTO COMPUTACIONAL - EDUDIGITAL
// Cada fase vale rigorosamente 0.40 pts -> 10 x 0.40 = 4.00 pontos no total.
// 5 Pilares x 2 Fases cada (0.80 pts por pilar). Geometria rigorosa e dicas seguras.
// =========================================================================

const GAME_LEVELS = [
    // =============================================================
    // PILAR 1: INSTRUÇÕES E SEQUENCIAMENTO (Fases 1 e 2) - 0.40 pts cada
    // =============================================================

    // --- FASE 1: Sequência em Linha Reta ---
    {
        id: 1,
        pilar: 'instrucoes',
        pilarNome: 'Instruções 1: Sequência Direta',
        titulo: 'Fase 1: O Primeiro Passo no Corredor',
        pontosFase: 0.40,
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
        pontosFase: 0.40,
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

    // =============================================================
    // PILAR 2: ALGORITMOS E CAUSALIDADE (Fases 3 e 4) - 0.40 pts cada
    // =============================================================

    // --- FASE 3: Causalidade e Ponte ---
    {
        id: 3,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 1: Causalidade e Ponte',
        titulo: 'Fase 3: O Mecanismo da Ponte Levadiça',
        pontosFase: 0.40,
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
// FASE 3: ALGORITMO E CAUSA/EFEITO
// Dica: Suba primeiro para ir até a alavanca:
// ============================================

heroi.moverCima();
`
    },

    // --- FASE 4: Chave e Combate ---
    {
        id: 4,
        pilar: 'algoritmo',
        pilarNome: 'Algoritmo 2: Ordem e Combate',
        titulo: 'Fase 4: A Chave e o Sentinela Orc',
        pontosFase: 0.40,
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
// FASE 4: ALGORITMO COM COMBATE
// Dica: Avance até o cristal antes de descer:
// ============================================

heroi.moverDireita();
`
    },

    // =============================================================
    // PILAR 3: DECOMPOSIÇÃO (Fases 5 e 6) - 0.40 pts cada
    // =============================================================

    // --- FASE 5: Decomposição em Duas Alas ---
    {
        id: 5,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 1: Duas Alas Independentes',
        titulo: 'Fase 5: As Duas Alas da Câmara Antiga',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Decomposição consiste em quebrar um objetivo complexo em subproblemas menores.',
            analogia: 'Arrumar a casa cômodo por cômodo: sala primeiro, depois quarto.',
            regraOuro: 'Divida em 2 partes: Parte 1 (Ala Norte) e Parte 2 (Ala Sul e Altar).'
        },
        descricao: 'Para atravessar esta grande câmara, decomponha o algoritmo em duas etapas:\n• Etapa 1: Suba até a Ala Norte, colete o cristal e acione a alavanca da ponte\n• Etapa 2: Retorne ao centro, cruze a ponte até a Ala Sul, pegue o cristal, ative o altar sagrado e saia.',
        dica: '💡 Dica: Resolva a Ala Norte por completo, depois volte ao corredor central para resolver a Ala Sul.',
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
            { id: 'ativar_alavanca', texto: 'Parte 1: Acionar a Alavanca Norte', atingido: false },
            { id: 'altar_e_gemas', texto: 'Parte 2: Coletar os 2 Cristais e Consagrar o Altar', atingido: false },
            { id: 'alcancar_saida', texto: 'Alcançar o Portal de Saída', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.moverEsquerda(2)', label: 'moverEsquerda(2)', icon: '⏪' },
            { cmd: 'heroi.moverDireita(3)', label: 'moverDireita(3)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 5: DECOMPOSIÇÃO EM DUAS ALAS
// Dica: Inicie subindo para a Ala Norte:
// ============================================

// --- Etapa 1: Ala Norte ---
heroi.moverCima();
`
    },

    // --- FASE 6: Decomposição em Três Módulos ---
    {
        id: 6,
        pilar: 'decomposicao',
        pilarNome: 'Decomposição 2: Três Subproblemas',
        titulo: 'Fase 6: O Bastilhão dos Guardiões',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Decompor sistemas com múltiplos perigos dividindo em módulos especializados.',
            analogia: 'Uma linha de montagem: corte, solda e pintura em setores separados.',
            regraOuro: 'Divida em 3 módulos: 1) Ala Superior, 2) Ala Inferior, 3) Altar e Portal Central.'
        },
        descricao: 'Este bastilhão exige resolver três tarefas distintas:\n• Módulo 1 (Superior): Avançar, desarmar a armadilha de espinhos e coletar o cristal\n• Módulo 2 (Inferior): Descer, derrotar o orc guerreiro com heroi.atacar() e coletar o cristal\n• Módulo 3 (Central): Voltar ao corredor central, consagrar o altar e cruzar o portal!',
        dica: '💡 Dica: Estruture seu código com comentários separando cada um dos 3 módulos!',
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
            { id: 'desarmar_topo', texto: 'Módulo 1: Desarmar Espinhos no Topo', atingido: false },
            { id: 'combate_base', texto: 'Módulo 2: Derrotar o Orc na Base', atingido: false },
            { id: 'altar_portal', texto: 'Módulo 3: Coletar Cristais, Altar e Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'heroi.moverCima()', label: 'moverCima()', icon: '⬆️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverEsquerda()', label: 'moverEsquerda()', icon: '⬅️' },
            { cmd: 'heroi.desarmar()', label: 'desarmar()', icon: '🛡️' },
            { cmd: 'heroi.atacar()', label: 'atacar()', icon: '⚔️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '✨' }
        ],
        codigoInicial: `// ============================================
// FASE 6: DECOMPOSIÇÃO EM 3 MÓDULOS
// Dica: Avance até a bifurcação central:
// ============================================

heroi.moverDireita();
`
    },

    // =============================================================
    // PILAR 4: RECONHECIMENTO DE PADRÕES (Fases 7 e 8) - 0.40 pts cada
    // =============================================================

    // --- FASE 7: Trilha Rítmica de Cristais ---
    {
        id: 7,
        pilar: 'padroes',
        pilarNome: 'Padrões 1: A Trilha Rítmica',
        titulo: 'Fase 7: A Trilha Rítmica de Cristais',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Reconhecimento de Padrões identifica ações idênticas para usar laços de repetição.',
            analogia: 'O refrão de uma música: repete-se várias vezes sem precisar reescrever a letra.',
            regraOuro: 'Perceba o padrão repetido: (moverDireita + coletar) 4 vezes seguidas!'
        },
        descricao: 'Uma trilha de 4 cristais está disposta em sequência uniforme. Em vez de escrever 8 linhas manuais repetidas, use o laço:\nrepetir(4) {\n    heroi.moverDireita();\n    heroi.coletar();\n}\nDepois ative a alavanca da ponte e saia!',
        dica: '💡 Dica: Você pode usar repetir(4) { ... } ou passar o número de passos heroi.moverDireita(4). Aplicar o padrão garante nota máxima!',
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
            { id: 'coletar_gemas', texto: 'Coletar os 4 Cristais da Trilha', atingido: false },
            { id: 'usou_loop', texto: 'Reconhecer e Aplicar o Laço repetir()', atingido: false },
            { id: 'alcancar_saida', texto: 'Acionar a Ponte e Alcançar o Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'repetir(4) {\n    heroi.moverDireita();\n    heroi.coletar();\n}', label: 'repetir(4) { ... }', icon: '🔁' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverDireita(2)', label: 'moverDireita(2)', icon: '⏩' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' },
            { cmd: 'heroi.ativarAlavanca()', label: 'ativarAlavanca()', icon: '🕹️' }
        ],
        codigoInicial: `// ============================================
// FASE 7: RECONHECIMENTO DE PADRÕES 1
// Dica: Reconheça a repetição de avançar e coletar:
// ============================================

repetir(4) {
    heroi.moverDireita();
    heroi.coletar();
}
`
    },

    // --- FASE 8: Escadaria das Relíquias ---
    {
        id: 8,
        pilar: 'padroes',
        pilarNome: 'Padrões 2: Bloco Composto',
        titulo: 'Fase 8: A Escadaria das Relíquias',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Padrões podem ser blocos de comandos múltiplos repetidos em ciclo.',
            analogia: 'Descer uma escada: pisar no degrau, descer o pé, equilibrar. Repetir.',
            regraOuro: 'Cada degrau é: moverDireita() + moverBaixo() + coletar(). Repita 4 vezes!'
        },
        descricao: 'A masmorra desce em formato de escadaria com 4 degraus perfeitos. Identifique o bloco padrão de cada degrau e aplique dentro do laço repetir(4).',
        dica: '💡 Dica: O bloco é: moverDireita() -> moverBaixo() -> coletar(). Use repetir(4) { ... } para descer os 4 degraus!',
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
            { id: 'coletar_gemas', texto: 'Coletar os 4 Cristais da Escadaria', atingido: false },
            { id: 'usou_loop', texto: 'Aplicar o Laço repetir() no Bloco Composto', atingido: false },
            { id: 'alcancar_saida', texto: 'Chegar ao Portal no Fim da Escadaria', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'repetir(4) {\n    heroi.moverDireita();\n    heroi.moverBaixo();\n    heroi.coletar();\n}', label: 'repetir(4) { ... }', icon: '🔁' },
            { cmd: 'heroi.moverDireita()', label: 'moverDireita()', icon: '➡️' },
            { cmd: 'heroi.moverBaixo()', label: 'moverBaixo()', icon: '⬇️' },
            { cmd: 'heroi.coletar()', label: 'coletar()', icon: '💎' }
        ],
        codigoInicial: `// ============================================
// FASE 8: PADRÕES EM BLOCO COMPOSTO
// Dica: Reconheça o padrão de cada degrau:
// ============================================

repetir(4) {
    heroi.moverDireita();
    heroi.moverBaixo();
    heroi.coletar();
}
`
    },

    // =============================================================
    // PILAR 5: ABSTRAÇÃO (Fases 9 e 10) - 0.40 pts cada
    // =============================================================

    // --- FASE 9: Procedimento Reutilizável ---
    {
        id: 9,
        pilar: 'abstracao',
        pilarNome: 'Abstração 1: Procedimento Reutilizável',
        titulo: 'Fase 9: O Ritual da Dupla Câmara Sagrada',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Abstração é criar funções reutilizáveis para rotinas completas, simplificando o código.',
            analogia: 'O controle remoto: você aperta "Volume" e ele executa todo o circuito interno.',
            regraOuro: 'Crie funcao purificarCamara() e chame-a para cada uma das duas câmaras!'
        },
        descricao: 'Duas câmaras idênticas contêm Tochas Sombrias em chamas. Defina a função purificarCamara():\n• Avançar até a tocha, usar heroi.purificar(), coletar o cristal e retornar.\nDepois chame purificarCamara() para a câmara norte, desça, chame-a novamente para a câmara sul, consagre o altar e vença!',
        dica: '💡 Dica: Crie uma vez: funcao purificarCamara() { ... } e chame duas vezes!',
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
            { id: 'coletar_gemas', texto: 'Purificar e Coletar os 2 Cristais', atingido: false },
            { id: 'usou_funcao', texto: 'Declarar e Usar funcao Nome()', atingido: false },
            { id: 'altar_portal', texto: 'Consagrar o Altar e Entrar no Portal', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'funcao purificarCamara() {\n    heroi.moverDireita();\n    heroi.purificar();\n    heroi.moverDireita();\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao purificarCamara()', icon: '🔮' },
            { cmd: 'purificarCamara();', label: 'purificarCamara()', icon: '✨' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.moverDireita(4)', label: 'moverDireita(4)', icon: '⏩' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '⭐' }
        ],
        codigoInicial: `// ============================================
// FASE 9: ABSTRAÇÃO COM FUNÇÃO
// Dica: Defina a função de purificação:
// ============================================

funcao purificarCamara() {
    heroi.moverDireita();
    heroi.purificar();
    heroi.moverDireita();
    heroi.coletar();
    heroi.moverEsquerda(2);
}
`
    },

    // --- FASE 10: Grande Desafio Final de Abstração ---
    {
        id: 10,
        pilar: 'abstracao',
        pilarNome: 'Abstração 2: Santuário das Três Câmaras',
        titulo: 'Fase 10: O Grande Santuário das Três Câmaras',
        pontosFase: 0.40,
        conceitoDidatico: {
            definicao: 'Abstração máxima: usar a mesma função em múltiplos pontos de uma missão épica.',
            analogia: 'Uma função salvarArquivo() que serve para textos, fotos e vídeos.',
            regraOuro: 'Reutilize purificarCamara() 3 vezes para libertar o santuário e consagrar o altar!'
        },
        descricao: 'O desafio final da avaliação! Três câmaras idênticas precisam de purificação. Abstraia a rotina completa na função purificarCamara() e execute-a nas 3 câmaras antes de ativar o altar sagrado e concluir o curso com nota 4.0!',
        dica: '💡 Dica: Crie a função purificarCamara(), execute-a 3 vezes ao longo do corredor vertical, ative o altar sagrado e entre no portal final!',
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
            { id: 'coletar_gemas', texto: 'Purificar e Coletar os 3 Cristais Sagrados', atingido: false },
            { id: 'usou_funcao', texto: 'Declarar e Reutilizar funcao Nome()', atingido: false },
            { id: 'altar_portal', texto: 'Consagrar o Altar Maior e Concluir a Avaliação', atingido: false }
        ],
        comandosDisponiveis: [
            { cmd: 'funcao purificarCamara() {\n    heroi.moverDireita();\n    heroi.purificar();\n    heroi.moverDireita();\n    heroi.coletar();\n    heroi.moverEsquerda(2);\n}', label: 'funcao purificarCamara()', icon: '🔮' },
            { cmd: 'purificarCamara();', label: 'purificarCamara()', icon: '✨' },
            { cmd: 'heroi.moverBaixo(2)', label: 'moverBaixo(2)', icon: '⏬' },
            { cmd: 'heroi.moverDireita(5)', label: 'moverDireita(5)', icon: '⏩' },
            { cmd: 'heroi.ativarAltar()', label: 'ativarAltar()', icon: '⭐' }
        ],
        codigoInicial: `// ============================================
// FASE 10: O GRANDE DESAFIO DE ABSTRAÇÃO
// Dica: Defina a rotina para purificar as 3 câmaras:
// ============================================

funcao purificarCamara() {
    heroi.moverDireita();
    heroi.purificar();
    heroi.moverDireita();
    heroi.coletar();
    heroi.moverEsquerda(2);
}
`
    }
];

window.GAME_LEVELS = GAME_LEVELS;
