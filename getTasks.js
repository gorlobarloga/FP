class View {
    constructor(){

    }

    reflectCreatedTasks(createdTasks){
        
        var createdTasksDivs = new Array;                    
        var createdTasksBlock = document.getElementById('created_tasks');           

        for (i in createdTasks){                       
            createdTasksDivs[i] = document.createElement('div'); 
            let taskDate = parseDate(createdTasks[i].id);  
            createdTasksDivs[i].id=createdTasks[i].id;
            createdTasksDivs[i].className = ('created_task');
            createdTasksBlock.append(createdTasksDivs[i]); 
            
            let dateDiv = document.createElement('div');
            dateDiv.className = ('date');
            dateDiv.innerText = taskDate;
            createdTasksDivs[i].append(dateDiv);

            let descriptionDiv = document.createElement('div');
            descriptionDiv.className = ('description');
            descriptionDiv.innerText = createdTasks[i].description;
            createdTasksDivs[i].append(descriptionDiv);

            let buttonsDiv = document.createElement('div');
            buttonsDiv.className = ('buttons');
            createdTasksDivs[i].append(buttonsDiv);

            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            buttonsDiv.append(deleteButton);
            deleteButton.addEventListener('click', deleteTask, false);

            let editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            buttonsDiv.append(editButton);  
            editButton.addEventListener('click', editTask, false);             
        }
        
    } 

        reflectExistingTaskOptions(taskType, taskLocation, taskSubtype, taskDescription) {     
            showTaskOptions();
            showSubtypes(taskType);

            let types = document.getElementById('type').childNodes;
            for (let i in types){
                if (types[i].innerHTML == taskType){
                    types[i].setAttribute('class', 'selected_type');
                }
            }

            let tasks = document.getElementById('task').childNodes;            
            for (let i in tasks){
                if (tasks[i].innerHTML == taskSubtype){
                    tasks[i].setAttribute('class', 'selected_task');
                }
            }

            document.getElementById('location').value = taskLocation;
            document.getElementById('description').value = taskDescription; 
            setTaskSummary(taskDescription);
        }


    parseDate(dateString){
        let dateAsDate = new Date(Number(dateString));  
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesay', 'Thursday', 'Friday', 'Saturday'];
        let month = months[dateAsDate.getMonth()];
        let day = days[dateAsDate.getDay()];
        let monthDay = dateAsDate.getDate();
        let hours = dateAsDate.getHours() < 10 ? '0' + dateAsDate.getHours() : dateAsDate.getHours();
        let minutes = dateAsDate.getMinutes() < 10 ? '0' + dateAsDate.getMinutes() : dateAsDate.getMinutes();
        let seconds = dateAsDate.getSeconds() < 10 ? '0' + dateAsDate.getSeconds() : dateAsDate.getSeconds();  
        return `${day},${month} ${monthDay}, ${hours}:${minutes}`;
    }

    setTaskSummary(descr){
        if(arguments.length == 0) {
            descr = document.getElementById('description').value;
        }                    
        document.getElementById('summary').value = `I need a ${taskType} to ${taskSubtype}, ${descr}.`;
    }

    //remove evenr listener to controller
    showTaskOptions() {          
        document.getElementById('task_parameters').style.display = 'block';
        let taskOptions = document.getElementById('type');
        var taskTypeDivs = new Array;
        for (let i in taskTypes) {
            taskTypeDivs[i] = document.createElement('div');
            taskTypeDivs[i].innerHTML = taskTypes[i].type;
            taskTypeDivs[i].addEventListener('click', selectType, true);
            taskOptions.append(taskTypeDivs[i]);    
        }                
    }

    showSubtypes(selectedType){
        var subTypesDiv = document.getElementById('task');
        subTypesDiv.innerHTML = '';
        let title = document.createElement('p');
        subTypesDiv.append(title);
        title.innerText = `${taskType.toUpperCase()} TASKS`;
        var selectedSubtypes = taskTypes.find(task => task.type === selectedType);
        var subTypesDivs = new Array;
        
        for (let i in selectedSubtypes.tasks) {
            subTypesDivs[i] = document.createElement('div');
            subTypesDivs[i].innerHTML =  selectedSubtypes.tasks[i];
            subTypesDivs[i].addEventListener('click', selectSubType, true);
            subTypesDiv.append(subTypesDivs[i]); 
        }
    }   

}


class ViewTaskOptions {
    constructor(){

    }

}

class Model {
    constructor(taskTypes){        
        this.taskTypes = [
            {
                type: 'Electrician',
                tasks: ['Fix light', 'Fix something else']
            },
            {
                type: 'Plumber',
                tasks: ['Unlock a toilet', 'Unlock a sink', 'Fix water leak', 'fix pipes']
            },
            {
                type: 'Housekeeper',
                tasks: ['Iron closes', 'Clean bathroom', 'Cook dinner']
            }
        ];
    }

    getTasks() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3333/alltasks', true) ;
        xhr.onload = function(){
            var createdTasks = JSON.parse(this.response);   
            reflectCreatedTasks(createdTasks);                             
        }
        xhr.send();
    }

    newTask (location, type, subType, description) {
        this.id = Date.now().toString();
        this.location = location;
        this.type = type;
        this.subType = subType;
        this.description = description;
     }

//remove some part to controller and  set id as a parameter
   editTask(e){                      
        let element = e.currentTarget;                      
        let id = element.parentNode.parentNode.id;                       
        let xhr = new XMLHttpRequest();        
          xhr.open('GET', `http://localhost:3333/${id}`, true) ;
          xhr.onload = function(){
            var taskToEdit = JSON.parse(this.response);
            editTaskList(taskToEdit) ; 
        }
        xhr.send();               
    }


}

class Controller {
    constructor(){

    }
//name the block somehow
    {
        let newTaskButton =  document.getElementById('new_task'); 
        var reflectNewTask;
        
        function openNewTaskOptions(){
            editTaskList();
        }
        newTaskButton.addEventListener('click', openNewTaskOptions, false);
        
        function deleteTask(e){                      
            let element = e.currentTarget;                    
            let id = element.parentNode.parentNode.id;                     
            let xhr = new XMLHttpRequest();
                xhr.open('DELETE', `http://localhost:3333/${id}`, true) ;
                xhr.onload = function(){
                location.reload(true);                         
            }
            xhr.send();                     
        } 
    }
    
    // end of the block
    
        
        function addTask(e){
            e.preventDefault();
            taskLocation = document.getElementById('location').value; 
            var task = new newTask(taskLocation, taskType, taskSubtype, taskDescription);
            console.log(JSON.stringify(task));

            let xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:3333/tasks', true) ;
            xhr.onload = function(){                    
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(task));  
            location.reload(true);               
        }


        function editTask(e){
            e.preventDefault();
            task.location = document.getElementById('location').value; 
            task.description = taskDescription;
            task.type = taskType;
            task.task = taskSubtype;
            
            console.log(JSON.stringify(task));
            console.log(`http://localhost:3333/${task.id}`);

            let xhr = new XMLHttpRequest();
            xhr.open('PUT', `http://localhost:3333/${task.id}`, true) ;
            xhr.onload = function(){
                //location.reload(true);                     
            }
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(task));  
            
        }


        createTaskButton.addEventListener('click',editTask, false); 


        //check where event listener is placed
        function selectType(e) {
            e.preventDefault();                     
    
            if (taskType !== undefined) {
                let selectedType = document.querySelector('.selected_type');                                 
                selectedType.classList.remove('selected_type');
            }
            taskType = e.currentTarget.innerText;
            e.currentTarget.setAttribute('class','selected_type');
            setTaskSummary();
            showSubtypes(taskType);
        }

        function editTaskList(task) {
            console.log(arguments);
            var taskType;
            var taskSubtype;
            var taskDescription;
            var taskLocation;
            if (arguments.length !== 0) {
                var selecetedTask = arguments[0];
                taskType = task.type;
                taskLocation = task.location;
                taskSubtype = task.subType;            
                taskDescription = task.description;
                reflectExistingTaskOptions(taskType, taskLocation, taskSubtype, taskDescription); 
                setTaskSummary(taskDescription);  
           }  else {
                showTaskOptions();
           }

           function selectSubType(e) {
            e.preventDefault();
            if (taskSubtype !== undefined) {
            let selectedTask = document.querySelector('.selected_task');
            selectedTask.classList.remove('selected_task');
            }
            taskSubtype = e.currentTarget.innerText;                        
            e.currentTarget.setAttribute('class','selected_task'); 
            setTaskSummary();                       
        }  


        //where this should be put
        document.getElementById('description').addEventListener('change', (e) => {
            taskDescription = document.getElementById('description').value;
            setTaskSummary();
        }, false);
    

    var createTaskButton =  document.getElementById('submit');      

    createTaskButton.innerText = 'CREATE TASK';

        

    }



var view = new ViewC();
var model = new Model;
var controller = new Controller(view, model);









   
   

   //let newTaskButton =  document.getElementById('new_task'); 
   //newTaskButton.addEventListener('click', showNewTaskOptions, false);
    



   //??? how this should be done
   

    

     

           
    
        
         
        
        

        
  
        

}
 




getTasks();