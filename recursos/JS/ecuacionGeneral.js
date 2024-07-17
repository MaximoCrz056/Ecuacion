let tabla = document.querySelector("#tabla");
        let formulario = document.querySelector("#formulario");
        let numero1 = document.querySelector("#numero1");
        let numero2 = document.querySelector("#numero2");
        let numero3 = document.querySelector("#numero3");
        let error1 = document.querySelector("#error1");
        let error2 = document.querySelector("#error2");
        let error3 = document.querySelector("#error3");
        let volverBtn = document.querySelector("#volverBtn");

        // Evento para el formulario
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();

            // Limpiar errores
            error1.innerHTML = "";
            error2.innerHTML = "";
            error3.innerHTML = "";

            // Validar campos
            let valid = true;

            let num1 = (numero1.value).trim();
            let num2 = (numero2.value).trim();
            let num3 = (numero3.value).trim();

            if (num1.length === 0 || isNaN(num1)) {
                error1.innerHTML = "Debe ingresar un número";
                valid = false;
            }
            if (num2.length === 0 || isNaN(num2)) {
                error2.innerHTML = "Debe ingresar un número";
                valid = false;
            }
            if (num3.length === 0 || isNaN(num3)) {
                error3.innerHTML = "Debe ingresar un número";
                valid = false;
            }

            if (valid) {
                // Convertir los valores a números
                let a = parseFloat(num1);
                let b = parseFloat(num2);
                let c = parseFloat(num3);

                // Calcular soluciones
                let resultado = ecuacion(a, b, c);

                // Imprimir resultados en la tabla o mostrar mensaje
                if (resultado.discriminante >= 0) {
                    imprimir(a, b, c, resultado.valorx1, resultado.valorx2);
                } else {
                    mostrarMensaje();
                }

                // Limpiar campos
                limpiar();

                // Ocultar formulario y mostrar tabla y botón volver
                formulario.style.display = 'none';
                tabla.style.display = 'block';
                volverBtn.style.display = 'block';
            }
        });

        // Función para limpiar campos
        let limpiar = () => {
            numero1.value = "";
            numero2.value = "";
            numero3.value = "";
        }

        numero1.addEventListener("focus", () => {
            error1.innerHTML = "";
        });
        numero2.addEventListener("focus", () => {
            error2.innerHTML = "";
        });
        numero3.addEventListener("focus", () => {
            error3.innerHTML = "";
        });

        // Función para calcular la ecuación
        let ecuacion = (a, b, c) => {
            let discriminante = Math.pow(b, 2) - 4 * a * c;
            if (discriminante > 0) {
                let raiz = Math.sqrt(discriminante);
                let valorx1 = ((-b + raiz) / (2 * a));
                let valorx2 = ((-b - raiz) / (2 * a));
                return { discriminante, valorx1, valorx2 };
            } else if (discriminante == 0) {
                let valorx1 = (-b / (2 * a));
                return { discriminante, valorx1, valorx1 };
            } else {
                return { discriminante };
            }
        }

        // Función para imprimir resultados en la tabla
        let imprimir = (a, b, c, valorx1, valorx2) => {
            let msg = "<table class='table table-bordered'>";
            msg += "<thead class='table table-warning'>";
            msg += "<tr><th scope='row'>a</th><th scope='row'>b</th><th scope='row'>c</th><th scope='row'>x1</th><th scope='row'>x2</th></tr>";
            msg += "<thead>";
            msg += "<tbody>";
            msg += "<tr>";
            msg += `<td>${a}</td>`;
            msg += `<td>${b}</td>`;
            msg += `<td>${c}</td>`;
            msg += `<td>${valorx1}</td>`;
            msg += `<td>${valorx2}</td>`;
            msg += "</tr>";
            msg += "</tbody></table>";

            tabla.innerHTML = msg;
        }

        // Función para mostrar mensaje cuando el discriminante es negativo
        let mostrarMensaje = () => {
            let msg = "<div class='container'><h3>La ecuación no se puede resolver porque el discriminante es negativo</h2><div>";
            tabla.innerHTML = msg;
        }

        // Evento para volver al formulario
        volverBtn.addEventListener('click', () => {
            // Ocultar tabla y botón volver y mostrar formulario
            tabla.style.display = 'none';
            volverBtn.style.display = 'none';
            formulario.style.display = 'block';
        });