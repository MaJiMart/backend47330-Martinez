# Esta es la carpeta donde se subirán los desafíos complementarios del curso.
<p>
A continuación describiré de qué se trata cada desafío a medida que los vaya subiendo 🤓
</p>

_❗Para ver el código de cada desafío revisa la carpeta que tiene el mismo nombre que el título._

## 📌integrativePractice1: "Proyecto ecommerce"

<br>Consigna:</br>
<p>Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:</p>

<p>✔️Agregar el modelo de persistencia de Mongo y mongoose a tu proyecto.</p>

<p>✔️Crear una base de datos llamada “ecommerce” dentro de tu Atlas, crear sus colecciones “carts”, “messages”, “products” y sus respectivos schemas.</p>

<p>✔️Separar los Managers de fileSystem de los managers de MongoDb en una sola carpeta “dao”. Dentro de dao, agregar también una carpeta “models” donde vivirán los esquemas de MongoDB. La estructura deberá ser igual a la vista en esta clase</p>
    
<p>✔️Contener todos los Managers (FileSystem y DB) en una carpeta llamada “Dao”</p>

<p>✔️Reajustar los servicios con el fin de que puedan funcionar con Mongoose en lugar de FileSystem</p>

<p>✔️Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es: {user:correoDelUsuario, message: mensaje del usuario}</p>

<p>✔️Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora.
</p>

<p>⚙️ Dependencias:</p>
    <p>express: "4.18.2"</p>
    <p>express-handlebars: "^7.1.2"</p>
    <p>mongoose: "^7.6.3"</p>
    <p>socket.io: "^4.7.2"

</p>

## 📌integrativePractice2: "Proyecto ecommerce"

<br>Consigna:</br>
<p>Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:</p>

<p>✔️ Crear un modelo User el cual contará con los campos:</p>
    <p>● first_name: String,</p>
    <p>● last_name: String,</p>
    <p>● email: String (único)</p>
    <p>● age: Number,</p>
    <p>● password: String(Hash)</p>
    <p>● cart: Id con referencia a Carts</p>
    <p>● role: String(default:'user')</p>

<p>✔️ Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios</p>
<p>✔️ Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección).</p>
<p>✔️ (Sólo para jwt) desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.</p>
<p>✔️ Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.
</p>

<p>⚙️ Dependencias:</p>
    <p>bcrypt: "^5.1.1",</p>
    <p>connect-mongo: "^5.1.0",</p>
    <p>express: "^4.18.2",</p>
    <p>express-handlebars: "^7.1.2",</p>
    <p>express-session: "^1.17.3",</p>
    <p>mongoose: "^8.0.1",</p>
    <p>mongoose-paginate-v2: "^1.7.4",</p>
    <p>passport: "^0.7.0",</p>
    <p>passport-github2: "^0.1.12",</p>
    <p>passport-local: "^1.0.0"
    
</p>