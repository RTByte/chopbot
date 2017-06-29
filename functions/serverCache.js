//TODO: Change serverCache to use JSON provider instead of jsonfile
//TODO: serverCache (Server leaderboard of levels/xp)
const fs = require('fs');
const jsonfile = require('jsonfile');

const storagePath = "./storage/serverCache/";


const defaultCache = {
	"memberList": [],
	"leaderboard": []
};