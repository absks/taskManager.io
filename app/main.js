const addBtn = document.querySelector("#create-note");
const noteTitle = document.getElementById("noteTitle");
const noteTeaxtArea = document.getElementById("noteTeaxtArea");
const timer = document.getElementById("timer");
const data = JSON.parse(localStorage.getItem("data"));
const remove = document.getElementById("removeNote");
const ids = location.hash.slice(1);
const task = data?.find((x) => x.id==ids);
if (task) {
  // const newTime = new Date(task.date).getMinutes() - new Date().getMinutes();
  noteTitle.value = task.title;
  noteTeaxtArea.value = task.body;
  timer.innerHTML = new Date().getUTCMinutes()+"minutes ago";
  task.current = false;
  localStorage.setItem("data", JSON.stringify(data));
}
let id=Math.random();
document.getElementById("home")?.addEventListener("click", () => {
  const newEntry = {
    id:id,
    title: noteTitle.value,
    body: noteTeaxtArea.value,
    date: new Date().getUTCMinutes()+"minutes ago",
    current: false,
    isEdit: false,
  };
  let data = [];
  data.push(newEntry);
  const isExist = localStorage.getItem("data");
  if (!isExist) {
    localStorage.setItem("data", JSON.stringify(data));
  } else if (isExist.length > 0) {
    const newdata = JSON.parse(localStorage.getItem("data"));
    const isExist = newdata.find((x) => x.id==ids);
    if (isExist) {
      isExist.id=id;
      isExist.title = noteTitle.value;
      isExist.body = noteTeaxtArea.value;
      isExist.date = new Date().getUTCMinutes()+"minutes ago";
      isExist.isEdit = false;

      localStorage.setItem("data", JSON.stringify(newdata));
    } else if (!isExist) {
      newdata.push(newEntry);
      localStorage.setItem("data", JSON.stringify(newdata));
    }
  }
});
const getNotes = () => {
  const notesJSON = localStorage.getItem('data')

  try {
      return notesJSON ? JSON.parse(notesJSON) : []
  } catch (e) {
      return []
  } 
}
document.querySelector("#filter-by")?.addEventListener("change",(e)=>{
      let notes=getNotes()
      if(e.target.value==='alphabetical'){
         notes.sort((a,b)=>{
          if (a['title'].toLowerCase() < b['title'].toLowerCase()) {
                return -1
            } else if (a['title'].toLowerCase() > b['title'].toLowerCase()) {
              
                return 1
            } else {
              
                return 0
            }
        })
        renderNotes(notes);
      }else if (e.target.value==='byNumber') {
        notes.sort((a,b)=>(b['id']-a['id']?1:0))
        renderNotes(notes);
      }else if(e.target.value==='byEdited'){
        notes.sort((a,b)=> {
          if(a['date'] < b['date']){
            return 1
          }
          else if(a['date'] > b['date']){
            return -1
          }else{
            return 0
          }
          })
         renderNotes(notes)
      }
      
    
    })
const search=()=>{
  let searchbox=document.getElementById('search-text').value.toUpperCase();
  let Data=document.getElementById("note");
  
  let getAllData=document.querySelectorAll("#listItem");
  let Title=Data.getElementsByClassName("listItemTitle");
  
  
  let noNote=document.getElementById("noNote");
  let noItem=false;
    for (let i = 0; i < Title.length ; i++) {
      let Access=getAllData[i].getElementsByClassName("listItemTitle")['title'];
      if (Access){
        let textValue=Access.textContent || Access.innerHTML;
        if (textValue.toUpperCase().indexOf(searchbox)>-1) {
          getAllData[i].style.display="block";
          noItem=true
        }
       else{
        getAllData[i].style.display="none";
       
        

        
       }
       
        
      
        
      
      }}  
    if(noItem){
      noNote.innerHTML=""}
    else{
      noNote.innerHTML="No notes to Show"}
    // console.log(noItem,Title.length,'hiiiliii')
};
const renderNotes=(data)=>{
  if(document.querySelector('.listItem')){
        const listItem = document.querySelectorAll('.listItem')
        for (let index = 0; index < listItem.length; index++) {
          const element = listItem[index];
          element.remove()          
        }
  }
  for (let index = 0; index < data?.length; index++) {
    let root = document.getElementById("note");
      const listItem = document.createElement("a");
      listItem.classList.add("listItem");
      listItem.setAttribute("id","listItem");
      const title = document.createElement("p");
      title.classList.add("listItemTitle");
      title.setAttribute("id","title");
      const date = document.createElement("p");
      date.classList.add("listItemDate");
      date.innerHTML = `Last Edited: ${data[index].date}`;
      date.setAttribute("id","date");
      //   title.href="app/note.html"
      title.innerHTML = data[index].title ? data[index].title : "Unnamed note";
      listItem.setAttribute("href", `app/note.html#${data[index].id}`);
      listItem.onclick = () => newfunc(data[index].id);
      root?.append(listItem);
      listItem?.appendChild(title);
      listItem?.appendChild(date); 
  }  
}
renderNotes(data)
function newfunc(id) {
  const data = JSON.parse(localStorage.getItem("data"));
  const task = data?.find((x) => x.id === id);
  task.date = Date.now();
  task.isEdit = true;
  task.current = true;
  localStorage.setItem("data", JSON.stringify(data));
}
function removeData() {
  const ids = location.hash.slice(1);
  const removed = JSON.parse(localStorage.getItem("data"));
  const removedItem = removed.filter((item, index) => {
    return item.id != ids;
  });
  localStorage.setItem("data", JSON.stringify(removedItem));
  location.assign("../index.html");
}
function removeAll(){
  const removing=JSON.parse(localStorage.getItem("data"))
  const removingItem = removing.filter((item, index) => {
    return item.id == id;
  });
  window.location.reload();
  localStorage.setItem("data",JSON.stringify(removingItem))
}
let empty=JSON.parse(localStorage.getItem("data"))
 if(empty.length<=0){
  noNote.innerHTML="No Note to Show"
  localStorage.setItem("data",JSON.stringify(empty))}



  // document.getElementById("anu").addEventListener("mouseover",()=>{
//   const anu=document.getElementById("anu");
//   anu.style.display="none"
// })