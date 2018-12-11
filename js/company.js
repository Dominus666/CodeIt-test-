let quantityCompanies = document.getElementById('quantityCompanies');
let ulCompanies = document.getElementById('ulCompanies');
let companyPartners = document.getElementById('companyPartners');
let infoPartners = document.getElementById('infoPartners');
let myLoader = document.getElementsByClassName('loader');

let x = new XMLHttpRequest();
x.open("GET", 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList');
x.onload = function (){

    let arrCompany = JSON.parse(x.response);
    let listCompany = arrCompany.list;

    function getQuantityCompanies(list) {  
        quantityCompanies.innerText = list
    }
    getQuantityCompanies(listCompany.length)

    function getulCompanies(name) {
        let li = document.createElement('li');
        li.innerText = name
        ulCompanies.appendChild(li)
        li.addEventListener('click', getPartners)
    }
        
    for(let i = 0; i < listCompany.length; i++) {
        getulCompanies(listCompany[i].name);
    }

    function getPartners(e) {
        for(let i = 0; i < ulCompanies.children.length; i++) {
            if(ulCompanies.children[i].classList.contains('bkgGrey')) {
                ulCompanies.children[i].classList.remove('bkgGrey')
            }
        }
        let activLi = e.target.classList.add('bkgGrey')
        let partner = {} 
        for(let i = 0; i < listCompany.length; i++) {
            if(e.target.innerHTML == listCompany[i].name){
               partner = listCompany[i]
            }
        }
        showPartner(partner)
        companyPartners.style.display = 'block'    
    }

    function showPartner(partner) {
        infoPartners.innerHTML = ''
        for(let i = 0; i < partner.partners.length; i++) {
            let partnerLi = document.createElement('li');
            let partnerSpan = document.createElement('span')
            partnerLi.innerText = partner.partners[i].name
            partnerSpan.innerText = `${partner.partners[i].value} %`
            infoPartners.appendChild(partnerLi)
            partnerLi.appendChild(partnerSpan)
        }
    }
    
    (function loader() {
        if(x.readyState === 4) {
            for(let i = 0; i < myLoader.length; i++) {
                myLoader[i].style.display = 'none'
            }
            quantityCompanies.style.display = 'flex'
            ulCompanies.style.display = 'block'
        }
    }());
}

x.send(null);
