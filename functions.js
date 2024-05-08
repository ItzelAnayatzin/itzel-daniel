//Elemento contador
iniciarContador('micontador');
//Inicia la cuenta atrás
//bloque es el id del bloque usado para alojar el contador regresivo.
function iniciarContador(bloque){
   let hoy = new Date();
   let ini = hoy.valueOf();
   let fin = leerFinal(bloque)
   let tiempo = Math.floor((fin - ini)/1000); //pasar a segundos enteros)
   let obContador = {timer:null, "tiempo":tiempo};
   contar(obContador, bloque); //para evitar el delay inicial de 1 segundo
   obContador.timer = setInterval(contar, 1000, obContador, bloque);
   }
//Decrementa el tiempo hasta la fecha final
//Argumento:  objeto con  temporizador y el tiempo restante
 function contar(contador, bloque){
   let partes = [];
   if(contador.tiempo <= 0){
      clearInterval(contador.timer);
      contador.tiempo = 0;  //por si la fecha final ha pasado
   }
   else{
      contador.tiempo--;            
   }
  partes = formatTiempo(contador.tiempo);
  mostrarTiempo(partes, bloque);
}

//Convierte el tiempo restante en partes  dias, horas, minutos, segundos
function formatTiempo(tiempo){ 
    let dias, horas, minutos, segundos, partes;
    [minutos, segundos] = dividir(tiempo, 60);
    [horas, minutos] = dividir(minutos, 60);
    [dias, horas] = dividir(horas, 24); 
    partes = [dias, horas, minutos, segundos];
    return partes;
 }
 //divide números enteros devuelve [cociente, resto]
 function dividir(num, den){
    num = Math.floor(num);
    let coc = Math.floor(num/den);
    let resto = num % den;
    return [coc, resto];
 }

 //Poner en la página web
//Argumento : array dias,horas,minutos,segundos
//Partes estarán dentro del bloque contador
function mostrarTiempo(partes, bloque){
    let bloques  = document.querySelectorAll("#"+bloque+" .dig span");
    for(let i=0; i < bloques.length; i++){
       bloques[i].innerHTML = partes[i].toString().padStart(2,0);
    }
  }
 //Lee el valor de  fecha final desde un elemento con id = contador
 //devuelve fecha final como valor
 //formato de fecha año-mes-dia o año/mes/dia
 function leerFinal(bloque){
    let fecha;
    let milisec = 0;
    let datos = document.getElementById(bloque);
    datos = datos.dataset.final;
    fecha = new Date(datos);
    if (!isNaN(fecha.valueOf())){
       fecha = new Date(fecha);
      milisec = fecha.valueOf();
    }
    return milisec;
  }


//Confirmación por whats
//confirmacion por whats corregido para ipad, aparte ya esta bien estructurada el mensaje
document.getElementById("btnEnviar").addEventListener("click", function(event) {
   event.preventDefault(); // Evitar que el formulario se envíe
  
   let nombre = document.getElementById("nombre").value;
   let confirmacion = document.getElementById("confirmacion").value;
   let telefono = document.getElementById("telefono").value.trim();
   let mensaje = document.getElementById("mensaje").value;
  
   if (!/^\d+$/.test(telefono)) {
       alert("Por favor, introduce solo números en el campo de teléfono.");
       return;
   }
  
   if (nombre.trim() === "" || confirmacion === "" || telefono === "") {
       alert("Por favor completa todos los campos del formulario.");
       return;
   }
  
   let mensajeWhatsApp;
   if (confirmacion === "Sí asistiré") {
       mensajeWhatsApp = "✨ Hola soy " + nombre + ", muchas gracias por la invitación y quiero notificarles que acepto con mucho gusto! 😀\n" +
                         "Mi teléfono es: " + telefono + ".\n" +
                         "Dedicatoria: " + mensaje;
   } else if (confirmacion === "No asistiré") {
       mensajeWhatsApp = "✨ Hola soy " + nombre + ", muchas gracias por la invitación pero lamentablemente no podré asistir! Muchas gracias! ☹️\n" +
                         "Mi teléfono es: " + telefono + ".\n" +
                         "Dedicatoria: " + mensaje;
   }
  
   let enlaceWhatsApp = "https://api.whatsapp.com/send?phone=+523121673496&text=" + encodeURIComponent(mensajeWhatsApp);
   window.open(enlaceWhatsApp).focus;
});