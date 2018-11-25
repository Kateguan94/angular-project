# How to run it?

 - Navigate to project directory:

```bash
cd angular-project
```

- Run the proxy, the script is designed to rewrite request and response headers to satisfy CORS.

```bash
node proxy.js
```

The server will listen on :8080, if your port is busy, edit the `proxy.js` file to a port that is free on your machine.

- Fire up a server of your choice hosting this directory such as:

```bash
live-server
```
Make sure that if you change the port, the `services.js` file need to be updated accordingly to ensure the traffic being sent to correct port.
