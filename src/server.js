import app from './app.js';
import { auth, syncUp } from './config/dataBase/dataBase.js';
import { envs } from './config/enviroments/enviroments.js';

async function main() {
    try {
        await auth();
        await syncUp();
    } catch (error) {
        console.error(error);
    }
}

main();

app.listen(envs.PORT, () => {
    console.log(`server running on port ${envs.PORT} ✅`);
});
