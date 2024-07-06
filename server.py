from flask import Flask, jsonify, render_template

app = Flask(__name__, static_folder='public', static_url_path='')

# Endpoint de exemplo
@app.route('/api/test')
def test():
    return jsonify({'message': 'Servidor Flask está funcionando!'})

# Rota para servir o arquivo HTML principal
@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8100) 