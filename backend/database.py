from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_db(app):
    # URL de acesso ao PostgreSQL.
    # Quando criar o banco manualmente, ajuste esta string:
    # 'postgresql://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>'
    
    postgres_uri = 'postgresql://postgres:postgres@localhost:5432/meu_portfolio'
    sqlite_uri = 'sqlite:///local_db.sqlite'
    
    # ATENÇÃO: Estou usando sqlite provisoriamente para que a aplicação 
    # não quebre de imediato até você criar o banco de dados Postgres no seu PC.
    # Quando o PostgreSQL estiver pronto, troque para: 
    # app.config['SQLALCHEMY_DATABASE_URI'] = postgres_uri
    app.config['SQLALCHEMY_DATABASE_URI'] = sqlite_uri
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
