const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const singleData = document.querySelector("#singleData")
const editForm = document.querySelector("#editForm")

const heads = ["name", "age", "mobile", "status"]

const readFromStorage = (key = `tasks`) => JSON.parse(localStorage.getItem(key)) || []
const writeToStorage = (data, key = `tasks`) => localStorage.setItem(key, JSON.stringify(data))

const userObjCreator = (myForm) => {
    const user = { id: Date.now() }
    heads.forEach(h => user[h] = myForm.elements[h].value)
    return user
}

const addUser = (user) => {
    const allUsers = readFromStorage("users")
    allUsers.push(user)
    writeToStorage(allUsers, "users")
}

function createMyOwnElement(ele, parent, txt = null, classes = null, id = null) {
    const myElement = document.createElement(ele)
    parent.appendChild(myElement)
    if (txt) myElement.textContent = txt
    if (classes) myElement.classList = classes
    if (id) myElement.setAttribute("id", id)
    return myElement
}

if (myForm) {
    myForm.addEventListener("submit", function (e) {
        e.preventDefault()
        const user = userObjCreator(myForm)
        addUser(user)
        window.location = "index.html"
    })
}
const deleteMyElement = (allUsers, i) => {
    allUsers.splice(i, 1)
    writeToStorage(allUsers, "users")
    drawData()
}
const drawData = () => {
    userWrap.innerHTML = ""
    const allUsers = readFromStorage("users")
    allUsers.forEach((user, i) => {
        const tr = createMyOwnElement("tr", userWrap)
        createMyOwnElement("td", tr, user.id, "id")
        createMyOwnElement("td", tr, user.name, " nam")
        createMyOwnElement("td", tr, user.mobile, "mob")
        createMyOwnElement("td", tr, user.age, "age")
        createMyOwnElement("td", tr, user.status, "stat")
        const td = createMyOwnElement("td", tr)

        const delBtn = createMyOwnElement("button", td, "Delete", "mx-2 btn btn-danger")
        delBtn.addEventListener("click", (e) => deleteMyElement(allUsers, i))
        const showBtn = createMyOwnElement("button", td, "Show", "mx-2 btn btn-primary")
        showBtn.addEventListener("click", () => {
            localStorage.setItem("index", i)
            window.location = "show.html"
        })
        const editBtn = createMyOwnElement("button", td, "Edit", "mx-2 btn btn-warning")
        editBtn.addEventListener("click", () => {
            localStorage.setItem("index", i)
            window.location = "edit.html"
        })
    })
}

if (userWrap) {
    drawData()
}

if (singleData) {
    const index = localStorage.getItem("index")
    const allUsers = readFromStorage("users")
    createMyOwnElement("p", singleData, allUsers[index].name)
}

if (editForm) {
    const index = localStorage.getItem("index")
    const allUsers = readFromStorage("users")
    editForm.name.value = allUsers[index].name;
    editForm.age.value = allUsers[index].age;
    editForm.mobile.value = allUsers[index].mobile;
    editForm.status.value = allUsers[index].status;
    editForm.addEventListener("submit", function (e) {
        e.preventDefault()
        // const user = userObjCreator(editForm)
        // addUser(user)
        window.location = "index.html"
        console.log(document.querySelector("#id"));
    })

}













