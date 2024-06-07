from flask import Flask, render_template, request, redirect, url_for, jsonify, session


app = Flask(__name__)
app.secret_key = 'supersecretkey'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/meu_cafe')
def home_meu_cafe():
    return render_template('home_meu_cafe.html')

@app.route('/meu_cafe/americano')
def americano():
    return render_template('americano.html')

@app.route('/meu_cafe/avaliacao')
def avaliacao_registro():
    return render_template('avaliacao_registro.html')

@app.route('/meu_cafe/avaliacao_concluida')
def avaliacao_concluida():
    return render_template('avaliacao_concluida.html')

@app.route('/meu_cafe/cappuccino_italiano')
def cappuccino_italiano():
    return render_template('cappuccino_italiano.html')

@app.route('/meu_cafe/carrinho_page')
def carrinho_page():
    return render_template('carrinho.html')

@app.route('/meu_cafe/compra_concluida')
def compra_concluida():
    return render_template('compra_concluida.html')

@app.route('/meu_cafe/espresso')
def espresso():
    return render_template('espresso.html')

@app.route('/meu_cafe/latte')
def latte():
    return render_template('latte.html')

@app.route('/meu_cafe/macchiato')
def macchiato():
    return render_template('macchiato.html')

@app.route('/meu_cafe/moka')
def moka():
    return render_template('moka.html')

# Rotas para manipulação do carrinho
@app.route('/meu_cafe/carrinho', methods=['GET'])
def carrinho():
    carrinho = session.get('carrinho', [])
    return jsonify(carrinho)

@app.route('/adicionar_ao_carrinho', methods=['POST'])
def adicionar_ao_carrinho():
    novo_item = request.json
    nome_produto = novo_item.get('nome')
    carrinho = session.get('carrinho', [])
    
    produto_existente = next((item for item in carrinho if item['nome'] == nome_produto), None)
    
    if produto_existente:
      
        produto_existente.update(novo_item)
    else:
      
        carrinho.append(novo_item)
    
    session['carrinho'] = carrinho
    return jsonify(success=True)

@app.route('/remover_item', methods=['POST'])
def remover_item():
    index = request.json.get('index')
    carrinho = session.get('carrinho', [])
    if 0 <= index < len(carrinho):
        carrinho.pop(index)
        session['carrinho'] = carrinho
    return jsonify(success=True)

@app.route('/esvaziar_carrinho', methods=['POST'])
def esvaziar_carrinho():
    session.pop('carrinho', None)
    return jsonify(success=True)

@app.route('/meu_cafe/carrinho/editar/<int:index>', methods=['POST'])
def atualizar_item_carrinho(index):
    carrinho = session.get('carrinho', [])
    if 0 <= index < len(carrinho):
        data = request.json
        carrinho[index] = data
        session['carrinho'] = carrinho
        return jsonify(success=True)
    return jsonify(success=False, message="Índice inválido")

@app.route('/concluir_compra', methods=['POST'])
def concluir_compra():
    session.pop('carrinho', None)
    return jsonify(success=True)




