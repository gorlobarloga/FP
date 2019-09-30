const exp = require('express');
const PORT = process.env.PORT || 3000;
const app = exp();
const fs = require('fs');
const bp = require('body-parser');
const http = require('http');

app.use(bp.json());
app.use(bp.urlencoded({extend: true}));


try {
    fs.statSync('./tasks.txt');
    }
catch (err) {
  if (err.code === 'ENOENT') {
    fs.writeFile('./tasks.txt', '', unction(err, result) {
        if(err) console.log('error', err);
    } )
  }
}


app.get('/', (req, res)=> {
    res.sendfile('tasks.html');    
})

app.get('/alltasks', (req, res)=> {
        fs.readFile('./tasks.txt', 'utf8', (err, content)=>{
        if (err) {
            console.log("Error reading file:", err)
            return
        }
        tasks = JSON.parse(content); 
        console.log(tasks);
        res.send(tasks);          
    })    
})

app.get('tasks/:id', (req, res)=> {
    fs.readFile('./tasks.txt', 'utf8', (err, content)=>{
        if (err) {
            console.log("Error reading file:", err)
            return
        }
        let tasks = JSON.parse(content);  
        let task = tasks.find(task => task.id === Number(req.params.id));         
    })
    res.send(task);
})

app.post('/tasks', (req, res)=>{

    console.log(req.body);
    let task = req.body;
    fs.readFile('./tasks.txt', 'utf8', (err, content)=>{
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        let tasks = JSON.parse(content);                  
    })
    tasks.push(task);
    fs.writeFile('./tasks.txt', JSON.stringify(tasks), function(err, result) {
        if(err) console.log('error', err);
    });
    res.send(JSON.stringify(tasks));
})


app.put('/:id', (req, res)=> {
    fs.readFile('./tasks.txt', 'utf8', (err, content)=>{
        if (err) {
            console.log("Error reading file:", err)
            return
        }
        let tasks = JSON.parse(content);  
                 
    })

    let index = tasks.find(task => task.id === Number(req.params.id));
    tasks[index] = req.body;
    fs.writeFile('./tasks.txt', JSON.stringify(tasks), unction(err, result) {
        if(err) console.log('error', err);
    });    
})

app.delete('/:id', (req, res)=> {
    fs.readFile('./tasks.txt', 'utf8', (err, content)=>{
        if (err) {
            console.log("Error reading file:", err)
            return
        }
        let tasks = JSON.parse(content);          
    })

    tasks = tasks.filter(task => task.id !== Number(req.params.id));
    fs.writeFile('./tasks.txt', JSON.stringify(tasks))
})


app.listen(3333, () => {
    console.log('API is running')
})


