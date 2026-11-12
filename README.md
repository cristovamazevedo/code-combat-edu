# 🏰 EduDigital — Atividade Avaliativa de Pensamento Computacional

Plataforma educacional gamificada (estilo CodeCombat) para avaliação de **Pensamento Computacional** em sala de aula.

## 🎮 Sobre o Projeto

Os alunos controlam um herói em uma masmorra resolvendo **20 desafios de programação** que ensinam os 5 pilares do Pensamento Computacional:

| Pilar | Fases | Conceito |
|---|---|---|
| 📋 Instruções | 1 – 4 | Sequência de comandos |
| ⚙️ Algoritmo | 5 – 8 | Ordem lógica e causa/efeito |
| 🧩 Decomposição | 9 – 12 | Dividir problemas em partes |
| 🔄 Reconhecimento de Padrões | 13 – 16 | Loops `repetir(N)` |
| 🔮 Abstração | 17 – 20 | Funções reutilizáveis |

## 📊 Sistema de Avaliação

- **Nota:** 0,00 a 4,00 pontos  
- **Cada fase:** +0,20 pontos  
- **20 fases × 0,20 = 4,00 pontos**
- O aluno pode **desistir a qualquer momento** e receber a nota acumulada
- Boletim de desempenho gerado automaticamente

## 👩‍🏫 Painel do Professor

- Login com senha protegida
- Visualização em **tempo real** do progresso de todos os alunos
- Status: ⏳ Em Andamento / ✓ Concluído / ⏹️ Entregue
- Exportação para **CSV/Excel**
- Excluir tentativa para permitir que o aluno refaça

## 🚀 Como Executar Localmente

### Pré-requisitos
- Python 3.10+

### Instalação

```bash
git clone https://github.com/cristovamazevedo/code-combat-edu.git
cd code-combat-edu
pip install flask
python server.py
```

Acesse: **http://127.0.0.1:5000**

### Acesso do Professor
Clique no ícone 👩‍🏫 no canto superior direito e use a senha configurada.

## 🗂️ Estrutura

```
code_combat_edu/
├── server.py              # Backend Flask + API REST + SQLite
├── requirements.txt       # Dependências Python
├── templates/
│   └── index.html         # Interface principal
└── static/
    ├── css/style.css
    └── js/
        ├── app.js         # Controlador principal
        ├── engine.js      # Motor do jogo e interpretador
        ├── levels.js      # 20 fases de desafios
        └── evaluator.js   # Sistema de notas
```

## 🛡️ Tecnologias

**Backend:** Python / Flask / SQLite  
**Frontend:** HTML5 / CSS3 / JavaScript (vanilla) / Canvas API

---

Desenvolvido para uso educacional em sala de aula. 🎓
