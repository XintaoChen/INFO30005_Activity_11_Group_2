export default function generateRecordItem() {
  let init = () => {
    let recordItemStructure = document.createElement("div")
    recordItemStructure.classList.add("record-item")
    recordItemStructure.innerHTML = "\
      <div class='item'></div>\
      <div class='value-comment'>\
          <input type='number' placeholder='Enter value' class='value' disabled='true'>\
          <input type='text' placeholder='Enter comment' class='comment pdb-hidden'>\
          <button class='save-btn pdb-hidden'>Save</button>\
      </div>\
    "
    let editBtn = document.createElement("div")
    editBtn.classList.add('edit-save')
    editBtn.innerHTML = "\
      <button class='edit-btn'><i class='icon-edit-patient'></i></button>\
    "
    editBtn.onclick = (e) => {
      let inputs = e.target.parentElement.parentElement.previousElementSibling;
      let valueInput = inputs.children[0];
      if(!valueInput.getAttribute("disabled")){
        valueInput.setAttribute("disabled", "true")
      } else {
        valueInput.removeAttribute("disabled")
      }
      let commentInput = inputs.children[1];
      if(commentInput.classList.contains("pdb-hidden")){
        commentInput.classList.remove("pdb-hidden")
      }else{
        commentInput.classList.add("pdb-hidden")
      }
      let saveBtn = inputs.children[2];
      if(saveBtn.classList.contains("pdb-hidden")){
        saveBtn.classList.remove("pdb-hidden")
      }else{
        saveBtn.classList.add("pdb-hidden")
      }
    }
    recordItemStructure.appendChild(editBtn)
    return recordItemStructure
  }

  let generateInput=(itemName, healthDataId, containerId, request)=>{
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.children[0].innerHTML = itemName;
    recordItemStructure.children[1].children[2].onclick = (e) => {
      let value = e.target.previousElementSibling.previousElementSibling.value;
      let comment = e.target.previousElementSibling.value;
      request(healthDataId, value, comment);
    };
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  let generateDiv = (itemName, value, unit, dateTime, containerId) => {
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.innerHTML = "<div class='item'></div>"
    recordItemStructure.children[0].innerHTML = itemName;
    let recordItemDiv = document.createElement('div'); 
    recordItemDiv.innerHTML = "\
    <div class='record-item'>\
      <div class='value-unit-time'>\
        <span class='record-item-value'>"+value+"</span> / <span class='record-item-unit'>"+unit+"</span><br>\
        <span class='record-time'>"+dateTime+"</span>\
      </div>\
    </div>\
    "
    recordItemStructure.appendChild(recordItemDiv)
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  let generateInvalid = (itemName,containerId) =>{
    let recordItemStructure = init();
    let id = itemName.replace(/[ ]/g, "-");
    recordItemStructure.id=id;
    recordItemStructure.children[0].innerHTML = itemName;
    recordItemStructure.children[0].style.backgroundColor = "red"
    recordItemStructure.children[1].innerHTML = "\
      <input type='number' placeholder='Not in required' class='value' disabled='true'>\
    "
    recordItemStructure.children[2].remove()
    document.getElementById(containerId).appendChild(recordItemStructure);
  }

  return {
    generateInput,
    generateDiv,
    generateInvalid
  }
}

