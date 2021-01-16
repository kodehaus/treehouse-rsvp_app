document.addEventListener('DOMContentLoaded',() => {


    //why not starrt with let in case you need to change it
    const form = document.getElementById('registrar');
    const formInput = document.getElementById('name');
    const invitedList = document.getElementById('invitedList');
    const mainDiv = document.querySelector('.main');
    const confirmedStyleName = 'responded';


    //set up the page prior to interacting with it
    const filterDiv = createFilterCheckBox();
    mainDiv.insertBefore(filterDiv, invitedList);


    function addListItem(parentUl, text){
        let elem = document.createElement('li');
        let span = createHTMLElement('span',text, 'invitee');
        elem.appendChild(span);

        let labelCheckBox = createHTMLElement('label','Confirmed','');
        labelCheckBox.appendChild(createHTMLInput('input', '','checkbox','checkbox'));
        elem.appendChild(labelCheckBox);

        elem.appendChild(createHTMLElement('button','Edit', 'js-edit'))
        elem.appendChild(createHTMLElement('button','Remove','js-remove'));
        parentUl.appendChild(elem);
    }

    function createHTMLElement(elementType, text, className){
        let elem = document.createElement(elementType);
        elem.textContent = text;
        if(className){
            elem.className = className;
        }
        return elem;
    }
    function createHTMLInput (inputType, text, type, className){
        let input = document.createElement(inputType);
        input.type = type;
        if(text){
            input.value = text;
        }
        if(className){
            input.className = className;
        }
        return input;
    }
    
    function createFilterCheckBox(){
        const div = createHTMLElement('div');
        const filterLabel = createHTMLElement('label', "Hide those who haven't responded", '');
        const filterCheckBox = createHTMLInput ('input', '', 'checkbox', '');
 
        div.appendChild(filterLabel);
        div.appendChild(filterCheckBox)
        return div;
    }


    //Event listeners
    //------------------------------------------------------//

    //hide respondents listener
    filterDiv.addEventListener('change', (event) => {
        const tag = event.target;
        const inviteeDivs = invitedList.children;
        
        if(tag.tagName === 'INPUT' && tag.type === 'checkbox'){
            if(tag.checked){
                for(let i = 0; i <inviteeDivs.length ; i++){
                    if(!inviteeDivs[i].className){
                        inviteeDivs[i].style.display = 'none';
                        console.log('className:' + inviteeDivs[i].className + '/' + inviteeDivs[i].innerHTML);
                    }
                }
            } else {
                for(let i = 0; i <inviteeDivs.length ; i++){
                    inviteeDivs[i].style.display = '';
                }
            }
        }
    });

    //Form submission event listener
    form.addEventListener('submit',(e)=> { 
        e.preventDefault();

        if(formInput.value){
            addListItem(invitedList, formInput.value);
            formInput.value = '';
        }

    });

    //Checkbox on change listener
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
        if(!button.textContent){
            return;
        }
        const nameActions ={
            remove: () => {
                    invitedList.removeChild(button.parentNode);
                },
            edit: () => {
                    const span = button.parentNode.firstElementChild;
                    const input = createHTMLInput('input',span.textContent,'text','invitee');
                    span.textContent = '';
                    button.parentNode.insertBefore(input, span);
                    button.parentNode.removeChild(span);
                    button.parentNode.insertBefore(createHTMLElement('button','Save', 'js-save'),
                                            button.parentNode.lastElementChild );
                    button.parentNode.removeChild(button);
                },
            save: () => {
                const textInput = button.parentNode.firstElementChild;
                let span = createHTMLElement('span',textInput.value, 'invitee');
                button.parentNode.insertBefore(span,textInput);
                button.parentNode.removeChild(textInput);
                button.parentNode.insertBefore(createHTMLElement('button','Edit', 'js-edit'),
                                        button.parentNode.lastElementChild );
                button.parentNode.removeChild(button);            
            }
        }

        const action = button.textContent.toLowerCase();
        nameActions[action]();

    });

})