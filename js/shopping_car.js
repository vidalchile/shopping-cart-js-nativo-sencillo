window.onload = function () {

    // Variables
    var baseDeDatos = [
        {
            id: 1,
            nombre: 'Patata',
            precio: 1
        },
        {
            id: 2,
            nombre: 'Cebolla',
            precio: 1.2
        },
        {
            id: 3,
            nombre: 'Calabacin',
            precio: 2.1
        },
        {
            id: 4,
            nombre: 'Fresas',
            precio: 0.6
        }
    ];

    console.log('Mis Productos');
    console.log(baseDeDatos);

    //var items 	= document.querySelector('#items');
    var items = document.getElementById('items');
    var carrito = [];
    var total 	= 0;
    
    //var carritoNodo = document.querySelector('#carrito');
    var carritoNodo = document.getElementById('carrito');

    var totalNodo 	= document.querySelector('#total');

    function renderItems()
    {
    	console.log('Renderizamos los Items');

        for (var info of baseDeDatos) 
        {
        	//Creamos nodo padre
            var miNodoCard = document.createElement('div');
            //Agregar clases al div recién creado
            miNodoCard.classList.add('card', 'col-sm-4');

            //Creamos Card Body
            var miNodoCardBody = document.createElement('div');
            //Agregar clases al div recién creado
            miNodoCardBody.classList.add('card-body');

            //Creamos Titulo Card Body
            var miNodoTitleCardBody = document.createElement('h5');
            miNodoTitleCardBody.classList.add('card-title');
            miNodoTitleCardBody.textContent = info['nombre'];

            //Creamos Precio Card Body
            var miNodoPrecioCardBody = document.createElement('p');
            miNodoPrecioCardBody.classList.add('card-text');
            miNodoPrecioCardBody.textContent = info['precio'] + '€';

            //Creamos Boton Card Body
            var miNodoBotonCardBody = document.createElement('button');
            miNodoBotonCardBody.classList.add('btn', 'btn-primary');
            miNodoBotonCardBody.textContent = 'Agregar';
            miNodoBotonCardBody.setAttribute('identificador', info['id']);
            miNodoBotonCardBody.addEventListener('click', anyadirCarrito);
            
            //Insertamos titulo al Card Body
            miNodoCardBody.appendChild(miNodoTitleCardBody);

            //Insertamos Precio al Card Body
            miNodoCardBody.appendChild(miNodoPrecioCardBody);

            //Insertamos Boton al Card Body
            miNodoCardBody.appendChild(miNodoBotonCardBody);

            //Insertamos Card Body al nodo Card
            miNodoCard.appendChild(miNodoCardBody);

            //Insertamos Card al elemento padre Items
            items.appendChild(miNodoCard);
        }

        console.log(items);
    }

    function anyadirCarrito()
    {
    	var identificador = this.getAttribute('identificador');

    	//Añadimos el Nodo a nuestro carrito de compra
    	console.log('Añadir identificador '+identificador+' al arreglo carrito');
	    carrito.push(identificador);

	    //Calculo el total
    	calcularTotal();

	    //Renderizamos el carrito 
	    renderizarCarrito();
    }

    function calcularTotal()
    {
    	console.log('Calcular total');

    	//Limpiamos precio anterior
	    total = 0;

	    //Recorremos el array del carrito
	    for (var item of carrito)
	    {
	    	//El método filter() Crea un nuevo array con todos los elementos que cumplan la condición 
	    	//implementada por la función dada

	        //const miItem = baseDeDatos.filter(itemBaseDatos => itemBaseDatos['id'] == item);

			//De cada elemento obtenemos su precio
	        var miItem = baseDeDatos.filter(function(itemBaseDatos) {
	            return itemBaseDatos['id'] == item;
	        });

	        total = total + miItem[0]['precio'];
	    }

	    console.log('Renderizamos nodo total');

	    //Renderizamos el precio en el HTML
	    totalNodo.textContent = total.toFixed(2);

	    console.log(totalNodo);
    }

    function renderizarCarrito()
    {
    	console.log('Renderizamos nodo carrito');

    	console.log('Carrito actual');
    	console.log(carrito);
    	console.log('Items carrito actual');

    	carritoNodo.textContent = '';

    	//Generamos los Nodos a partir de carrito
	    carrito.forEach(function (item, indice) {

	    	//console.log('indice: '+indice+' item:'+item);

	    	//El método filter() Crea un nuevo array con todos los elementos que cumplan la condición 
	    	//implementada por la función dada

	    	//Obtenemos el item que necesitamos de la variable base de datos
	        let miItem = baseDeDatos.filter(function(itemBaseDatos) {
	            return itemBaseDatos['id'] == item;
	        });

	        // Creamos el nodo del item del carrito
	        var miNodo = document.createElement('li');
	        miNodo.classList.add('list-group-item', 'text-right');
	        miNodo.textContent = `${miItem[0]['nombre']} - ${miItem[0]['precio']}€ `;

	        //Boton de borrar
	        var miBoton = document.createElement('button');
	        miBoton.classList.add('btn', 'btn-danger');
	        miBoton.textContent = 'X';
	        miBoton.setAttribute('posicion', indice);
	        miBoton.addEventListener('click', borrarItemCarrito);

	        //Mezclamos nodos
	        miNodo.appendChild(miBoton);
	        carritoNodo.appendChild(miNodo);
	        
	        console.log(miItem);

	    });

    	console.log(carritoNodo);
    }

    function borrarItemCarrito()
    {
    	//Obtenemos la posicion que hay en el boton pulsado
    	var posicion = this.getAttribute('posicion');
    	console.log('Eliminar del carrito posicion: '+posicion);

    	/*El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos*/

    	//Borramos la posicion que nos interesa
    	carrito.splice(posicion, 1);
	    
	    //Volvemos a renderizar
	    renderizarCarrito();
	    
	    //Calculamos de nuevo el precio
	    calcularTotal();
    }

    renderItems();
}