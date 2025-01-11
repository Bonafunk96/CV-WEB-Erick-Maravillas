//CREACION DE LISTA PARA PANTALLAS 767 - 1023 PX
function createList() {
  const container = document.querySelector(".nav-links-container");
  const ul = document.createElement("ul");

  // Mover los enlaces al nuevo <ul>
  const links = container.querySelectorAll(".nav-link");
  links.forEach((link) => {
    const li = document.createElement("li");
    li.appendChild(link.cloneNode(true)); // Clona el enlace y lo añade al <li>
    ul.appendChild(li);
  });


  // Limpia el contenedor y agrega el nuevo <ul>
  container.innerHTML = ""; // Limpiar enlaces originales
  container.appendChild(ul);
}

//COMBINACION DE LISTAS SKILL PARA PANTALLA MENOR A 767PX
function combineSkillLists() {
  const screenWidth = window.innerWidth; //ancho actual de pantalla en pixeles
  const listSkillContainer = document.querySelector('.skills-list');
  const lists = listSkillContainer.querySelectorAll('ul');

  if(screenWidth < 767 && lists.length === 2) {
    const combinedList = document.createElement('ul');
    lists.forEach((ul) => {
      while (ul.firstChild) { //se ejecuta mientras tenga elementos child en este caso li
        combinedList.appendChild(ul.firstChild);
      }
      ul.remove(); //despues de mover todos los elementos elimina el ul original 
    })
    listSkillContainer.appendChild(combinedList); //a la new list le añadimos lo que tenemos en combined list
  } else if (screenWidth >= 767 && lists.length === 1) {
      const items = Array.from(lists[0].children);
      const half = Math.ceil(items.length / 2);
      const newList1 = document.createElement('ul');
      const newList2 = document.createElement('ul');
  
      items.slice(0, half).forEach(item => newList1.appendChild(item)); //primera mitad va a la primera lista
      items.slice(half).forEach(item => newList2.appendChild(item));  //segunda mitad va a la segunda lista
  
      lists[0].remove(); //elimina combined list del contener listSkillContainer
      listSkillContainer.appendChild(newList1);
      listSkillContainer.appendChild(newList2);
  }
}

combineSkillLists(); //cargamos la funcion al cargar la pagina
window.addEventListener('resize', combineSkillLists); //escucha cuando lav ventana cambia de tamaño y ejecuta la funcion

/******************************END OF MOBILE JS****************************/


function toggleMenu() {
  const menu = document.querySelector(".nav-links-container");
  const nameCV = document.querySelector(".nameCV");
  //Al burgerMenu lo cambiamos de display none a display flex
  menu.classList.toggle("mostrar");

  // Verifica si el menú está abierto o cerrado
  if (menu.classList.contains("mostrar")) {
    nameCV.classList.add("moved"); // Mover el h2 hacia arriba
  } else {
    nameCV.classList.remove("moved"); // Regresar a la posición original
  }
  const links = document.querySelectorAll(".nav-link");
  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("mostrar");
      nameCV.classList.remove("moved"); // Regresa el título a su posición
    });
  });
}

// Función para verificar el tamaño de la pantalla
function checkScreenSize() {
  const width = window.innerWidth;
  const navContainer = document.querySelector(".nav-links-container");

  if (width >= 768 && width <= 1196) {
    if (!navContainer.querySelector("ul")) {
      // Verifica si ya hay un <ul>
      createList();
    }
  } else {
    // Vuelve a los enlaces si la pantalla es más pequeña o más grande
    if (navContainer.querySelector("ul")) {
      const ul = navContainer.querySelector("ul");
      const links = ul.querySelectorAll("li a");

      navContainer.innerHTML = ""; // Limpiar el <ul>
      links.forEach((link) => {
        navContainer.appendChild(link.cloneNode(true)); // Añadir enlaces de nuevo
      });
    }
  }
}

// Escuchar cambios de tamaño de ventana
window.addEventListener("resize", checkScreenSize);
checkScreenSize(); // Comprobar el tamaño de la pantalla al cargar

/***************************************************************************/ 

// Función para el desplazamiento suave del navbar a la seccion objetivo
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault(); // Evita el comportamiento por defecto
    
    const target = document.querySelector(this.getAttribute('href')); // Obtiene el elemento de destino
    smoothScroll(target, 1000); // Llama a la función de desplazamiento suave (1000ms = 1 segundo)
  });
});

function smoothScroll(target, duration) {
  const targetPosition = target.getBoundingClientRect().top + window.scrollY; // Posición del objetivo
  const startPosition = window.pageYOffset; // Posición actual
  const distance = targetPosition - startPosition; // Distancia a recorrer
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime; // Tiempo transcurrido
    const run = ease(timeElapsed, startPosition, distance, duration); // Calcula la posición actual
    window.scrollTo(0, run); // Desplaza la ventana
    if (timeElapsed < duration) requestAnimationFrame(animation); // Si no ha terminado, sigue animando
  }

  // Función de easing para suavizar el desplazamiento
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation); // Inicia la animación
}

/*Back to top button*/
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
}); 
