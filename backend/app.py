from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #ESTO HABILITA CORS PARA TODAS LAS RUTAS

    # CLASE USUARIO
class Usuario:
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host = host,
            user = user,
            password = password
        )
        self.cursor = self.conn.cursor()
        
        self.cursor.execute(f"USE `{database}`")
        
            
    def agregar_usuario(self, nombre, email, password ):
        sql = "INSERT INTO `db-moma`.`usuario` (`nombre`, `email`, `password`) VALUES (%s, %s, %s);" #  %s ES UNA VARIABLE QUE SE VA A CAMBIAR POR OTRO VALOR EVITA EL SQL INJECTION
        valores = (nombre, email, password)
        
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
            
    def eliminar_usuario(self, codigo):
        sql = (f"DELETE FROM `db-moma`.`usuario` WHERE (`id` = {codigo});") 
        self.cursor.execute(sql)
        self.conn.commit()
        return True
        
    def traer_usuario_por_id(self, codigo):
        
        sql = (f"SELECT * FROM `db-moma`.`usuario` WHERE (`id` = {codigo});")
        self.cursor.execute(sql)
        usuario = self.cursor.fetchone()
        return usuario
        
    def modificar_usuario(self, codigo, nombre, email, password):
       
        sql = "UPDATE `db-moma`.`usuario` SET `nombre` = %s, `email` = %s, `password` = %s WHERE (`id` = %s);"
        valores = (nombre, email, password, codigo)
        
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True
        
    def traer_usuario(self): # ESTO ES UN METODO TIPO GET
        sql = "SELECT * FROM `db-moma`.`usuario`;"
        self.cursor.execute(sql) # ESTO EJECUTA LA CONSULTA
        usuarios = self.cursor.fetchall() # ESTO DEVUELVE UNA LISTA DE TUPLAS
        return usuarios
  
    
# FIN CLASE

####################################################
# PROGRAMA PRINCIPAL

    
    

usuario = Usuario(host='localhost', user='root', password='', database='db-moma')

@app.route("/usuario", methods=["POST"]) #ESTO ES UN DECORADOR
def agregar_producto():
    
    nombre = request.form['nombre']
    email = request.form['email']
    password = request.form['password']
    
    
    
    
    # ESTO ES PARA GUARDAR LA IMAGEN EN UNA CARPETA    
    si_se_agrego = usuario.agregar_usuario(nombre, email, password)
    if si_se_agrego:
        return jsonify({"mensaje": "usuario agregado"}), 200 # ESTO ES UNA RESPUESTA HTTP OK
    else:
       return jsonify({"mensaje": "Error"}), 400 # ESTO ES UNA RESPUESTA HTTP ERROR
    
@app.route("/usuario", methods=["GET"])
def traer_usuario():

    lista_usuarios = usuario.traer_usuario()
    
    usuarios_json = [] # ESTO ES UNA LISTA DE DICCIONARIOS
    
    for usua in lista_usuarios:
        usuario_json = { # ESTO ES UN DICCIONARIO
            "id": usua[0],
            "nombre": usua[1],
            "email": usua[2],
            "password": usua[3],
        }
        usuarios_json.append(usuario_json)
        
    return jsonify(usuarios_json), 200 # ESTO ES UNA RESPUESTA HTTP OK

@app.route("/usuario/<int:codigo>", methods=["DELETE"])
def eliminar_usario(codigo):
    usuario_eliminado = usuario.eliminar_usuario(codigo)
    if usuario_eliminado:
        return jsonify({"mensaje": "Usurio eliminado"}), 200
    else:
        return jsonify({"mensaje": "Error"}), 400

@app.route("/usuario/<int:codigo>", methods=["GET"])
def traer_usuario_por_id(codigo):
    usua = usuario.traer_usuario_por_id(codigo)
    if usua:
        usuarios_json = { # ESTO ES UN DICCIONARIO
            "id": usua[0],
            "nombre": usua[1],
            "email": usua[2],
            "password": usua[3],
            }
        return jsonify(usuarios_json), 200
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 400

@app.route("/usuario/<int:codigo>", methods=["PUT"])
def modificar_usuario(codigo): 
    nombre = request.form['nombre']
    email = request.form['email']
    password = request.form['password']  
    
    si_se_modifico = usuario.modificar_usuario(codigo, nombre, email, password)
    if si_se_modifico:
        return jsonify({"mensaje": "Usuario modificado"}), 200
    else:
        return jsonify({"mensaje": "Error"}), 400

        
if __name__ == '__main__':
    app.run(port=4000, debug=True)