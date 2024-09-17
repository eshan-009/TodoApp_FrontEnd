const registerButton = document.querySelector(".registerButton")
const loginButton = document.querySelector(".loginButton")
const firstname = document.getElementById("firstname")
const lastname = document.getElementById("lastname")
const email = document.getElementById("email")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const baseUrl = `https://todoapp-backend-wmsr.onrender.com`
const registrationForm = document.querySelector(".registrationForm")
const loginForm = document.querySelector(".loginForm")
const createAccount = document.querySelector("[createAccount]");
const homescreen = document.querySelector(".homescreen");
const authPage = document.querySelector(".authPage")
const addTodoButton = document.querySelector(".addTodoButton");
const addTodoPage = document.querySelector(".addTodoPage")
const jwtoken = localStorage.getItem("token")
const logOutButton = document.querySelector(".logOutButton");
const empty = document.querySelector(".empty")

createAccount.addEventListener("click",(e)=>{
    e.preventDefault();
    loginForm.classList.remove("active");
    registrationForm.classList.add("active")
})

const token = jwtoken

if(!token)
{

    authPage.classList.add("active")
    loginForm.classList.add("active")
}
else 
{
   
     authenticate();
}
async function authenticate(){
    const URL = `${baseUrl}/api/auth/authh`
    const response = await fetch(URL,{
        method :"GET",
        headers: {
           "Content-type": "application/json; charset=UTF-8 ",
           "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
           "Access-Control-Allow-Credentials" : true,
          'Authorization': `Bearer ${jwtoken}`, 
        },
        credentials: 'include' 
      })
      const responseData = await response.json();
      if(responseData.success)
      {
        authPage.classList.remove("active");
        homescreen.classList.add("active");
        logOutButton.classList.add("active")
      }
   }

registerButton.addEventListener("click",async(e)=>{

    e.preventDefault()
    console.log("Apple",password.value)
    if(password.value !== confirmPassword.value)
    {
        console.log("Apple1")
      return
    }
const URL = `${baseUrl}/api/auth/signup`
console.log("URL",URL)
    const response = await fetch(URL,{
      method :"POST",
      body : JSON.stringify({
          userName : firstname.value + lastname.value,
          email:email.value,
          password:password.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
        "Access-Control-Allow-Credentials" : true,
      }
    })
if(response.status==200)
{
    registrationForm.classList.remove("active")
    loginForm.classList.add("active")
}

firstname.value=''
lastname.value=''
email.value=''
password.value=''
})
loginButton.addEventListener("click",async(e)=>{

    e.preventDefault()
    const email = document.getElementById("loginemail")
const password = document.getElementById("loginpassword")
const URL = `${baseUrl}/api/auth/login`

    const response = await fetch(URL,{
      method :"POST",
      body : JSON.stringify({
          email:email.value,
          password:password.value
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
        "Access-Control-Allow-Credentials" : true,
       
      },
      credentials: 'include' 
    })

if(response.status==200)
{
    loginForm.classList.remove("active")
    authPage.classList.remove("active")
    homescreen.classList.add("active")
    logOutButton.classList.add("active")
}
else{
    alert("Enter Correct credentials")
}
email.value = '';
password.value='';
const data = await response.json();
if(response.status==200)
{
    localStorage.setItem("token",JSON.stringify(data.token));
}

})

addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    addTodoPage.classList.add("active");
    homescreen.classList.remove("active")
    createTodoButton.addEventListener("click",async(e)=>{
        e.preventDefault();
    
        const URL = `${baseUrl}/api/todo/addTodo`
      
        const response = await fetch(URL,{
          method :"POST",
          body : JSON.stringify({
              title:todoTask.value,
              description:todoDescription.value,
              dueDate:dueDate.value
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8 ",
          "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
          "Access-Control-Allow-Credentials" : true,
            'Authorization': `Bearer ${jwtoken}`, 
          },
          credentials: 'include' 
         
        })
        console.log("Here",token,await response.json())
    })
})

const todoTask = document.querySelector("#todoTaskName");
const todoDescription = document.querySelector("#tododescription");
const dueDate = document.querySelector("#dueDate");
const createTodoButton = document.querySelector(".createButton")



const nameColumn = document.querySelector(".nameColumn");
const descriptionColumn = document.querySelector(".descriptionColumn");
const dueDateColumn = document.querySelector(".dueDateColumn");
const todoList = document.querySelector(".todoList")
async function getTodos() {
    todoList.innerHTML = ''
    const data = await fetch(`${baseUrl}/api/todo/getTodo`);
    const TodoData = await data.json();
   if(TodoData.data.length==0)
   {
    empty.classList.add("active")
   }
let requiredData;

if(currentTab === todayTab)
{
    const todayData = TodoData.data.filter((item)=>new Date(item.dueDate).getDate() === new Date().getDate());
    requiredData = todayData;
}
else if(currentTab === upcomingTab)
{
    const upcomingData = TodoData.data.filter((item) => new Date(item.dueDate) > new Date());
    requiredData = upcomingData
}
else if(currentTab === completedTab)
    {
        const completedData = TodoData.data.filter((item)=>item.completed===true);
        requiredData = completedData
    }
    else if(currentTab === pendingTab)
        {
            const pendingData = TodoData.data.filter((item)=>item.completed===false);
            requiredData = pendingData
        }
        requiredData.map((item)=>{
        const wrapper = document.createElement("div");
        wrapper.classList.add("wrapper")
        const name = document.createElement('li');
        name.innerHTML =  "<b>Title:-</b>"+item?.title.substring(0,15);
        name.classList.add("listitem")
        const description1 = document.createElement('li');
        description1.innerHTML = "<b>Description:-</b>"+item?.description.substring(0,30)
        description1.classList.add("listitem")
        const dueDate1 = document.createElement('li');
        dueDate1.innerHTML = "<b>Due:-</b>"+ item?.dueDate.split("T")[0];
        dueDate1.classList.add("listitem")
        const completed = document.createElement('button');
        completed.innerHTML = item?.completed ? "Completed" : "Pending" ;
        completed.classList.add("completedButton")
        const actionParent = document.createElement("div");
        actionParent.classList.add("actionParent")
        const nameParent = document.createElement("div");
        nameParent.classList.add("nameParent")
        const descriptionParent = document.createElement("div");
        descriptionParent.classList.add("descriptionParent");
        const dateParent = document.createElement("div");
        dateParent.classList.add("dateParent");
        
        const editButton = document.createElement("button");
        editButton.innerHTML = "Edit"
        editButton.classList.add("editButton")
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("deleteButton")
        

        editButton.addEventListener("click",(e)=>{
            e.preventDefault();
            homescreen.classList.remove("active")
            addTodoPage.classList.add("active")

            createTodoButton.innerHTML= "Edit Todo";
            todoTask.value = item?.title;
            todoDescription.value = item?.description;
            dueDate.value = item?.dueDate;

            createTodoButton.addEventListener("click",async(e)=>{
                e.preventDefault();
            
                const URL = `${baseUrl}/api/todo/updateTodo/${item._id}`
              
                const response = await fetch(URL,{
                  method :"PUT",
                  body : JSON.stringify({
                      title:todoTask.value,
                      description:todoDescription.value,
                      dueDate:dueDate.value
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
                    "Access-Control-Allow-Credentials" : true,
                    'Authorization': `Bearer ${jwtoken}`, 
                  },
                  credentials: 'include' 
                 
                })
                console.log("Here",dueDate.value,await response.json())
            })
      
        })

        deleteButton.addEventListener("click",async(e)=>{
            e.preventDefault();

            const URL = `${baseUrl}/api/todo/deleteTodo/${item._id}`
              
                const response = await fetch(URL,{
                  method :"DELETE",
                  
                  headers: {
                 "Content-type": "application/json; charset=UTF-8",
                 "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
                 "Access-Control-Allow-Credentials" : true,
                    'Authorization': `Bearer ${jwtoken}`, 
                  },
                  credentials: 'include' 
                 
                })
                console.log("Here",await response.json())
                getTodos()
               
        })

        completed.addEventListener("click",async(e)=>{
         
            e.preventDefault();

            const URL = `${baseUrl}/api/todo/updateTodoStatus/${item._id}`
              let resspp;
               if(item.completed==false)
               {
                completed.innerHTML="Completed"
                 resspp = await fetch(URL,{
                    method :"PATCH",
                    body : JSON.stringify({
                        completed : true
                    }),
                    headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "https://eshan-009.github.io/",
                    "Access-Control-Allow-Credentials" : true,
                      'Authorization': `Bearer ${jwtoken}`, 
                    },
                    credentials: 'include' 
                   
                  })
              
               }
               
                
                
                console.log("Here",await resspp.json())
                getTodos()
        })



        actionParent.appendChild(editButton);
        actionParent.appendChild(deleteButton);
        actionParent.appendChild(completed)
       
      

        wrapper.appendChild(name)
        wrapper.appendChild(description1)
        wrapper.appendChild(dueDate1)
        wrapper.appendChild(actionParent)

        todoList.appendChild(wrapper);
        todoList.classList.add("todoList")
      
    })
}



const todayTab = document.querySelector("#today")
const upcomingTab = document.getElementById("upcoming")
const completedTab = document.getElementById("completed")
const pendingTab = document.getElementById("pending")
var currentTab=upcomingTab;
currentTab.classList.add("activeTab");
getTodos()
function toggletabs(tab){

    console.log(currentTab,tab)
   if(currentTab!==tab)
   {
    currentTab.classList.remove("activeTab");
    tab.classList.add("activeTab")
    currentTab=tab;
   }

}

  todayTab.addEventListener("click",async (e)=>{
        e.preventDefault();
        toggletabs(todayTab)
        await getTodos()
    })

    upcomingTab.addEventListener("click",async (e)=>{
        e.preventDefault();
        toggletabs(upcomingTab)
        await getTodos()
    })

    completedTab.addEventListener("click",async(e)=>{
        e.preventDefault();
        toggletabs(completedTab)
        await getTodos()
    })

        pendingTab.addEventListener("click",async(e)=>{
        e.preventDefault();
        toggletabs(pendingTab)
        await getTodos()
     
    })
   
function logOut()
{
  
    localStorage.setItem("token",'');
    location.reload()
    logOutButton.classList.remove("active")

}
