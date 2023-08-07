function updateMessage() {
  alert("Database Updated!");
}

function preview(event) {
  console.log("Hi");
  var elems = document.getElementById("id_images");
  var x = elems.files.length;
  console.log(x);
  for (i = 0; i < elems.files.length; i++) {
    // frame.src = URL.createObjectURL(event.target.files[i]);
    var urls = URL.createObjectURL(event.target.files[i]);
    console.log(urls);
    document.getElementById("galeria").innerHTML += '<img src="' + urls + '">';
  }

  document.getElementById("i").setAttribute("src", "democlass");
}

var inputFile = document.getElementById("brand_logo");
removeImg = () => {
  document.getElementById("frame").setAttribute("src", "");
  document.getElementById("i").setAttribute("src", "");
  inputFile.value = "";
};

function popup(x) {
  document.getElementById("popup-" + x).style.display = "block";
  console.log("popup clicked");
  console.log(x);
}
function closePopUp(x) {
  document.getElementById("popup-" + x).style.display = "none";
  console.log("popup closed");
  console.log(x);
}
function editTitle(x) {
  document.getElementById("edit-title-" + x).style.display = "block";
  console.log("title update popup opened");
  console.log(x);
}
