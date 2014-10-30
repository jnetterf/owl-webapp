owl-webapp
==========

owl-webapp is a web client for Owl, a real-time data viewer and server for GetData. It's written in React.

Setup and Usage
---------------

```
npm install
npm run build
python -m SimpleHTTPServer 8000 # Or use your favourite web server.
```

Development
-----------

You can watch changes with:
```
npm run dev-server
python -m SimpleHTTPServer 8000
```

Troubleshooting
---------------
 - Debian/Ubuntu users may need to alias or link `nodejs` to `node`.
 
   ```
   sudo ln -s /usr/bin/nodejs /usr/bin/node
   ```
   
- In the webapp, remember the 'ws://' prefix to connect to Owl
