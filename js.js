	// <div class="contacto">-
	// 			<h1>Nombre de contacto</h1>-
	// 		 	<p>numero de telefono</p>
	//          <p>Correo electronico</p>	

	// 		 	<div class="botones">
	// 			 	<button class="boton-item edit fas fa-edit">Edit</button>
	// 				<button class="boton-item delete fas fa-trash-alt">Detele</button>
	// 		 	</div>
	// </div>

const contactosDiv =  document.getElementById('contactos')//div donde se insertan los contactos
const fragmento = document.createDocumentFragment();

let contactos_id = [[],[]];
let contadorClicsCreateButton = 0;
let contadorClicsEditButton = 0;
let contadorClicsDeleteButton = 0;
let active;
let returned;
let numero_contacto=1;
let contactosSelectedAll = new Array;
const maxrange = document.querySelectorAll('[max]');

const deleteButtonPrincipal = document.querySelector('.delete');
deleteButtonPrincipal.addEventListener('click',()=>showDelete());


if(contactos_id[0].length == 0){

	maxrange[0].setAttribute('max','1');
	maxrange[1].setAttribute('max','1');
}

//darle al contenedor de contactos un diplay invisible ahora que no hay elementos
if(contactos_id.length == 0){
	contactosDiv.style.display = 'none';
}


showCreate  =()=>{
	//si el contardor de clics es par entonces muestra el listado de inputs 
	//sino (significa que esta visible) lo volvera invisible 
	//pero si el contador de clics del boton 'edit' es impar(es decir que esta abierto) el edit se volvera invisible
	
	if(contadorClicsCreateButton%2 ==0)	document.querySelector('.inputs-crear').style.display = 'block';
	else document.querySelector('.inputs-crear').style.display = 'none';



	if(contadorClicsEditButton%2 == 1){ 
		document.querySelector('.inputs-edit').style.display = 'none';
		contadorClicsEditButton++
	}
	if(contadorClicsDeleteButton%2 ==1){
		document.querySelector('.inputs-delete').style.display = 'none'
		contadorClicsDeleteButton++
	}
	contadorClicsCreateButton++
}

showEdit  =()=>{
	//1. validar si hay elementos para editar
	//2. seleccionar el contacto, y conseguir su index, o que el usuario lo ingrese por si mismo.
	//3. los inputs deben tener de antemano los datos del contacto seleccionado



	//lo mismo para el boton edit que con el boton 'create'



	//cambiar para que cuando el usuario seleccione el contacto a editar se abra ahi el menu de 
	//opciones para cambiar los valores del contacto
	if(contadorClicsEditButton%2 ==0)	{
		document.querySelector('.inputs-edit').style.display = 'block';
		document.querySelector('.inputs-edit > .inputs-buscar').style.display = 'block';
		document.querySelector('.inputs-edit > .nombre').style.display = 'none';
		document.querySelector('.inputs-edit > .numero').style.display = 'none';
		document.querySelector('.inputs-edit > .correo').style.display = 'none';
		document.querySelector('.inputs-edit .btn-container > .submit-edit').style.display = 'none';
	
	}
	
	else document.querySelector('.inputs-edit').style.display = 'none';

	//en caso de que sea impar el Delete btn y el create btn les dara un display none
	if(contadorClicsCreateButton%2 == 1) {
		document.querySelector('.inputs-crear').style.display = 'none';
		contadorClicsCreateButton++
	}
	if(contadorClicsDeleteButton%2 ==1){
		document.querySelector('.inputs-delete').style.display = 'none'
		contadorClicsDeleteButton++
	}
	contadorClicsEditButton++
}

showDelete =()=>{
	if(returned[1].length==0){
	
	if(contadorClicsDeleteButton%2 == 0 ) document.querySelector('.inputs-delete').style.display = 'block';
	else document.querySelector('.inputs-delete').style.display = 'none';


	if(contadorClicsCreateButton%2 == 1) {
		document.querySelector('.inputs-crear').style.display = 'none';
		contadorClicsCreateButton++
	}
	if(contadorClicsEditButton%2 == 1){ 
		document.querySelector('.inputs-edit').style.display = 'none';
		contadorClicsEditButton++
	}
	contadorClicsDeleteButton++
}




}
seleccionarVarios = (indice) =>{
	let contactoSelected = document.getElementById(indice);



	if(document.getElementById(indice) == null){

		//do nothing
	}else
	{
		active =  document.getElementById(indice).getAttribute('active');
		
		if(active=='true'){
			contactoSelected.setAttribute('active','false');
			lastChild = document.getElementById(indice).lastChild;
			contactoSelected.removeChild(lastChild);
			document.getElementById(indice).style.background = 'linear-gradient(rgb(210,210,210),rgb(230,230,230))';

			index = contactosSelectedAll.indexOf(indice);
			contactosSelectedAll.splice(index,1);

		}
		if(active=='false'){
			contactosSelectedAll.push(indice);
			document.getElementById(indice).setAttribute('active','true');

			document.getElementById(indice).style.background = '#bec';
			selector = '.'+indice;
			 contactoSelected = document.getElementById(indice);
			a = document.createElement('A');
			a.classList.add('link-selected');
			texto = document.createTextNode('selected');
			a.appendChild(texto);
			let listaNodos = document.querySelectorAll('[active="true"]');
			contactoSelected.appendChild(a);

		}
	}
	returned = [document.querySelectorAll('[active="true"]'),contactosSelectedAll,console.log(contactosSelectedAll)];

	return returned
}




deleteContactoVarios =()=>{
		//eliminar selecciones multiples
		if(contactosSelectedAll.length>0){
			 let bool = window.confirm('¿Estas seguro de que quieres eliminar los contactos seleccionados?')
			 if(bool){
			 	// recorre el array de Contactos_id para que elimine los elementos 
			 	//solo si coincide con el id que nos devolvio 
			 	for(let revision_en_contactos in contactos_id[0] ){
			 		
			 		let id = contactos_id[0][revision_en_contactos].getAttribute('id');

			 		for(let elementos2 in returned[0]){

			 			let comparador = returned[0][elementos2]
			 			if(id == comparador.getAttribute('id') ){
			 				//estilos al remover
			 				contactos_id[0][revision_en_contactos].style.opacity = "0";
			 			 	contactos_id[0][revision_en_contactos].remove();
			 			 	contactos_id[0].splice(revision_en_contactos,1);
			 			 	contactos_id[1].splice(revision_en_contactos,1);
			 			 	console.log(`El elemento con la id: ${id}, fue removido`);
			 			 	document.querySelector('.inputs-delete').style.display = 'none';
			 			 	break
			 			}

			 		}
			 	}




			 }
			}
			
	if(contactos_id[0].length == 0)document.getElementById("contactos").style.display = 'none';

}

deleteContacto = (indice)=>{
	let bool = window.confirm('¿Estas seguro de que quieres eliminar los contactos seleccionados1?');
	
	if(bool){

	for(elementos in contactos_id[0]){
	let id = contactos_id[0][elementos].getAttribute('id');
		if(id==indice){
			contactos_id[0][elementos].style.opacity = "0"

			contactos_id[0][elementos].remove();
			contactos_id[0].splice(elementos,1);
			contactos_id[1].splice(elementos,1);
			
		}
	}
	// console.clear()
	console.log('eliminado')
	if(contactos_id[0].length == 0)document.getElementById("contactos").style.display = 'none';
	}
	else showError('se canceló el proceso de eliminación');
	e.stopPropagation()
}

editContacto = ()=>{
	console.log('contacto Editado')
}

buscarIndice= ()=>{
	
}
crearContacto = (nombre,numeroTelefono,CorreElectronico)=>{
	let divContacto = document.createElement('DIV');//contenedor del contacto
	divContacto.classList.add('info');
	let a = document.createElement('A');

	a.classList.add('contacto');
	a.setAttribute('id',numero_contacto);

	let divBotones = document.createElement('DIV');//contenedor de botones
	divBotones.classList.add('botones');


	let nombreContacto = document.createElement('H2'); //nombre
	nombreContacto.textContent = nombre;

	let posicion = document.createElement('DIV');//posicion- absolute
	posicion.textContent = numero_contacto;
	posicion.classList.add('posicion');

	let numero = document.createElement('P');//numero
	numero.textContent = numeroTelefono;

	let correo = document.createElement('P');//correo
	correo.textContent = CorreElectronico;



	//botones edit y delete Zona contactos


	let editButton = document.createElement('BUTTON');
	editButton.classList.add('boton-item','edit','fas','fa-edit');
	editButton.setAttribute('onclick','editContacto()');
	editButton.textContent='Edit';

	let deleteButton = document.createElement('BUTTON');
	deleteButton.classList.add('boton-item','delete','fas','fa-trash-alt');
	deleteButton.addEventListener('click',(e)=>deleteContacto(a.getAttribute("id")));
	deleteButton.textContent = 'Delete';



	a.addEventListener('click',()=>seleccionarVarios(a.getAttribute('id')));

	//se insertan los botones detele y edit dentro de su DIV 
	divBotones.appendChild(editButton);
	divBotones.appendChild(deleteButton);


	//se inserta todos los datos y el DIV de los botones dentro del div de contacto
	divContacto.appendChild(posicion);
	divContacto.appendChild(nombreContacto);
	divContacto.appendChild(numero);
	divContacto.appendChild(correo);
	divContacto.appendChild(divBotones);



	//estamos agregando el contacto a un array donde se guardara, para que cuando se elimine en el dom
	//se guarde en una variable usando node.removeChild() verifique en el array y se elimine tambien en el.
	contactos_id[0].push(a);
	contactos_id[1].push(numero_contacto);

	a.appendChild(divContacto);
	fragmento.appendChild(a);
	a.setAttribute('active',false);

	contactosDiv.appendChild(fragmento);
	


	


	//darle al contenedor de contactos un diplay visible ahora que si hay elementos
	if(contactos_id.length > 0)   contactosDiv.style.display = 'flex'; 
	

	numero_contacto++;


	//crear un max para que si la cantidad de contactos es cero, el max sea 1, y que si es mas de uno
	//cree un max con la cantidad de objetos que tiene el array contactos_id(con eso no habra necesidad de que 
	// se cree otra funcion para un error si el index no existe) 
	

	if(contactos_id.length > 1){
		maxrange[0].setAttribute('max',contactos_id.length);
		maxrange[1].setAttribute('max',contactos_id.length);
	}


	return contactos_id
}

crearElementoSubmit=() =>{
	//conseguir el value de los inputs del boton crear.
	nombre = document.querySelector('.inputs-crear > .nombre').value;
	numero = document.querySelector('.inputs-crear > .numero').value;
	correo = document.querySelector('.inputs-crear > .correo').value;

	//si la cantidad de caracteres en cada input es igual a  0 se muestra un error en console y en pantalla
	// en el correo si no tiene un '@' o un '.' tambien se mostrara un error
	if(nombre.length > 0 && numero.length > 0 && correo.includes('@') && correo.includes('.') ){ 
		crearContacto(nombre,numero,correo);
		
		document.querySelector('.inputs-crear').style.display = 'none'
		contadorClicsCreateButton++
		
		nombre = document.querySelector('.inputs-crear > .nombre').value = '';
		numero = document.querySelector('.inputs-crear > .numero').value = '';
		correo = document.querySelector('.inputs-crear > .correo').value = '';

	}
	else if(correo.includes('@')==false && correo.includes('.')==false){
		console.error('El campo de email no es un email valido');
		showError('El campo de email no es un email valido');
	
		console.error('No se llenaron los elementos "inputs HTML" correctamente');
		showError('No se llenaron los elementos "inputs HTML" correctamente');
	}
	else{
		console.error('No se llenaron los elementos "inputs HTML" correctamente');
		showError('No se llenaron los elementos "inputs HTML" correctamente');}
}

showError = (errorMensaje)=>{
	const errorContainer = document.querySelector('.errores');


	const icon = document.createElement('I');
	icon.classList.add('fas','fa-times-circle');
	icon.innerHTML = `<span>${errorMensaje}</span>`;

	errorContainer.appendChild(icon);


	setTimeout(()=>{errorContainer.removeChild(icon);console.clear()},4000);

}

i=0
while(i<10){
	crearContacto('nombre','numero','correo');
	i++;
}

