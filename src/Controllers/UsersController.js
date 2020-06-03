const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const user = await connection('users').select('*');

        return response.json(user);
    },

    async create(request, response) {
        try {
            const { name, email, user, password, telephone } = request.body;
            const id = crypto.randomBytes(4).toString('HEX');
            const permission = '1';

            await connection('users').insert({
                id, name, email, user, password, telephone, permission
            })

            return response.json({ id });
        } catch (err) {
            return response.status(400).json({ error: 'Error register new user' });
        }
    },

    async delete(request, response){
        const { id } = request.params;

        const users = await connection('users').where('id', id).select('id').first();
        
        if(users.id != id){
            return response.status(401).json({ error: 'Operation not permitted. '});
        }
        await connection('users').where('id', id).delete();

        return response.status(204).send();
    }
};