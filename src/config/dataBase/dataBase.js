import { Sequelize } from 'sequelize';
import { envs } from '../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URL, {
    logging: false,
});

export async function auth() {
    try {
        await sequelize.authenticate();
        console.log('conexion exitosa ✅');
    } catch (error) {
        console.error(error);
    }
}

export async function syncUp() {
    try {
        await sequelize.sync();
        console.log('sincronizacion exitosa ✅');
    } catch (error) {
        console.error(error);
    }
}
