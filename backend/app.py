from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #ESTO HABILITA CORS PARA TODAS LAS RUTAS
# CLASE PELICULA
class Pelicula:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password
        )
        self.cursor = self.conn.cursor()
        
        self.cursor.execute(f"USE `{database}`")
       
            
    def agregar_pelicula(self, idtmdb, imagen, votos):
        #sql = "INSERT INTO `db-tpf`.`productos` (`nombre`, `precio`, `stock`) VALUES ('" + nombre + "', " + precio + ", " + stock + ");"
        sql = "INSERT INTO `db-moma`.`peliculas` (`idtmdb`, `imagen`,`votos`  ) VALUES (%s, %s, %s);" # ESTO ES UNA CONSULTA PARAMETRIZADA (ES MAS SEGURA) %s ES UNA VARIABLE QUE SE VA A CAMBIAR POR OTRO VALOR EVITA EL SQL INJECTION
        valores = (idtmdb, imagen, votos)
        
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
    

pelicula = Pelicula(host='localhost', user='root', password='', database='db-moma')

@app.route("/peliculas", methods=["POST"]) #ESTO ES UN DECORADOR
def agregar_pelicula():
    
    idtmdb = request.form['idtmdb']
    imagen = request.form['imagen']
    votos = request.form['votos']

    
    # nombre_imagen = secure_filename(imagen.filename) # ESTO ES PARA QUE EL NOMBRE DE LA IMAGEN NO TENGA CARACTERES RAROS
    # nombre_base, extension = os.path.splitext(nombre_imagen) # ESTO SEPARA EL NOMBRE DE LA IMAGEN DE LA EXTENSION
    # imagen_url = f"{nombre_base}{extension}" # ESTO ES PARA QUE EL NOMBRE DE LA IMAGEN SEA UNICO
    
    # # ESTO ES PARA GUARDAR LA IMAGEN EN UNA CARPETA    
    si_se_agrego = pelicula.agregar_pelicula(idtmdb, titulo, imagen, video, genero, votos)
    if si_se_agrego:
    # #   imagen.save(os.path.join(RUTA_DESTINO, imagen_url))
        
        return jsonify({"mensaje": "producto agregado"}), 200 # ESTO ES UNA RESPUESTA HTTP OK
    else:
        return jsonify({"mensaje": "Error"}), 400 # ESTO ES UNA RESPUESTA HTTP ERROR

if __name__ == '__main__':
    app.run(port=4000, debug=True)