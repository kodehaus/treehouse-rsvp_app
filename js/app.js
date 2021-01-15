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
    let span = createSpan(text, 'invitee');
    elem.appendChild(span);

    let saveButton = createButton('Save', 'js-save');

    let labelCheckBox = createLabel('Confirmed')
    labelCheckBox.appendChild(createCheckBox());
    elem.appendChild(labelCheckBox);

    elem.appendChild(createButton('Edit', 'js-edit'))
    elem.appendChild(createButton('Remove','js-remove'));
    parentUl.appendChild(elem);
};
function createSpan(text, className){
    let span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    return span;
}
function createTextInput(text, type, className){
    let input = document.createElement('input');
    input.type = type;
    input.value = text;
    if(className){
        input.className = className;
    }
    return input;
}
function createButton(text, className){
    let button = document.createElement('button');
    button.textContent = text;
    if(className){
        button.className = className;
    }
    return button;
}
function createCheckBox(){
    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';
    return checkBox;
};

function createLabel(text){
    const label = document.createElement('label');
    label.textContent = text;
    return label;
}


//Event listeners
//------------------------------------------------------//
invitedList.addEventListener('change',(event) => {
    let tag = event.target;
    let checkedStyle = '';
    if(tag.tagName === 'INPUT' && tag.type == 'checkbox'){
        if(tag.checked){
            checkedStyle = 'responded'
        }
        tag.parentNode.parentNode.className = checkedStyle;
    }

});
invitedList.addEventListener('click', (event) => {
    const button = event.target;

    if(button.tagName === 'BUTTON' && button.className == 'js-remove'){
        let listItemToRemove = button.parentNode;
        invitedList.removeChild(listItemToRemove);

    } else if(button.tagName === 'BUTTON' && button.className == 'js-edit'){
        const span = button.parentNode.firstElementChild;
        const input = createTextInput(span.textContent,'text','invitee');
        span.textContent = '';
        button.parentNode.insertBefore(input, span);
        button.parentNode.removeChild(span);
        button.parentNode.insertBefore(createButton('Save', 'js-save'),
                                button.parentNode.lastElementChild );
        button.parentNode.removeChild(button);
    
    } else if(button.tagName === 'BUTTON' && button.className == 'js-save'){
        const textInput = button.parentNode.firstElementChild;
        let span = createSpan(textInput.value, 'invitee');
        button.parentNode.insertBefore(span,textInput);
        button.parentNode.removeChild(textInput);
        button.parentNode.insertBefore(createButton('Edit', 'js-edit'),
                                button.parentNode.lastElementChild );
        button.parentNode.removeChild(button);
    }
});