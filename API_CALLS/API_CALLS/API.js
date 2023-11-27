
class Cliente {
  constructor(dni, nombre, apellido, mail) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.mail = mail;
  }
}
async function obtenerClientes(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }

    const data = await response.json();

    const clientes = data.map(item => new Cliente(item.dni, item.nombre, item.apellido, item.mail));

    return clientes;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
}





async function mostrarClientesEnHTML() {
  const apiUrlGet = 'http://localhost:8080/api/a';
  try {
    const clientes = await obtenerClientes(apiUrlGet);
    const clientesContainer = document.getElementById('clientes-container');

    clientes.forEach(cliente => {
      const cuadroCliente = document.createElement('div');
      cuadroCliente.innerHTML = `<strong>DNI:</strong> ${cliente.dni}, <strong>Nombre:</strong> ${cliente.nombre}, <strong>Apellido:</strong> ${cliente.apellido}, <strong>Mail:</strong> ${cliente.mail}`;
      clientesContainer.appendChild(cuadroCliente);
    });
  } catch (error) {
    console.error('Error al mostrar clientes en HTML:', error);
  }
}
