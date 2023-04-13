import express from "express";
// const path = require('path');

const app = express();


app.use(express.static('/home/jjosephi/projects/recbox/controller_boilerplate'));

// endpoints

app.get('/index.js', (req, res) => {
    const endpointName = req.params.endpointName;
	console.log("Requested index");
    res.sendFile('/home/jjosephi/projects/recbox/controller_boilerplate/compiled/index.js');
});

// app.get('/:endpointName', (req, res) => {
//     const endpointName = req.params.endpointName;
// 	console.log("Requested endpoint", endpointName);
//     res.sendFile('/home/jjosephi/projects/recbox/controller_boilerplate/compiled/controller_lib/' + endpointName + '.js');
// });

app.get('/:endpointName', (req, res) => {
    const endpointName = req.params.endpointName;
	console.log("Requested endpoint", endpointName);
    res.sendFile('/home/jjosephi/projects/recbox/controller_boilerplate/compiled/controller_lib/' + endpointName);
});

app.get('/', (req, res) => {
    const endpointName = req.params.endpointName;
	console.log("Requested endpoint fallback", endpointName);
    res.sendFile('/home/jjosephi/projects/recbox/controller_boilerplate/index.html');
});

// server
app.listen(3000, () => {
    console.log('listening on *:3000');
});
