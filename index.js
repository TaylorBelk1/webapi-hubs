const express = require('express');

const server = express();
const parser = express.json();
const PORT = '3000';

//parses body and adds it to req object
server.use(parser);

server.get('/', (req, res) => {
    res.send('Hello')
});

server.get('/now', (req, res) => {
    const now = new Date().toString();
    res.send(now);
})

server.post('/api/hubs', (req, res) => {
    //get data off req.body
    const newHub = req.body;

    //insert in db
    debug.hubs.add(newHub)
    .then(dbHub => {
        res.status(201).json(dbHub);
    }).catch(({code, message}) => {
        res.status(code).json({err: message})
    });
});

server.delete('/api/hubs/:id', (req, res) => {
    const { id } = req.params;

    db.hubs.remove(id)
        .then(hub => {
            if (hub) {
                res.json(hub);
            } else {
                res.status(400).json({err: 'invalid id'});
        }
        }).catch(({code, message}) => {
            res.status(code).json({err:message});
        })
});

server.get('/api/hubs/:id', (req, res) => {
    //get a specific hub
    const id = req.params.id

    db.hubs.findById(id)
    .then(hub => {
        if(hub) {
            res.json(hub);
        } else {
            res.status(400).json({err: 'invalid id'}
            );
        }
    }).catch(({code, message}) => {
        res.status(code).json({err: message});
    });
    //send an error message if the id is invalid
});

//should be last in the file
server.listen(PORT, () => {
    console.log(`Our server is listening on port ${PORT}`);
});