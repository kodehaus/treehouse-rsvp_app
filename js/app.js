//why not starrt with let in case you need to change it
const form = document.getElementById('registrar');
const formInput = document.getElementById('name');
const invitedList = document.getElementById('invitedList');

form.addEventListener('submit',(e)=> { 
    e.preventDefault();

    if(formInput.value){
        addListItem(invitedList, formInput.value);
        formInput.value = '';
    }

});

function addListItem(parentUl, text){
    let elem = document.createElement('li');   
    elem.textContent = text;
    let labelCheckBox = createLabel('Confirmed')
    labelCheckBox.appendChild(createCheckBox());
    elem.appendChild(labelCheckBox);
    parentUl.appendChild(elem);
};

function createCheckBox(){
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    return checkBox;
};

function createLabel(text){
    const label = document.createElement('label');
    label.textContent = 'text';
    return label;
}


//Event listeners
invitedList.addEventListener('change',(event) => {
    let tag = event.target;
    let checkedStyle = '';
    if(tag.tagName == 'INPUT' && tag.type == 'checkbox'){
        if(tag.checked){
            checkedStyle = 'responded'
        }
        tag.parentNode.parentNode.className = checkedStyle;
    }

});