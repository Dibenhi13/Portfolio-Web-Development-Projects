//BOTÓN SAVE INFO
const saveBtn = document.querySelector(".btnGuardar");
/*if (saveBtn) {
    saveBtn.addEventListener("click", (e) => {
        alert("Profile updated successfully! (Nothing actually saved because this is done afterwards dearest)");
    });
}*/


//BOTÓN LOGOUT
const logoutBtn = document.querySelector(".btnLogOut");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to log out?")) {
        window.location.href = "login.html";
        }
    });
}
