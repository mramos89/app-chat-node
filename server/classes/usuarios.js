class Usuarios {
    constructor() {
        this.personas = [];
    }

    agregarPersonas(id, nombre, sala) {

        let persona = {
            id,
            nombre,
            sala
        };
        console.log(persona);
        this.personas.push(persona);
        return this.personas;
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => {
            return persona.id === id;
        })[0];
        return persona;

    }


    getPersonas() {
        return this.personas;

    }

    getPersonasPorSala(sala) {
        let personaEnSala = this.personas.filter(persona => {
            return persona.sala = sala;
        });
        return personaEnSala;
    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => {
            return persona.id != id;
        })[0];

        return personaBorrada;
    }
}



module.exports = {
    Usuarios
}