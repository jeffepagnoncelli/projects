from database import db

class Projeto(db.Model):
    __tablename__ = 'projetos'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)
    link = db.Column(db.String(200), nullable=True)

class Experiencia(db.Model):
    __tablename__ = 'experiencias'
    id = db.Column(db.Integer, primary_key=True)
    cargo = db.Column(db.String(100), nullable=False)
    empresa = db.Column(db.String(100), nullable=False)
    periodo = db.Column(db.String(50), nullable=True)
    descricao = db.Column(db.Text, nullable=True)

class Certificado(db.Model):
    __tablename__ = 'certificados'
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    instituicao = db.Column(db.String(100), nullable=False)
    data = db.Column(db.String(50), nullable=True)
