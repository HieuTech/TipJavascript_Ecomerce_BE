'use strict'

const mongoose = require('mongoose');
const os = require('os')
const process = require('process')
const _SECONDS = 5000
//Kiểm tra số connect
const countConnect = () =>{
    const numConnection = mongoose.connections.length;
    console.log(`Number of connection: ${numConnection}`);

}
//Kiểm tra quá tải
const checkOverload = () =>{
    setInterval(()=>{
         const numConnection = mongoose.connections.length;
        const numCores = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //example maximum of 1 core can load 5 connections
    
        const maxConnection = numCores * 5;
        console.log(`Active Connection: ${numConnection}`);
        console.log(`Memory Usage: ${memoryUsage / 1024 / 1024} MB`);

        if(numConnection > maxConnection){
            console.log(`Connection overload detech`);
            

        }
        
    }, _SECONDS)//monitor every 5 seconds
}

module.exports = {
    countConnect, checkOverload
}