const fs = require('fs');
const jsonfile = require('jsonfile');

const storagePath = "./storage/userCache/";


const defaultCache = {
	"memberList": [],
	"leaderboard": []
};