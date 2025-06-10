import Usuario from '../models/Usuario.js'

class usuarioController {
    async store(req, res) {
        const { nome, email, senha } = req.body
        try {
            const usuario = await Usuario.create({ nome, email, senha })
            return res.status(201).json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar usuário' })
        }
    }

    async index(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar usuários' })
        }
    }

    async show(req, res) {
        const { email } = req.params
        // const email = req.params.email faz a msm coisa so q o de cima coloca sozinho o nome da variavel 
        try {
            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' })
            }
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' })
        }
    }
    async update(req, res) {
        const { email } = req.params
        const { nome, senha } = req.body
        try {
            const usuario = await Usuario.findOne({ where: { email } })
            if (!usuario) {
                return res.status(404).json({ error: 'usuario nao encontrado' })
            }
            usuario.nome = nome || usuario.nome
            usuario.senha = senha || usuario.senha
            await usuario.save()
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(500).json({ error: 'erro ao atualizar o usuario' })
        }
    }
    async delete(req, res) {
        const { id } = req.params
        try {
            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(404).json({ error: 'usuario nao encontrado' })
            }
            await usuario.destroy()
            return res.status(204).send()
        } catch (error) {
            return res.status(500).json({ error: 'erro ao deletar usuario' })
        }
    }
}

export default new usuarioController()
