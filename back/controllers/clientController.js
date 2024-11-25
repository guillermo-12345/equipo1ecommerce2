const Client = require('../models/Client');

// Obtener todos los clientes
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(client);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ message: 'Error al obtener cliente' });
  }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  try {
    const { name, cuit, email } = req.body;
    const newClient = await Client.create({ name, cuit, email });
    res.status(201).json(newClient);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

// Actualizar un cliente existente
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cuit, email } = req.body;
    const client = await Client.findByPk(id);

    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await client.update({ name, cuit, email });
    res.status(200).json(client);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await client.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};