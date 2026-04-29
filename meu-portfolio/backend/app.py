from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database import db, init_db
from models import Projeto, Experiencia, Certificado
import os

app = Flask(__name__, static_folder='../frontend')
CORS(app) # Permite que o frontend acesse a API mesmo em portas diferentes

# Inicializa banco de dados
init_db(app)

# Cria as tabelas automaticamente
with app.app_context():
    db.create_all()

# --- ROTAS PARA SERVIR ARQUIVOS ESTÁTICOS DO FRONTEND ---
@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# --- ROTAS DA API ---

"""@app.route('/api/sobre', methods=['GET'])
def get_sobre():
    # Isso pode também vir do banco se você quiser estender depois
    return jsonify({
        "nome": "Seu Nome Aqui",
        "resumo": "Desenvolvedor focado na área de TI buscando criar soluções inovadoras."
    })"""

@app.route('/api/projetos', methods=['GET'])
def get_projetos():
    projetos = Projeto.query.all()
    return jsonify([{'id': p.id, 'titulo': p.titulo, 'descricao': p.descricao, 'link': p.link} for p in projetos])

@app.route('/api/carreira', methods=['GET'])
def get_carreira():
    exp = Experiencia.query.all()
    return jsonify([{'cargo': e.cargo, 'empresa': e.empresa, 'periodo': e.periodo, 'descricao': e.descricao} for e in exp])

@app.route('/api/certificados', methods=['GET'])
def get_certificados():
    certs = Certificado.query.all()
    return jsonify([{'nome': c.nome, 'instituicao': c.instituicao, 'data': c.data} for c in certs])

# OPÇÃO EXTRA MENCIONADA POR VOCÊ: adicionar manualmente 
# Esta seria uma rota de exemplo para cadastrar novo projeto via POST, para uso futuro
@app.route('/api/projetos', methods=['POST'])
def add_projeto():
    dados = request.get_json()
    novo_projeto = Projeto(
        titulo=dados.get('titulo'), 
        descricao=dados.get('descricao'), 
        link=dados.get('link')
    )
    db.session.add(novo_projeto)
    db.session.commit()
    return jsonify({'msg': 'Projeto adicionado'}), 201

if __name__ == '__main__':
    print("Servidor backend online! Acesse: http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
