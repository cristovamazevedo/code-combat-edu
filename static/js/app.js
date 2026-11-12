// Controlador Principal da Aplicação (Layout Ergonômico Lado a Lado • 20 Fases)
document.addEventListener('DOMContentLoaded', () => {
    // Instâncias
    const engine = new DungeonEngine('gameCanvas');
    const evaluator = new Evaluator();

    // Estado da aplicação
    let currentStudent = null;
    let currentLevelIndex = 0;
    let teacherToken = sessionStorage.getItem('teacher_token') || null;

    // Elementos DOM - Aluno
    const studentModal = document.getElementById('studentModal');
    const studentForm = document.getElementById('studentForm');
    const inputNome = document.getElementById('inputNome');
    const inputTurma = document.getElementById('inputTurma');
    const studentTag = document.getElementById('studentTag');
    const studentNameDisplay = document.getElementById('studentNameDisplay');
    const studentTurmaDisplay = document.getElementById('studentTurmaDisplay');

    // Elementos DOM - Nível e Interface
    const levelTracker = document.getElementById('levelTracker');
    const pilarBadge = document.getElementById('pilarBadge');
    const questTitle = document.getElementById('questTitle');
    const questDesc = document.getElementById('questDesc');
    const questHint = document.getElementById('questHint');
    const phasePtsBadge = document.getElementById('phasePtsBadge');
    const objectivesList = document.getElementById('objectivesList');
    const quickCommands = document.getElementById('quickCommands');
    const codeEditor = document.getElementById('codeEditor');
    const btnRun = document.getElementById('btnRun');
    const btnReset = document.getElementById('btnReset');
    const consoleOutput = document.getElementById('consoleOutput');
    const arenaMsg = document.getElementById('arenaMsg');
    const speedSelect = document.getElementById('speedSelect');
    const btnToggleOverlay = document.getElementById('btnToggleOverlay');
    const scoreDisplayBadge = document.getElementById('scoreDisplayBadge');
    const btnFinishEval = document.getElementById('btnFinishEval');

    // Abas Didáticas
    const tabMissao = document.getElementById('tabMissao');
    const tabConceito = document.getElementById('tabConceito');
    const contentMissao = document.getElementById('contentMissao');
    const contentConceito = document.getElementById('contentConceito');
    const didacticDefText = document.getElementById('didacticDefText');
    const didacticAnalogyText = document.getElementById('didacticAnalogyText');

    // Guia Modal dos Pilares
    const guideModal = document.getElementById('guideModal');
    const btnOpenGuide = document.getElementById('btnOpenGuide');
    const closeGuideBtn = document.getElementById('closeGuideBtn');

    // Modal Desistir / Entregar Antecipadamente
    const confirmSurrenderModal = document.getElementById('confirmSurrenderModal');
    const closeSurrenderBtn = document.getElementById('closeSurrenderBtn');
    const btnCancelSurrender = document.getElementById('btnCancelSurrender');
    const btnConfirmSurrender = document.getElementById('btnConfirmSurrender');
    const surrenderPhaseText = document.getElementById('surrenderPhaseText');
    const surrenderScoreText = document.getElementById('surrenderScoreText');

    // Modais Professor & Conclusão
    const teacherModal = document.getElementById('teacherModal');
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    const inputTeacherPass = document.getElementById('inputTeacherPass');
    const teacherError = document.getElementById('teacherError');
    const btnOpenTeacher = document.getElementById('btnOpenTeacher');
    const closeTeacherBtn = document.getElementById('closeTeacherBtn');

    const teacherDashModal = document.getElementById('teacherDashModal');
    const closeDashBtn = document.getElementById('closeDashBtn');
    const filterTurma = document.getElementById('filterTurma');
    const btnExportCsv = document.getElementById('btnExportCsv');
    const teacherTableBody = document.getElementById('teacherTableBody');
    const statTotalAlunos = document.getElementById('statTotalAlunos');
    const statMediaGeral = document.getElementById('statMediaGeral');
    const statNivel4 = document.getElementById('statNivel4');
    const statNivel3 = document.getElementById('statNivel3');

    const certModal = document.getElementById('certModal');
    const certMainTitle = document.getElementById('certMainTitle');
    const certStudentName = document.getElementById('certStudentName');
    const certTurma = document.getElementById('certTurma');
    const certFinalScore = document.getElementById('certFinalScore');
    const certScoreBadge = document.getElementById('certScoreBadge');
    const certConceito = document.getElementById('certConceito');
    const certFeedback = document.getElementById('certFeedback');
    const certScoreInstrucoes = document.getElementById('certScoreInstrucoes');
    const certScoreAlgoritmo = document.getElementById('certScoreAlgoritmo');
    const certScoreDecomposicao = document.getElementById('certScoreDecomposicao');
    const certScorePadroes = document.getElementById('certScorePadroes');
    const certScoreAbstracao = document.getElementById('certScoreAbstracao');
    const btnCloseCert = document.getElementById('btnCloseCert');

    // Inicialização do Áudio no primeiro clique
    document.body.addEventListener('click', () => {
        window.gameAudio.init();
    }, { once: true });

    // Alternar Abas Didáticas
    tabMissao.addEventListener('click', () => {
        tabMissao.classList.add('active');
        tabConceito.classList.remove('active');
        contentMissao.style.display = 'flex';
        contentConceito.style.display = 'none';
    });

    tabConceito.addEventListener('click', () => {
        tabConceito.classList.add('active');
        tabMissao.classList.remove('active');
        contentConceito.style.display = 'flex';
        contentMissao.style.display = 'none';
    });

    // Controle de Velocidade
    speedSelect.addEventListener('change', () => {
        engine.stepDelay = parseInt(speedSelect.value) || 240;
    });

    // Alternar Guias no Mapa
    btnToggleOverlay.addEventListener('click', () => {
        engine.showDidacticOverlay = !engine.showDidacticOverlay;
        btnToggleOverlay.classList.toggle('active', engine.showDidacticOverlay);
    });

    // Abrir/Fechar Guia dos Pilares
    btnOpenGuide.addEventListener('click', () => {
        guideModal.classList.add('active');
    });

    closeGuideBtn.addEventListener('click', () => {
        guideModal.classList.remove('active');
    });

    // =========================================================================
    // Adaptador Inteligente: Backend Flask (Local) OU GitHub Pages (Navegador)
    // Funciona em qualquer navegador, computador, celular ou tablet via GitHub Pages!
    // =========================================================================
    const EduBackend = {
        isStaticHosting: window.location.protocol === 'file:' || window.location.hostname.includes('github.io'),

        getLocalDB() {
            try {
                return JSON.parse(localStorage.getItem('code_combat_edu_db') || '[]');
            } catch(e) {
                return [];
            }
        },

        saveLocalDB(db) {
            try {
                localStorage.setItem('code_combat_edu_db', JSON.stringify(db));
            } catch(e) {}
        },

        calcularConceito(nota) {
            if (nota >= 3.6) return { nivel: 'Nível 4 - Avançado / Excelente', feedback: 'Parabéns! Você demonstrou domínio brilhante em todos os 5 pilares do Pensamento Computacional!' };
            if (nota >= 2.6) return { nivel: 'Nível 3 - Proficiente / Bom', feedback: 'Muito bom trabalho! Você compreendeu a lógica estruturada e resolveu os desafios com sucesso.' };
            if (nota >= 1.6) return { nivel: 'Nível 2 - Básico / Em Desenvolvimento', feedback: 'Bom começo! Você já entende a sequência de comandos. Continue praticando decomposição e repetição.' };
            return { nivel: 'Nível 1 - Inicial / Em Construção', feedback: 'Você deu seus primeiros passos na programação! Revise as instruções passo a passo para evoluir.' };
        },

        async entrarAluno(nome, turma) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch('/api/aluno/entrar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ nome, turma })
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            // Modo Standalone Web (GitHub Pages)
            const db = this.getLocalDB();
            let aluno = db.find(a => a.nome.toLowerCase() === nome.toLowerCase() && a.turma.toLowerCase() === turma.toLowerCase());
            if (!aluno) {
                aluno = {
                    id: Date.now(),
                    avaliacao_id: Date.now(),
                    nome,
                    turma,
                    fase_atual: 1,
                    nota_atual: 0.0,
                    nota_final: 0.0,
                    status: 'Em Andamento',
                    nota_instrucoes: 0.0,
                    nota_algoritmo: 0.0,
                    nota_decomposicao: 0.0,
                    nota_padroes: 0.0,
                    nota_abstracao: 0.0,
                    ja_concluiu: false,
                    data_inicio: new Date().toISOString(),
                    data_fmt: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})
                };
                db.push(aluno);
                this.saveLocalDB(db);
            }
            return { sucesso: true, aluno };
        },

        async salvarProgresso(payload) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch('/api/avaliacao/progresso', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            // Modo Standalone Web (GitHub Pages)
            const db = this.getLocalDB();
            const idx = db.findIndex(a => a.id === payload.aluno_id || a.avaliacao_id === payload.avaliacao_id);
            if (idx !== -1) {
                db[idx].fase_atual = payload.fase_atual;
                db[idx].nota_final = payload.nota_final;
                db[idx].status = payload.status || 'Em Andamento';
                if (payload.pilares) {
                    db[idx].nota_instrucoes = payload.pilares.instrucoes || 0.0;
                    db[idx].nota_algoritmo = payload.pilares.algoritmo || 0.0;
                    db[idx].nota_decomposicao = payload.pilares.decomposicao || 0.0;
                    db[idx].nota_padroes = payload.pilares.padroes || 0.0;
                    db[idx].nota_abstracao = payload.pilares.abstracao || 0.0;
                }
                db[idx].data_fmt = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                this.saveLocalDB(db);
            }
            return { sucesso: true };
        },

        async finalizarAvaliacao(payload) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch('/api/avaliacao/finalizar', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            // Modo Standalone Web (GitHub Pages)
            const db = this.getLocalDB();
            const idx = db.findIndex(a => a.id === payload.aluno_id || a.avaliacao_id === payload.avaliacao_id);
            const nota = Math.min(4.0, Math.max(0.0, Number(payload.nota_final || 0)));
            const info = this.calcularConceito(nota);
            const status = payload.motivo === 'conclusao' ? 'Concluído' : 'Finalizado / Desistiu';

            if (idx !== -1) {
                db[idx].nota_final = nota;
                db[idx].fase_atual = payload.fase_atual;
                db[idx].status = status;
                db[idx].nivel_conceitual = info.nivel;
                db[idx].feedback = info.feedback;
                db[idx].ja_concluiu = true;
                if (payload.pilares) {
                    db[idx].nota_instrucoes = payload.pilares.instrucoes || 0.0;
                    db[idx].nota_algoritmo = payload.pilares.algoritmo || 0.0;
                    db[idx].nota_decomposicao = payload.pilares.decomposicao || 0.0;
                    db[idx].nota_padroes = payload.pilares.padroes || 0.0;
                    db[idx].nota_abstracao = payload.pilares.abstracao || 0.0;
                }
                db[idx].data_fmt = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
                this.saveLocalDB(db);
            }

            return {
                sucesso: true,
                nota_final: nota,
                fase_atual: payload.fase_atual,
                status: status,
                nivel_conceitual: info.nivel,
                feedback: info.feedback,
                pilares: payload.pilares || {}
            };
        },

        async loginProfessor(senha) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch('/api/professor/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ senha })
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            // Modo Standalone Web (GitHub Pages)
            if (senha === 'Luana@2011' || senha === 'Luana@ 2011') {
                return { sucesso: true, token: 'prof_token_' + Date.now() };
            }
            return { sucesso: false, erro: 'Senha incorreta!' };
        },

        async obterTurmas(token) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch('/api/professor/turmas', {
                        headers: { 'X-Teacher-Token': token }
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            const db = this.getLocalDB();
            const turmas = [...new Set(db.map(a => a.turma).filter(Boolean))].sort();
            return { turmas };
        },

        async obterAvaliacoes(token, turma) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch(`/api/professor/avaliacoes?turma=${encodeURIComponent(turma || '')}`, {
                        headers: { 'X-Teacher-Token': token }
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            let db = this.getLocalDB();
            if (turma) {
                db = db.filter(a => a.turma.toLowerCase() === turma.toLowerCase());
            }

            const total = db.length;
            const soma = db.reduce((acc, a) => acc + (Number(a.nota_final) || 0), 0);
            const media = total > 0 ? (soma / total) : 0;
            const n4 = db.filter(a => (Number(a.nota_final) || 0) >= 3.6).length;
            const n3 = db.filter(a => (Number(a.nota_final) || 0) >= 2.6 && (Number(a.nota_final) || 0) < 3.6).length;

            return {
                avaliacoes: db,
                estatisticas: {
                    total_alunos: total,
                    media_geral: media,
                    distribuicao: { nivel_4: n4, nivel_3: n3 }
                }
            };
        },

        async excluirAvaliacao(token, id) {
            if (!this.isStaticHosting) {
                try {
                    const resp = await fetch(`/api/professor/avaliacao/${id}`, {
                        method: 'DELETE',
                        headers: { 'X-Teacher-Token': token }
                    });
                    if (resp.ok) return await resp.json();
                } catch(e) {}
            }

            let db = this.getLocalDB();
            db = db.filter(a => String(a.id) !== String(id) && String(a.avaliacao_id) !== String(id));
            this.saveLocalDB(db);
            return { sucesso: true };
        },

        exportarCsv(token, turma) {
            if (!this.isStaticHosting) {
                window.open(`/api/professor/exportar-csv?token=${token}&turma=${encodeURIComponent(turma || '')}`, '_blank');
                return;
            }

            let db = this.getLocalDB();
            if (turma) {
                db = db.filter(a => a.turma.toLowerCase() === turma.toLowerCase());
            }

            let csv = '\uFEFFNome,Turma,Status,Fase Atual,Nota Final,Nivel,Instrucoes,Algoritmo,Decomposicao,Padroes,Abstracao,Data\n';
            db.forEach(a => {
                csv += `"${a.nome}","${a.turma}","${a.status || 'Em Andamento'}","Fase ${a.fase_atual || 1}",${Number(a.nota_final || 0).toFixed(2)},"${a.nivel_conceitual || '-'}","${Number(a.nota_instrucoes || 0).toFixed(1)}","${Number(a.nota_algoritmo || 0).toFixed(1)}","${Number(a.nota_decomposicao || 0).toFixed(1)}","${Number(a.nota_padroes || 0).toFixed(1)}","${Number(a.nota_abstracao || 0).toFixed(1)}","${a.data_fmt || '-'}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `avaliacoes_computacao_${turma || 'geral'}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // 1. Verificação de Aluno Logado
    const savedStudent = sessionStorage.getItem('aluno_sessao');
    if (savedStudent) {
        try {
            currentStudent = JSON.parse(savedStudent);
            atualizarInfoAluno();
        } catch(e) {
            abrirLoginAluno();
        }
    } else {
        abrirLoginAluno();
    }

    function abrirLoginAluno() {
        studentModal.classList.add('active');
    }

    studentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();
        const turma = inputTurma.value.trim();

        if (!nome || !turma) return;

        try {
            const data = await EduBackend.entrarAluno(nome, turma);

            if (data.sucesso) {
                currentStudent = data.aluno;
                sessionStorage.setItem('aluno_sessao', JSON.stringify(currentStudent));
                studentModal.classList.remove('active');
                atualizarInfoAluno();

                if (currentStudent.ja_concluiu) {
                    alert(`Olá, ${currentStudent.nome}! Você já possui um registro de avaliação com Nota ${Number(currentStudent.nota_atual || currentStudent.nota_final).toFixed(2)}. Se desejar recomeçar do zero, peça para a professora Luana liberar uma nova tentativa no painel docente.`);
                }
            } else {
                alert(data.erro || 'Erro ao realizar login.');
            }
        } catch(err) {
            console.error(err);
            alert('Erro de conexão ao registrar aluno.');
        }
    });

    function atualizarInfoAluno() {
        if (!currentStudent) return;
        studentNameDisplay.textContent = currentStudent.nome;
        studentTurmaDisplay.textContent = currentStudent.turma;
        studentTag.style.display = 'flex';
        atualizarPlacarAoVivo();

        // Se o aluno estava em uma fase específica, retoma nela
        const startPhase = Math.max(0, Math.min(GAME_LEVELS.length - 1, (currentStudent.fase_atual || 1) - 1));
        carregarNivel(startPhase);
    }

    function atualizarPlacarAoVivo() {
        const score = evaluator.getCurrentTotalScore();
        if (scoreDisplayBadge) {
            scoreDisplayBadge.innerHTML = `⭐ Nota: <strong>${score.toFixed(2)}</strong> / 4.0`;
        }
    }

    // Salvar Progresso em Tempo Real a cada conquista
    async function salvarProgressoRealTime() {
        if (!currentStudent || !currentStudent.avaliacao_id) return;
        const totalScore = evaluator.getCurrentTotalScore();
        const evalData = evaluator.computeFinalEvaluation();

        try {
            await EduBackend.salvarProgresso({
                avaliacao_id: currentStudent.avaliacao_id,
                aluno_id: currentStudent.id,
                fase_atual: currentLevelIndex + 1,
                nota_final: totalScore,
                pilares: evalData.pilares,
                tempo_segundos: Math.round((Date.now() - evaluator.startTime) / 1000),
                detalhes: evaluator.levelStats,
                status: 'Em Andamento'
            });
        } catch(e) {
            console.warn('Erro ao sincronizar progresso:', e);
        }
    }

    // 2. Renderização de Níveis e Tracker (20 Fases)
    function renderizarTracker() {
        levelTracker.innerHTML = '';
        GAME_LEVELS.forEach((lvl, idx) => {
            const dot = document.createElement('div');
            dot.className = `level-dot ${idx === currentLevelIndex ? 'active' : ''}`;
            if (evaluator.levelStats[lvl.id] && evaluator.levelStats[lvl.id].completed) {
                dot.classList.add('completed');
                dot.innerHTML = '✓';
            } else {
                dot.textContent = lvl.id;
            }
            dot.title = `${lvl.titulo} (+${lvl.pontosFase.toFixed(2)} pts)`;
            dot.addEventListener('click', () => {
                if (!engine.running) carregarNivel(idx);
            });
            levelTracker.appendChild(dot);
        });
    }

    function carregarNivel(index) {
        currentLevelIndex = index;
        const lvl = GAME_LEVELS[currentLevelIndex];
        engine.loadLevel(lvl);

        // Atualizar Títulos e Badges
        pilarBadge.className = `pilar-badge pilar-${lvl.pilar}`;
        pilarBadge.textContent = lvl.pilarNome;
        questTitle.textContent = lvl.titulo;
        questDesc.textContent = lvl.descricao;
        questHint.textContent = lvl.dica;
        if (phasePtsBadge) {
            phasePtsBadge.textContent = `+${lvl.pontosFase.toFixed(2)} pts`;
        }

        // Atualizar Aba Conceito Teórico
        if (lvl.conceitoDidatico) {
            didacticDefText.textContent = lvl.conceitoDidatico.definicao;
            didacticAnalogyText.textContent = lvl.conceitoDidatico.analogia;
        }

        // Objetivos na barra inferior da arena
        renderizarObjetivos(lvl.objetivos);

        // Comandos Rápidos
        quickCommands.innerHTML = '';
        lvl.comandosDisponiveis.forEach(cmd => {
            const chip = document.createElement('button');
            chip.className = 'cmd-chip';
            chip.innerHTML = `${cmd.icon} ${cmd.label}`;
            chip.addEventListener('click', () => {
                inserirComando(cmd.cmd);
            });
            quickCommands.appendChild(chip);
        });

        // Código Inicial Seguro
        codeEditor.value = lvl.codigoInicial;
        consoleOutput.innerHTML = `> Fase ${lvl.id} de 20 pronta: ${lvl.titulo}<br>> Esta fase vale +${lvl.pontosFase.toFixed(2)} pts. Complete o código e clique em Executar!`;
        arenaMsg.textContent = 'Cavaleiro aguardando comandos.';

        renderizarTracker();
        atualizarPlacarAoVivo();
    }

    function renderizarObjetivos(objetivos) {
        objectivesList.innerHTML = '';
        objetivos.forEach(obj => {
            const item = document.createElement('div');
            item.className = `objective-item ${obj.atingido ? 'done' : ''}`;
            item.innerHTML = `
                <div class="objective-check">${obj.atingido ? '✓' : ''}</div>
                <span>${obj.texto}</span>
            `;
            objectivesList.appendChild(item);
        });
    }

    function inserirComando(textoComando) {
        const start = codeEditor.selectionStart;
        const end = codeEditor.selectionEnd;
        const text = codeEditor.value;
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);

        codeEditor.value = before + (before.endsWith('\n') || before === '' ? '' : '\n') + textoComando + '\n' + after;
        codeEditor.focus();
    }

    // 3. Execução do Código
    btnRun.addEventListener('click', () => {
        if (engine.running) return;

        const code = codeEditor.value;
        btnRun.disabled = true;
        btnRun.textContent = 'Executando...';
        consoleOutput.innerHTML = '> Executando passos do cavaleiro...';
        arenaMsg.textContent = 'Cavaleiro em marcha!';

        engine.runCode(code, 
            (line, raw) => {
                consoleOutput.innerHTML += `<br>> Linha ${line}: ${raw}`;
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            },
            async (result) => {
                btnRun.disabled = false;
                btnRun.innerHTML = '<span>Executar Código</span> ▶';
                
                const lvl = GAME_LEVELS[currentLevelIndex];
                evaluator.recordAttempt(lvl.id, code, result);
                renderizarObjetivos(lvl.objetivos);
                renderizarTracker();
                atualizarPlacarAoVivo();

                if (result.sucesso) {
                    const pontosGanhos = evaluator.levelStats[lvl.id].earnedScore;
                    arenaMsg.textContent = `⭐ Fase ${lvl.id} concluída! (+${pontosGanhos.toFixed(2)} pts)`;
                    consoleOutput.innerHTML += `<br><span style="color:#2ed573;">> ${result.mensagem} Pontos obtidos nesta fase: +${pontosGanhos.toFixed(2)} pts</span>`;

                    // Grava o progresso no banco de dados SQLite imediatamente
                    await salvarProgressoRealTime();

                    if (currentLevelIndex === GAME_LEVELS.length - 1) {
                        setTimeout(() => {
                            finalizarAvaliacaoGeral('conclusao');
                        }, 1200);
                    } else {
                        setTimeout(() => {
                            if (confirm(`Parabéns! Você concluiu a Fase ${lvl.id} de 20!\nPontuação atual: ${evaluator.getCurrentTotalScore().toFixed(2)} / 4.00\n\nDeseja avançar para a Fase ${lvl.id + 1}?`)) {
                                carregarNivel(currentLevelIndex + 1);
                            }
                        }, 500);
                    }
                } else {
                    arenaMsg.textContent = '❌ Desafio incompleto!';
                    consoleOutput.innerHTML += `<br><span style="color:#ff4757;">> Atenção: ${result.mensagem}</span>`;
                }
            }
        );
    });

    btnReset.addEventListener('click', () => {
        if (engine.running) engine.stop();
        carregarNivel(currentLevelIndex);
    });

    // 4. Modal de Desistir / Entregar com Nota Atual
    btnFinishEval.addEventListener('click', () => {
        surrenderPhaseText.textContent = `Fase ${currentLevelIndex + 1} de 20`;
        surrenderScoreText.textContent = `${evaluator.getCurrentTotalScore().toFixed(2)} / 4.00`;
        confirmSurrenderModal.classList.add('active');
    });

    closeSurrenderBtn.addEventListener('click', () => {
        confirmSurrenderModal.classList.remove('active');
    });

    btnCancelSurrender.addEventListener('click', () => {
        confirmSurrenderModal.classList.remove('active');
    });

    btnConfirmSurrender.addEventListener('click', () => {
        confirmSurrenderModal.classList.remove('active');
        finalizarAvaliacaoGeral('desistencia');
    });

    // 5. Submissão e Finalização da Avaliação (Gera Boletim com Nota 0 a 4)
    async function finalizarAvaliacaoGeral(motivo = 'conclusao') {
        const avaliacao = evaluator.computeFinalEvaluation();

        try {
            const data = await EduBackend.finalizarAvaliacao({
                avaliacao_id: currentStudent ? currentStudent.avaliacao_id : null,
                aluno_id: currentStudent ? currentStudent.id : null,
                fase_atual: currentLevelIndex + 1,
                nota_final: avaliacao.notaFinal,
                pilares: avaliacao.pilares,
                tempo_segundos: avaliacao.tempoSegundos,
                detalhes: avaliacao.detalhesNiveis,
                motivo: motivo
            });

            if (data.sucesso) {
                if (motivo === 'conclusao') {
                    certMainTitle.textContent = '🎉 Avaliação Concluída!';
                } else {
                    certMainTitle.textContent = '📋 Boletim de Desempenho';
                }

                certStudentName.textContent = currentStudent ? currentStudent.nome : 'Aluno';
                certTurma.textContent = currentStudent ? currentStudent.turma : '-';
                certFinalScore.textContent = Number(data.nota_final).toFixed(2);
                certScoreBadge.style.background = avaliacao.badgeColor;
                certConceito.textContent = data.nivel_conceitual;
                certFeedback.textContent = data.feedback;

                certScoreInstrucoes.textContent = Number(data.pilares.instrucoes).toFixed(1);
                certScoreAlgoritmo.textContent = Number(data.pilares.algoritmo).toFixed(1);
                certScoreDecomposicao.textContent = Number(data.pilares.decomposicao).toFixed(1);
                certScorePadroes.textContent = Number(data.pilares.padroes).toFixed(1);
                certScoreAbstracao.textContent = Number(data.pilares.abstracao).toFixed(1);

                certModal.classList.add('active');
            } else {
                alert('Erro ao registrar avaliação final.');
            }
        } catch(e) {
            console.error(e);
            alert('Erro de conexão ao salvar a nota.');
        }
    }

    btnCloseCert.addEventListener('click', () => {
        certModal.classList.remove('active');
    });

    // 6. Acesso do Professor (Senha: Luana@2011)
    btnOpenTeacher.addEventListener('click', () => {
        if (teacherToken) {
            abrirDashboardProfessor();
        } else {
            inputTeacherPass.value = '';
            teacherError.style.display = 'none';
            teacherModal.classList.add('active');
        }
    });

    closeTeacherBtn.addEventListener('click', () => {
        teacherModal.classList.remove('active');
    });

    teacherLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const senha = inputTeacherPass.value.trim();

        try {
            const data = await EduBackend.loginProfessor(senha);

            if (data.sucesso) {
                teacherToken = data.token;
                sessionStorage.setItem('teacher_token', teacherToken);
                teacherModal.classList.remove('active');
                abrirDashboardProfessor();
            } else {
                teacherError.style.display = 'block';
                teacherError.textContent = data.erro || 'Senha incorreta!';
            }
        } catch(err) {
            console.error(err);
            teacherError.style.display = 'block';
            teacherError.textContent = 'Erro ao conectar ao painel.';
        }
    });

    closeDashBtn.addEventListener('click', () => {
        teacherDashModal.classList.remove('active');
    });

    async function abrirDashboardProfessor() {
        teacherDashModal.classList.add('active');
        await carregarFiltroTurmas();
        await carregarRelatorioProfessor();
    }

    async function carregarFiltroTurmas() {
        try {
            const data = await EduBackend.obterTurmas(teacherToken);
            if (data && data.turmas) {
                const currentVal = filterTurma.value;
                filterTurma.innerHTML = '<option value="">Todas as Turmas</option>';
                data.turmas.forEach(t => {
                    const opt = document.createElement('option');
                    opt.value = t;
                    opt.textContent = t;
                    filterTurma.appendChild(opt);
                });
                filterTurma.value = currentVal;
            }
        } catch(e) {}
    }

    filterTurma.addEventListener('change', () => {
        carregarRelatorioProfessor();
    });

    btnExportCsv.addEventListener('click', () => {
        EduBackend.exportarCsv(teacherToken, filterTurma.value);
    });

    async function carregarRelatorioProfessor() {
        try {
            const data = await EduBackend.obterAvaliacoes(teacherToken, filterTurma.value);

            if (data) {
                renderizarTabelaProfessor(data.avaliacoes || []);
                statTotalAlunos.textContent = data.estatisticas.total_alunos;
                statMediaGeral.textContent = data.estatisticas.media_geral.toFixed(2);
                statNivel4.textContent = data.estatisticas.distribuicao.nivel_4;
                statNivel3.textContent = data.estatisticas.distribuicao.nivel_3;
            }
        } catch(e) {
            console.error(e);
        }
    }

    function renderizarTabelaProfessor(avaliacoes) {
        teacherTableBody.innerHTML = '';
        if (avaliacoes.length === 0) {
            teacherTableBody.innerHTML = '<tr><td colspan="12" style="text-align:center; padding: 24px; color: #94a3b8;">Nenhum aluno conectado ou avaliado ainda.</td></tr>';
            return;
        }

        avaliacoes.forEach(r => {
            const tr = document.createElement('tr');
            let gradeClass = 'grade-1';
            if (r.nota_final >= 3.6) gradeClass = 'grade-4';
            else if (r.nota_final >= 2.6) gradeClass = 'grade-3';
            else if (r.nota_final >= 1.6) gradeClass = 'grade-2';

            let statusClass = 'status-andamento';
            let statusText = '⏳ Em Andamento';
            if (r.status === 'Concluído') {
                statusClass = 'status-concluido';
                statusText = '✓ Concluído';
            } else if (r.status === 'Finalizado / Desistiu') {
                statusClass = 'status-desistiu';
                statusText = '⏹️ Entregue';
            }

            tr.innerHTML = `
                <td><strong>${r.nome}</strong></td>
                <td><span class="turma-badge">${r.turma}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>Fase ${r.fase_atual || 1} de 20</td>
                <td><span class="grade-pill ${gradeClass}">Nota ${Number(r.nota_final).toFixed(2)}</span></td>
                <td>${Number(r.nota_instrucoes).toFixed(1)}</td>
                <td>${Number(r.nota_algoritmo).toFixed(1)}</td>
                <td>${Number(r.nota_decomposicao).toFixed(1)}</td>
                <td>${Number(r.nota_padroes).toFixed(1)}</td>
                <td>${Number(r.nota_abstracao).toFixed(1)}</td>
                <td>${r.data_fmt || '-'}</td>
                <td>
                    <button class="btn-icon btn-del" data-id="${r.id}" title="Excluir tentativa (permitir refazer do zero)">🗑️</button>
                </td>
            `;

            tr.querySelector('.btn-del').addEventListener('click', async () => {
                if (confirm(`Deseja apagar o registro de ${r.nome} (${r.turma}) para permitir que o aluno refaça a avaliação do zero?`)) {
                    await EduBackend.excluirAvaliacao(teacherToken, r.id);
                    carregarRelatorioProfessor();
                }
            });

            teacherTableBody.appendChild(tr);
        });
    }

    window.addEventListener('resize', () => {
        engine.resizeCanvas();
    });
});
