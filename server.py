import os
import sqlite3
import json
import csv
import io
import secrets
from datetime import datetime
from flask import Flask, render_template, request, jsonify, Response, send_from_directory

app = Flask(__name__, template_folder='templates', static_folder='static')
app.secret_key = secrets.token_hex(32)
app.config['JSON_AS_ASCII'] = False

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'data', 'avaliacao.db')
TEACHER_PASSWORD = "Luana@2011"

# Sessões ativas de professores (tokens em memória)
active_teacher_tokens = set()

def init_db():
    os.makedirs(os.path.join(BASE_DIR, 'data'), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Tabela de alunos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS alunos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            turma TEXT NOT NULL,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(nome, turma)
        )
    ''')
    
    # Tabela de avaliações (acompanhamento contínuo em tempo real)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            aluno_id INTEGER NOT NULL,
            nome TEXT NOT NULL,
            turma TEXT NOT NULL,
            nota_final REAL NOT NULL DEFAULT 0.0,
            fase_atual INTEGER NOT NULL DEFAULT 1,
            status TEXT NOT NULL DEFAULT 'Em Andamento',
            nota_instrucoes REAL NOT NULL DEFAULT 0.0,
            nota_algoritmo REAL NOT NULL DEFAULT 0.0,
            nota_decomposicao REAL NOT NULL DEFAULT 0.0,
            nota_padroes REAL NOT NULL DEFAULT 0.0,
            nota_abstracao REAL NOT NULL DEFAULT 0.0,
            nivel_conceitual TEXT NOT NULL DEFAULT 'Em Andamento',
            feedback TEXT NOT NULL DEFAULT 'Avaliação iniciada',
            detalhes_json TEXT,
            tempo_segundos INTEGER DEFAULT 0,
            data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            data_conclusao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(aluno_id) REFERENCES alunos(id)
        )
    ''')
    
    # Migrações seguras caso colunas novas não existam
    cursor.execute("PRAGMA table_info(avaliacoes)")
    col_names = [row[1] for row in cursor.fetchall()]
    if 'fase_atual' not in col_names:
        cursor.execute("ALTER TABLE avaliacoes ADD COLUMN fase_atual INTEGER NOT NULL DEFAULT 1")
    if 'status' not in col_names:
        cursor.execute("ALTER TABLE avaliacoes ADD COLUMN status TEXT NOT NULL DEFAULT 'Em Andamento'")
    if 'data_inicio' not in col_names:
        cursor.execute("ALTER TABLE avaliacoes ADD COLUMN data_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    if 'data_atualizacao' not in col_names:
        cursor.execute("ALTER TABLE avaliacoes ADD COLUMN data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP")

    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def calcular_conceito_e_feedback(nota_final):
    if nota_final >= 3.6:
        nivel = "Nível 4 - Avançado / Excelente"
        feedback = "Excelente desempenho! Você demonstrou domínio completo dos pilares do Pensamento Computacional: sequenciou comandos com precisão, decompôs problemas complexos, identificou padrões usando laços e aplicou abstração com funções de forma exemplar."
    elif nota_final >= 2.6:
        nivel = "Nível 3 - Proficiente"
        feedback = "Muito bom! Você compreendeu bem a lógica dos algoritmos e a decomposição de problemas. Para alcançar a nota máxima, busque sempre otimizar seus códigos identificando padrões repetitivos com laços e criando funções mais abstratas."
    elif nota_final >= 1.6:
        nivel = "Nível 2 - Básico"
        feedback = "Bom início! Você conseguiu seguir instruções e passos simples, mas encontrou desafios ao planejar etapas mais longas ou identificar repetições. Continue praticando o pensamento algorítmico."
    elif nota_final >= 0.6:
        nivel = "Nível 1 - Em Desenvolvimento Inicial"
        feedback = "Você deu os primeiros passos no Pensamento Computacional. É fundamental treinar mais a ordem sequencial dos comandos e a divisão de problemas em partes menores."
    else:
        nivel = "Nível 0 - Em Andamento / Não Concluído"
        feedback = "A atividade está em andamento ou o aluno parou nas fases iniciais. Revise os conceitos com o professor e continue praticando."
    return nivel, feedback

# Rota principal
@app.route('/')
def index():
    return render_template('index.html')

# API: Login / Registro do Aluno (Inicia acompanhamento imediato no BD)
@app.route('/api/aluno/entrar', methods=['POST'])
def aluno_entrar():
    data = request.get_json() or {}
    nome = (data.get('nome') or '').strip()
    turma = (data.get('turma') or '').strip()
    
    if not nome or not turma:
        return jsonify({'erro': 'Nome completo e turma são obrigatórios!'}), 400
    
    if len(nome) < 3:
        return jsonify({'erro': 'Por favor, digite seu nome completo.'}), 400
        
    conn = get_db()
    cursor = conn.cursor()
    
    # 1. Busca ou cria o registro do aluno
    cursor.execute('SELECT id, nome, turma FROM alunos WHERE LOWER(nome) = LOWER(?) AND LOWER(turma) = LOWER(?)', (nome, turma))
    aluno = cursor.fetchone()
    
    if not aluno:
        cursor.execute('INSERT INTO alunos (nome, turma) VALUES (?, ?)', (nome, turma))
        conn.commit()
        aluno_id = cursor.lastrowid
    else:
        aluno_id = aluno['id']

    # 2. Busca avaliação mais recente do aluno
    cursor.execute('''
        SELECT id, nota_final, fase_atual, status, nivel_conceitual, tempo_segundos, strftime('%d/%m/%Y %H:%M', data_atualizacao) as data_fmt
        FROM avaliacoes 
        WHERE aluno_id = ? 
        ORDER BY id DESC LIMIT 1
    ''', (aluno_id,))
    avaliacao = cursor.fetchone()

    # Se não existe avaliação (ou foi excluída pelo professor para retoma), cria o registro imediatamente no BD
    if not avaliacao:
        cursor.execute('''
            INSERT INTO avaliacoes (
                aluno_id, nome, turma, nota_final, fase_atual, status,
                nota_instrucoes, nota_algoritmo, nota_decomposicao, nota_padroes, nota_abstracao,
                nivel_conceitual, feedback, tempo_segundos
            ) VALUES (?, ?, ?, 0.0, 1, 'Em Andamento', 0.0, 0.0, 0.0, 0.0, 0.0, 'Iniciando', 'Avaliação iniciada na Fase 1.', 0)
        ''', (aluno_id, nome, turma))
        conn.commit()
        avaliacao_id = cursor.lastrowid
        fase_atual = 1
        nota_atual = 0.0
        status_atual = 'Em Andamento'
        ja_concluiu = False
    else:
        avaliacao_id = avaliacao['id']
        fase_atual = avaliacao['fase_atual'] or 1
        nota_atual = avaliacao['nota_final'] or 0.0
        status_atual = avaliacao['status']
        ja_concluiu = (status_atual in ('Concluído', 'Finalizado / Desistiu'))

    conn.close()
    
    return jsonify({
        'sucesso': True,
        'aluno': {
            'id': aluno_id,
            'avaliacao_id': avaliacao_id,
            'nome': nome,
            'turma': turma,
            'fase_atual': fase_atual,
            'nota_atual': nota_atual,
            'status': status_atual,
            'ja_concluiu': ja_concluiu
        }
    })

# API: Atualização em Tempo Real do Progresso a Cada Ponto Conquistado
@app.route('/api/avaliacao/progresso', methods=['POST'])
def atualizar_progresso():
    data = request.get_json() or {}
    avaliacao_id = data.get('avaliacao_id')
    aluno_id = data.get('aluno_id')
    fase_atual = int(data.get('fase_atual') or 1)
    nota_final = max(0.0, min(4.0, round(float(data.get('nota_final') or 0.0), 2)))
    pilares = data.get('pilares') or {}
    tempo_segundos = int(data.get('tempo_segundos') or 0)
    detalhes = data.get('detalhes') or {}
    status = data.get('status', 'Em Andamento')

    if not avaliacao_id:
        return jsonify({'erro': 'ID da avaliação não informado!'}), 400

    clamp = lambda v: max(0.0, min(4.0, round(float(v), 2)))
    n_instrucoes = clamp(pilares.get('instrucoes', 0.0))
    n_algoritmo = clamp(pilares.get('algoritmo', 0.0))
    n_decomposicao = clamp(pilares.get('decomposicao', 0.0))
    n_padroes = clamp(pilares.get('padroes', 0.0))
    n_abstracao = clamp(pilares.get('abstracao', 0.0))

    if 'nota_final' in data and data['nota_final'] is not None and float(data['nota_final']) > 0:
        nota_final = max(0.0, min(4.0, round(float(data['nota_final']), 2)))
    else:
        media_pilares = (n_instrucoes * 0.15 + 
                         n_algoritmo * 0.20 + 
                         n_decomposicao * 0.25 + 
                         n_padroes * 0.20 + 
                         n_abstracao * 0.20)
        nota_final = max(0.0, min(4.0, round(media_pilares, 2)))

    nivel, feedback = calcular_conceito_e_feedback(nota_final)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE avaliacoes SET 
            nota_final = ?, fase_atual = ?, status = ?,
            nota_instrucoes = ?, nota_algoritmo = ?, nota_decomposicao = ?, nota_padroes = ?, nota_abstracao = ?,
            nivel_conceitual = ?, feedback = ?, detalhes_json = ?, tempo_segundos = ?,
            data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (
        nota_final, fase_atual, status,
        n_instrucoes, n_algoritmo, n_decomposicao, n_padroes, n_abstracao,
        nivel, feedback, json.dumps(detalhes, ensure_ascii=False), tempo_segundos,
        avaliacao_id
    ))
    conn.commit()
    conn.close()

    return jsonify({
        'sucesso': True,
        'nota_final': nota_final,
        'fase_atual': fase_atual,
        'status': status,
        'nivel_conceitual': nivel
    })

# API: Finalização da Avaliação (Por Conclusão Total OU Desistência com Nota Atual)
@app.route('/api/avaliacao/finalizar', methods=['POST'])
def finalizar_avaliacao():
    data = request.get_json() or {}
    avaliacao_id = data.get('avaliacao_id')
    aluno_id = data.get('aluno_id')
    fase_atual = int(data.get('fase_atual') or 1)
    nota_final = max(0.0, min(4.0, round(float(data.get('nota_final') or 0.0), 2)))
    pilares = data.get('pilares') or {}
    tempo_segundos = int(data.get('tempo_segundos') or 0)
    detalhes = data.get('detalhes') or {}
    motivo = data.get('motivo', 'conclusao') # 'conclusao' ou 'desistencia'
    clamp = lambda v: max(0.0, min(4.0, round(float(v), 2)))
    n_instrucoes = clamp(pilares.get('instrucoes', 0.0))
    n_algoritmo = clamp(pilares.get('algoritmo', 0.0))
    n_decomposicao = clamp(pilares.get('decomposicao', 0.0))
    n_padroes = clamp(pilares.get('padroes', 0.0))
    n_abstracao = clamp(pilares.get('abstracao', 0.0))

    if 'nota_final' in data and data['nota_final'] is not None and float(data['nota_final']) > 0:
        nota_final = max(0.0, min(4.0, round(float(data['nota_final']), 2)))
    else:
        media_pilares = (n_instrucoes * 0.15 + 
                         n_algoritmo * 0.20 + 
                         n_decomposicao * 0.25 + 
                         n_padroes * 0.20 + 
                         n_abstracao * 0.20)
        nota_final = max(0.0, min(4.0, round(media_pilares, 2)))

    status = 'Concluído' if motivo == 'conclusao' else 'Finalizado / Desistiu'
    nivel, feedback = calcular_conceito_e_feedback(nota_final)

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE avaliacoes SET 
            nota_final = ?, fase_atual = ?, status = ?,
            nota_instrucoes = ?, nota_algoritmo = ?, nota_decomposicao = ?, nota_padroes = ?, nota_abstracao = ?,
            nivel_conceitual = ?, feedback = ?, detalhes_json = ?, tempo_segundos = ?,
            data_conclusao = CURRENT_TIMESTAMP, data_atualizacao = CURRENT_TIMESTAMP
        WHERE id = ?
    ''', (
        nota_final, fase_atual, status,
        n_instrucoes, n_algoritmo, n_decomposicao, n_padroes, n_abstracao,
        nivel, feedback, json.dumps(detalhes, ensure_ascii=False), tempo_segundos,
        avaliacao_id
    ))
    conn.commit()
    conn.close()

    return jsonify({
        'sucesso': True,
        'nota_final': nota_final,
        'fase_atual': fase_atual,
        'status': status,
        'nivel_conceitual': nivel,
        'feedback': feedback,
        'pilares': {
            'instrucoes': n_instrucoes,
            'algoritmo': n_algoritmo,
            'decomposicao': n_decomposicao,
            'padroes': n_padroes,
            'abstracao': n_abstracao
        }
    })

# API: Submissão Legada (Compatibilidade)
@app.route('/api/avaliacao/submeter', methods=['POST'])
def submeter_avaliacao():
    data = request.get_json() or {}
    if not data.get('avaliacao_id'):
        aluno_id = data.get('aluno_id')
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM avaliacoes WHERE aluno_id = ? ORDER BY id DESC LIMIT 1', (aluno_id,))
        row = cursor.fetchone()
        conn.close()
        if row:
            data['avaliacao_id'] = row['id']
        else:
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute('INSERT INTO avaliacoes (aluno_id, nome, turma, nota_final) VALUES (?, ?, ?, 0.0)', 
                           (aluno_id, data.get('nome', ''), data.get('turma', '')))
            conn.commit()
            data['avaliacao_id'] = cursor.lastrowid
            conn.close()

    return finalizar_avaliacao()

# API: Login do Professor
@app.route('/api/professor/login', methods=['POST'])
def professor_login():
    data = request.get_json() or {}
    senha = data.get('senha', '')
    
    # Verificação estrita da senha exigida pelo professor
    if senha in (TEACHER_PASSWORD, "Luana@ 2011"):
        token = secrets.token_hex(24)
        active_teacher_tokens.add(token)
        return jsonify({
            'sucesso': True,
            'token': token,
            'mensagem': 'Acesso de professor concedido!'
        })
    else:
        return jsonify({'erro': 'Senha incorreta!'}), 401

def verificar_token_professor():
    token = request.headers.get('X-Teacher-Token') or request.args.get('token')
    return token and token in active_teacher_tokens

# API: Lista de Turmas
@app.route('/api/professor/turmas', methods=['GET'])
def professor_turmas():
    if not verificar_token_professor():
        return jsonify({'erro': 'Não autorizado'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT DISTINCT turma FROM avaliacoes ORDER BY turma ASC')
    turmas = [row['turma'] for row in cursor.fetchall()]
    conn.close()
    return jsonify({'turmas': turmas})

# API: Relatório de Avaliações (Em Tempo Real)
@app.route('/api/professor/avaliacoes', methods=['GET'])
def professor_avaliacoes():
    if not verificar_token_professor():
        return jsonify({'erro': 'Não autorizado'}), 401
        
    turma_filtro = request.args.get('turma', '').strip()
    conn = get_db()
    cursor = conn.cursor()
    
    query = '''
        SELECT 
            id, aluno_id, nome, turma, nota_final, fase_atual, status,
            nota_instrucoes, nota_algoritmo, nota_decomposicao, nota_padroes, nota_abstracao,
            nivel_conceitual, feedback, tempo_segundos, strftime('%d/%m/%Y %H:%M', data_atualizacao) as data_fmt
        FROM avaliacoes
    '''
    params = []
    if turma_filtro:
        query += ' WHERE turma = ?'
        params.append(turma_filtro)
        
    query += ' ORDER BY id DESC'
    cursor.execute(query, params)
    rows = [dict(row) for row in cursor.fetchall()]
    
    # Estatísticas rápidas
    total = len(rows)
    concluidos = sum(1 for r in rows if r.get('status') == 'Concluído')
    media = round(sum(r['nota_final'] for r in rows) / total, 2) if total > 0 else 0
    distribuicao = {
        'nivel_1': sum(1 for r in rows if r['nota_final'] < 1.8),
        'nivel_2': sum(1 for r in rows if 1.8 <= r['nota_final'] < 2.6),
        'nivel_3': sum(1 for r in rows if 2.6 <= r['nota_final'] < 3.6),
        'nivel_4': sum(1 for r in rows if r['nota_final'] >= 3.6),
    }
    
    conn.close()
    return jsonify({
        'avaliacoes': rows,
        'estatisticas': {
            'total_alunos': total,
            'concluidos': concluidos,
            'media_geral': media,
            'distribuicao': distribuicao
        }
    })

# API: Excluir avaliação (para permitir que o aluno refaça o teste)
@app.route('/api/professor/avaliacao/<int:avaliacao_id>', methods=['DELETE'])
def professor_excluir_avaliacao(avaliacao_id):
    if not verificar_token_professor():
        return jsonify({'erro': 'Não autorizado'}), 401
        
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM avaliacoes WHERE id = ?', (avaliacao_id,))
    conn.commit()
    conn.close()
    return jsonify({'sucesso': True, 'mensagem': 'Avaliação excluída com sucesso. O aluno poderá reiniciar o teste do zero.'})

# API: Exportar CSV para Excel
@app.route('/api/professor/exportar-csv', methods=['GET'])
def professor_exportar_csv():
    if not verificar_token_professor():
        return "Não autorizado", 401
        
    turma_filtro = request.args.get('turma', '').strip()
    conn = get_db()
    cursor = conn.cursor()
    
    query = '''
        SELECT 
            nome, turma, status, fase_atual, nota_final, nivel_conceitual,
            nota_instrucoes, nota_algoritmo, nota_decomposicao, nota_padroes, nota_abstracao,
            tempo_segundos, strftime('%d/%m/%Y %H:%M', data_atualizacao) as data_fmt
        FROM avaliacoes
    '''
    params = []
    if turma_filtro:
        query += ' WHERE turma = ?'
        params.append(turma_filtro)
    query += ' ORDER BY turma ASC, nome ASC'
    
    cursor.execute(query, params)
    rows = cursor.fetchall()
    conn.close()
    
    output = io.StringIO()
    writer = csv.writer(output, delimiter=';')
    writer.writerow([
        'Nome do Aluno', 'Turma', 'Status', 'Fase Atual (de 20)', 'Nota Final (0 a 4)', 'Conceito',
        'Nota Instruções', 'Nota Algoritmo', 'Nota Decomposição', 'Nota Padrões', 'Nota Abstração',
        'Tempo (segundos)', 'Última Atualização'
    ])
    
    for r in rows:
        writer.writerow([
            r['nome'], 
            r['turma'], 
            r['status'],
            f"Fase {r['fase_atual']} de 20",
            str(round(r['nota_final'], 2)).replace('.', ','), 
            r['nivel_conceitual'],
            str(round(r['nota_instrucoes'], 2)).replace('.', ','), 
            str(round(r['nota_algoritmo'], 2)).replace('.', ','),
            str(round(r['nota_decomposicao'], 2)).replace('.', ','), 
            str(round(r['nota_padroes'], 2)).replace('.', ','),
            str(round(r['nota_abstracao'], 2)).replace('.', ','), 
            r['tempo_segundos'], 
            r['data_fmt']
        ])
        
    csv_data = output.getvalue()
    # Adiciona BOM para UTF-8 compatível direto com o Microsoft Excel
    csv_bytes = ('\ufeff' + csv_data).encode('utf-8')
    filename = f"Relatorio_Avaliacao_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
    
    return Response(
        csv_bytes,
        mimetype="text/csv; charset=utf-8",
        headers={"Content-disposition": f"attachment; filename={filename}"}
    )
    
    filename = f"Relatorio_Notas_Computacao_{datetime.now().strftime('%Y%m%d_%H%M')}.csv"
    return Response(
        csv_bytes,
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

if __name__ == '__main__':
    import sys
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    init_db()
    print("=" * 60)
    print(" [OK] CODE COMBAT EDU - ATIVIDADE AVALIATIVA DE COMPUTACAO")
    print(" Banco de Dados: SQLite ativado em data/avaliacao.db")
    print(" Servidor rodando em: http://127.0.0.1:5000")
    print(" Acesso do Professor: protegido por senha")
    print("=" * 60)
    app.run(host='0.0.0.0', port=5000, debug=False)
