#!/usr/local/bin/node

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0' // Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

var http = require('http');
var https = require('https');
console.log('Listening on localhost:8080');
http.createServer((request, finalResponse) => {
    var requestBody = [];

    if (request.method === 'OPTIONS') {
        finalResponse.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, HEAD, PATCH, PUT'
        });
        return finalResponse.end();
    }

    delete request.headers.host; // for true CORS "host" header should be removed
    delete request.headers.referer; // better to not reveal true identity

    request.on('error', error => {
        console.error(error);
    }).on('data', chunk => {
        requestBody.push(chunk);
    }).on('end', _ => {
        requestBody = Buffer.concat(requestBody); // concat the request body


        forwardRequest(request, requestBody).then(response => {
            response.on('error', error => {
                console.error(error);
            });
            response.headers['Access-Control-Allow-Origin'] = '*'; // allow all of the hosts
            response.headers['Access-Control-Allow-Headers'] = '*'; // allow all of the headers
            finalResponse.writeHead(response.statusCode, response.headers);
            finalResponse.end(response.body.toString());
        }).catch(error => {
            console.error(error);
        });

    });
}).listen(8080);

function forwardRequest(request, requestBody) {
    var responseBody = [];
    var totalLength = 0;
    return new Promise(resolve => {
        var forwardedRequest = https.request({
            hostname: 'api.tronalddump.io',
            port: 443,
            path: request.url,
            method: request.method,
            headers: request.headers
        }, response => {
            response.on('data', chunk => {
                responseBody.push(chunk);
            }).on('end', _ => {
                response.body = Buffer.concat(responseBody);
                resolve(response);
            });
        })
        forwardedRequest.write(requestBody.toString());
        forwardedRequest.on('error', error => {
            console.error(error);
        });
        forwardedRequest.end();
    });
}