var correos = []
var contraseñas = []

function compararContra() {
    var contra = document.getElementById('contra')
    var valorContra = contra.value
    var contra2 = document.getElementById('pass')
    var valorContra2 = contra2.value

    if (valorContra2 == valorContra){
        return true
    } else {	
        alert("Las contraseñas no son iguales")
        return false
    }
}

function compararCorreo(){
	var correo = document.getElementById('e_mail')
	var valorCorreo = correo.value
	var correo2 = document.getElementById('v_email')
	var valorCorreo2 = correo2.value

	if (valorCorreo == valorCorreo2){
		return true
	} else {
		alert("Correo no válido")
		return false
	}
}

function correoValido(){
	var correo = document.getElementById('e_mail')
	var valorCorreo = correo.value
	var correo2 = document.getElementById('v_email')
	var valorCorreo2 = correo2.value

	if (valorCorreo.indexOf(".") == -1) {
		alert("Correo no válido")
		return false
	}
	else if (valorCorreo.indexOf(" ") != -1){
		alert("Correo no válido")
		return false
	}
	else if (valorCorreo.indexOf("@") == -1){
		alert("Correo no válido")
		return false
	}
	else {
		let inicio = valorCorreo.indexOf("@")
		if (inicio < 3){
			alert("Correo no válido")
			return false
		} else {
			let indicadora = false
			for (let i = inicio;i < valorCorreo.length -2;i++){
				if (valorCorreo[i] == "."){
					indicadora = true
				}
			}
			return indicadora
		}
	}
}


function verificarCorreo(){
	var correo = document.getElementById('e_mail')

	if (correos.includes(correo.value)){
		alert("El correo ya existe")
		return false
	} else {
		return true
	}
}

function guardarInfo(){

	var contrasena = document.getElementById('contra')
	var confirmaContra = document.getElementById('pass')
	var correo = document.getElementById('e_mail')
	var reCorreo = document.getElementById('v_email')
	
    if (compararContra() && correoValido() && compararCorreo() && verificarCorreo()){
		contraseñas.push(contrasena.value)	
		correos.push(correo.value)		
	}
	var BDregistro = [contraseñas,correos]
	console.log(BDregistro)
}