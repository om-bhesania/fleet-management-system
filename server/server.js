import dotenv from 'dotenv';
import cluster from "node:cluster";
import os from "node:os";
import app from './app.js';

dotenv.config();

// const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 5000;

// if(cluster.isPrimary){
//     for(let i=0;i<2;i++){
//         cluster.fork();
//     }
//     // cluster.on('exit', (worker, code, signal) => {
//     //     console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
//     //     cluster.fork();
//     // });
// } else {
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT} (Worker ${process.pid})`);
//     }); 
// }

app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        }); 