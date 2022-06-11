$(document).ready(function() {

    // nav-menu efecto
    var menuBtn = $('#menu-btn');
    var navMenu = $('#nav-menu');

    menuBtn.click(function() {
        navMenu.toggle('normal');
    });

    // Selector de tema
    var theme = $("#theme");
    $("#to-red").click(function() {
        theme.attr('href', 'css/red.css');
    });
    $("#to-blue").click(function() {
        theme.attr('href', 'css/blue.css');
    });

    // Scroll arriba de la web
    $("#btn-subir").click(function(e) {
        if (scrollTop = 0) {
            $("#btn-subir").toggle('normal');
        }

        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    //Reloj
    var now = moment().format('DD/MM/YYYY');
    if (window.location.href.indexOf('index') > -1) {
        setInterval(function() {
            var reloj = moment().format("MM/DD/YYYY | HH:mm:ss");
            $("#reloj").html(reloj);
        }, 1000);
    }

    // Funcion para agregar una fila
    var myTable = document.querySelector("table");
    $("#agregarFila").click(function agregarFila() {
        var row = myTable.insertRow(myTable.rows.length);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        for (var i = 0; i < myTable.rows.length; i++) {
            cell1.innerHTML = '<input type="text" class="producto">';
            cell2.innerHTML = '<input type="number" class="precio">';
        }
    });

    // Funcion para eliminar una fila
    $("#eliminarFila").click(function eliminarFila() {
        var rowCount = myTable.rows.length;
        if (rowCount <= 1) {
            alert('No se puede eliminar el encabezado');
        } else {
            myTable.deleteRow(rowCount - 1);
        }
    });

    // Funcion para mostrar una array y json
    $("#mostrarArray").click(function mostrarArray() {
        var arrayInput = new Array();
        var inputsValues = document.getElementsByClassName('precio'),
            namesValues = [].map.call(inputsValues, function(dataInput) {
                arrayInput.push(dataInput.value);
            });
        let total = 0;
        for (var i = 0; i < arrayInput.length; i++) {
            if (isNaN(parseInt(arrayInput[i]))) {
                arrayInput[i] = 0;
            }
            total += parseInt(arrayInput[i]);
        }
        $('.spTotal').val(total);
        
    });


    $("#guardar").click(function guardar() {
        var arrayPrecio = new Array();
        var inputsValues = document.getElementsByClassName('precio'),
            namesValues = [].map.call(inputsValues, function(dataInput) {
                arrayPrecio.push(dataInput.value);
            });

        var arrayProducto = new Array();
        var inputsValues = document.getElementsByClassName('producto'),
            namesValues = [].map.call(inputsValues, function(dataInput) {
                arrayProducto.push(dataInput.value);
            });

        for (var i = 0; i < arrayPrecio.length; i++) {
            var valName = arrayProducto[i];
            var valPrecio = arrayPrecio[i];
            arr = [];

            arr.push(valName);
            arr.push(valPrecio);

            Producto = arr.toString();

            json = JSON.stringify({
                                    Producto
                                 });

            datos = JSON.parse(json);
            console.log(datos);
            let myDataJson = localStorage.setItem("Datos de Productos"+[i], json);

            function download() {
                var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);
                var dlAnchorElem = document.getElementById('downloadAnchorElem');
                dlAnchorElem.setAttribute("href", dataStr);
                dlAnchorElem.setAttribute("download", 'Productos_'+[now]+'.json');
                dlAnchorElem.click();
                }
            // Start file download.
            download(json);
        }
    });

    

});