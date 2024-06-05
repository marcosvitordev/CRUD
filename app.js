var form = document.getElementById("meuFormulario"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("nome"),
    age = document.getElementById("idade"),
    city = document.getElementById("cidade"),
    email = document.getElementById("email"),
    phone = document.getElementById("telefone"),
    post = document.getElementById("cargo"),
    sDate = document.getElementById("dataInicio"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("dados"),
    modal = document.getElementById("formularioUsuario"),
    modalTitle = document.querySelector("#formularioUsuario .modal-title"),
    newUserBtn = document.querySelector(".novoUsuario");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;
showInfo();

newUserBtn.addEventListener('click', () => {
    submitBtn.innerText = 'Enviar';
    modalTitle.innerText = "Preencha o Formulário";
    isEdit = false;
    imgInput.src = "./image/Profile Icon.webp";
    form.reset();
});

file.onchange = function() {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        }
        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("Este arquivo é muito grande!");
    }
}

function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeeEmail}</td>
            <td>${element.employeePhone}</td>
            <td>${element.employeePost}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#lerDados"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeeEmail}', '${element.employeePhone}', '${element.employeePost}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#formularioUsuario"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;
        userInfo.innerHTML += createElement;
    });
}

function readInfo(pic, name, age, city, email, phone, post, sDate) {
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showNome').value = name;
    document.querySelector("#showIdade").value = age;
    document.querySelector("#showCidade").value = city;
    document.querySelector("#showEmail").value = email;
    document.querySelector("#showTelefone").value = phone;
    document.querySelector("#showCargo").value = post;
    document.querySelector("#showDataInicio").value = sDate;
}

function editInfo(index, pic, name, Age, City, Email, Phone, Post, Sdate) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    userName.value = name;
    age.value = Age;
    city.value = City;
    email.value = Email;
    phone.value = Phone;
    post.value = Post;
    sDate.value = Sdate;

    submitBtn.innerText = "Atualizar";
    modalTitle.innerText = "Atualize o Formulário";
}

function deleteInfo(index) {
    if (confirm("Tem certeza que deseja excluir?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeeEmail: email.value,
        employeePhone: phone.value,
        employeePost: post.value,
        startDate: sDate.value
    }

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Enviar";
    modalTitle.innerHTML = "Preencha o Formulário";

    showInfo();

    form.reset();
    imgInput.src = "./image/Profile Icon.webp";

    bootstrap.Modal.getInstance(document.getElementById('formularioUsuario')).hide();
});
