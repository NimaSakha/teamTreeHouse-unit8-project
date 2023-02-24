const UserSearchValue = 12
const modal = document.querySelector(".modal")
const esc = document.querySelector(".esc")
let userData = null
const loading = document.querySelector(".loading")
const Ebody = document.querySelector(".body")
const body = document.querySelector("body")

function modalHandler(src, Vname, Vemail, Vcity, Vphone, Vadress, Vdate) {
  const img = document.querySelector(".Simg")
  const name = document.querySelector(".Sname")
  const mail = document.querySelector(".Smail")
  const city = document.querySelector(".Scity")
  const phone = document.querySelector(".Sphone")
  const adress = document.querySelector(".Sadress")
  const date = document.querySelector(".SbDate")
  img.src = src
  name.innerHTML = Vname
  mail.innerHTML = Vemail
  city.innerHTML = Vcity
  phone.innerHTML = Vphone
  adress.innerHTML = Vadress
  date.innerHTML = `Birthday: ${Vdate}`
}

const fetchs = async () => {
  fetch(`https://randomuser.me/api/?results=${UserSearchValue}`)
    .then((responce) => {
      return responce.json()
    })
    .then((data) => {
      userData = data
      changeData()
    })
}

function changeData() {
  for (let i = 0; i < 12; i++) {
    loading.innerHTML = ""
    Ebody.style.display = "grid"
    const name = document.querySelector(`.name${i}`)
    const pfp = document.querySelector(`.pfp${i}`)
    const mail = document.querySelector(`.mail${i}`)
    const Ulocation = document.querySelector(`.location${i}`)
    name.innerHTML = `${
      userData.results[i].name.title +
      " " +
      userData.results[i].name.first +
      " " +
      userData.results[i].name.last
    }`
    pfp.src = `${userData.results[i].picture.large}`
    mail.innerHTML = `${userData.results[i].email}`
    Ulocation.innerHTML = `${userData.results[i].location.city}`
  }
}
Ebody.addEventListener("click", (e) => {
  if (e.target.id !== "") {
    const val = e.target.id.split("")[1]
    const selecteUser = userData.results[val]
    modal.style.display = "flex"
    body.className = "dark"
    body.scrollIntoView({ behavior: "smooth" }, true)
    console.log(selecteUser)
    let dob = selecteUser.dob.date.split("T")[0]
    dob = dob.split("-")
    let Ydob = dob[0].split("")
    Ydob = `${Ydob[2]}${Ydob[3]}`
    dob = `${dob[2]}/${dob[1]}/${Ydob}`
    //src, Vname, Vemail, Vcity, Vphone, Vadress, Vdate
    modalHandler(
      selecteUser.picture.large,
      selecteUser.name.title +
        " " +
        selecteUser.name.first +
        " " +
        selecteUser.name.last,
      selecteUser.email,
      selecteUser.location.city,
      selecteUser.phone,
      selecteUser.location.street.number +
        " " +
        selecteUser.location.street.name +
        " " +
        selecteUser.location.state +
        " " +
        selecteUser.location.postcode,
      dob
    )
  }
})
esc.addEventListener("click", () => {
  modal.style.display = "none"
  body.className = ""
})
