const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utlidades/utilidades');
const usuarios = new Usuarios();

io.on('connection', (client) => {
    client.on('entrarAlChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'nombre y sala son necesario '
            })
        }

        client.join(data.sala);
        usuarios.agregarPersonas(client.id, data.nombre, data.sala)
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala))
        callback(usuarios.getPersonasPorSala(data.sala));
    });


    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id)
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Admin', `${personaBorrada.nombre} , abandono el chat`))
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala))
    });

    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje)
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

    });

    //Mensaje privado
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });
});