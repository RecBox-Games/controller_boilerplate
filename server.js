import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();


app.use(express.static('/home/jjosephi/projects/recbox/controller_boilerplate/compiled'));
// endpoints

// app.get('/index.js', (req, res) => {
//     const endpointName = req.params.endpointName;
// 	console.log("Requested index");
//     res.sendFile(__dirname + '/index.js');
// });

// // app.get('/:endpointName', (req, res) => {
// //     const endpointName = req.params.endpointName;
// // 	console.log("Requested endpoint", endpointName);
// //     res.sendFile('/home/jjosephi/projects/recbox/controller_boilerplate/compiled/controller_lib/' + endpointName + '.js');
// // });

// app.get('/:endpointName', (req, res) => {
//     const endpointName = req.params.endpointName;
// 	console.log("Requested endpoint", endpointName);
// 	res.sendFile(__dirname + endpointName);
// });

// app.get('/', (req, res) => {
//     const endpointName = req.params.endpointName;
// 	console.log("Requested endpoint fallback", endpointName);
// 	res.sendFile(__dirname + '/index.html');
// });

// server
app.listen(3000, () => {
    console.log('listening on *:3000');
});
