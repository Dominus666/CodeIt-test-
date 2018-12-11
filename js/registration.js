let form = document.getElementById('formRegistration');
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userSecondName = document.getElementById('userSecondName');
let userGender = document.getElementById('userGender');
let userPassword = document.getElementById('userPassword');
let userCheck = document.getElementById('userCheck');
let sendButton = document.getElementById('sendButton');
let errorRegistration = document.getElementById('error');
let arr = [
    {
        field: userName,
        valid: /^\w{3,60}$/i,
        error: 'Field \'username\' should contain from 3 to 60 letters'
    },
    {
        field: userSecondName,
        valid: /^\w{3,60}$/i,
        error: 'Field \'secondname\' should contain from 3 to 60 letters'
    },
    {
        field: userEmail,
        valid: /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i,
        error: 'Email is not valid'
    },
    {
        field: userGender,
        valid: /male|female/i,
        error: 'Field \'gender\' is required'
    },
    {
        field: userPassword,
        valid: /^.{8,60}$/i,
        error: 'Field \'password\' should contain from 8 to 60 letters'
    },
    {
        field: userCheck,
        error: 'checkbox is required'
    }
];

function checkForm() {

    let success = false;
    errorRegistration.innerHTML = '';
    errorRegistration.style.display = 'none';

    for(let i = 0; i < arr.length-1; i++) {
        if(!arr[i].valid.test(arr[i].field.value)) {
            error(arr[i].error)
            errorRegistration.style.display = 'block'
        }     
    }
    if(arr[arr.length-1].field.checked !== true) {
        error(arr[arr.length-1].error)
        errorRegistration.style.display = 'block'
    }

    success = errorRegistration.children.length === 0

    return success
};

function error(error) {
    let li = document.createElement('li');
    li.innerText = error
    errorRegistration.appendChild(li)
}

function sendForm() {
   
    if(checkForm()) {
        let data = [
            {name: 'name', value: userName.value},
            {name: 'secondname', value: userSecondName.value},
            {name: 'email', value: userEmail.value},
            {name: 'gender', value: userGender.value},
            {name:'pass', value:userPassword.value}
        ];
        let newData = data.map(function(el) {
            return encodeURIComponent(el.name) + '=' + encodeURIComponent(el.value);
        }).join('&'); 
        ajaxPost(newData)
    }  
};

function ajaxPost(data) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            let response 
            response = JSON.parse(this.response)
            if(response.status === 'Error') {
                errorRegistration.innerHTML = '';
                errorRegistration.style.display = 'none';
                error(response.message)
                errorRegistration.style.display = 'block'
            }else if(response.status === 'OK') {
                location.href ='./company.html'
            }
        }
    };
    xhr.open('POST', 'http://codeit.pro/codeitCandidates/serverFrontendTest/user/registration');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);
    
};
sendButton.addEventListener('click', sendForm);