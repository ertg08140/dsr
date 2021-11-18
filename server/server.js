require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const alarmRoutes = require('./routes/alarmRoutes');
const userRoutes = require('./routes/userRoutes');
const helpRoutes = require('./routes/helpRoutes');

const app = express();

const TIMEOUT = 40000;
const apiAlaProxy = createProxyMiddleware({
	target: process.env.ALA_SOAM,
	changeOrigin: true,
	secure: false,
	pathRewrite: {
		'^/ala': ''
	},
	headers: {
		Connection: 'keep-alive'
	},
	proxyTimeout: TIMEOUT,
	timeout: TIMEOUT
});

const apiNurProxy = createProxyMiddleware({
	target: process.env.NUR_SOAM,
	changeOrigin: true,
	secure: false,
	pathRewrite: {
		'^/nur': ''
	},
	headers: {
		Connection: 'keep-alive'
	},
	proxyTimeout: TIMEOUT,
	timeout: TIMEOUT
});

const apiNoamProxy = createProxyMiddleware({
	target: process.env.NOAM,
	changeOrigin: true,
	secure: false,
	pathRewrite: {
		'^/noam': ''
	},
	headers: {
		Connection: 'keep-alive'
	},
	proxyTimeout: TIMEOUT,
	timeout: TIMEOUT
});

app.use('/ala', apiAlaProxy);
app.use('/nur', apiNurProxy);
app.use('/noam', apiNoamProxy);

app.use(express.json());

app.use('/api/alarms', alarmRoutes);
app.use('/api/user', userRoutes);
app.use('/api/help', helpRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) =>
	res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
);

const mongoDB = process.env.DB;

const mongo = mongoose
	.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(process.env.PORT, () => {
			console.log(`DB connected at ${result.connection.client.s.url}!`);

			console.log(`Server started at http://localhost:${process.env.PORT}`);
		});
	})
	.catch((err) => console.log(err));
