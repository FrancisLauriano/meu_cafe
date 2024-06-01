# main.py
from flask import Flask, render_template

app = Flask(__name__)

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

@app.route('/meu_cafe/carrinho')
def carrinho():
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


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
