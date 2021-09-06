import html2canvas from 'html2canvas';
//Necesario para importar los estilos de forma automática en la etiqueta 'style' del html final
import '../css/main.scss';



///// ALTURA DEL BLOQUE DEL GRÁFICO //////
function setChartHeight() {
    let titleBlock = document.getElementsByClassName('b-title')[0].clientHeight;
    let logicBlock = document.getElementsByClassName('chart__logics')[0].clientHeight;
    let footerBlock = document.getElementsByClassName('chart__footer')[0].clientHeight;

    //Comprobar previamente la altura que le demos al MAIN. El estado base es 588 pero podemos hacerlo más o menos alto en función de nuestros intereses

    let height = 540; //588 - 8px top del footer - 12px del padding del contenedor - 16px de margen del bloque del título - 16 de su margen bottom de la lógica
    document.getElementsByClassName('chart__viz')[0].style.height = height - titleBlock - logicBlock - footerBlock + 'px';
}

setChartHeight();

///// DESCARGA COMO PNG O SVG > DOS PASOS/////
let innerCanvas;
let pngDownload = document.getElementById('pngImage');

setChartCanvas();

function setChartCanvas() {
    html2canvas(document.querySelector("#chartBlock")).then(canvas => { innerCanvas = canvas}, {width: '768px', height: '588px'});
}

function setChartCanvasImage() {    
    var image = innerCanvas.toDataURL();
    // Create a link
    var aDownloadLink = document.createElement('a');
    // Add the name of the file to the link
    aDownloadLink.download = 'webpack-base-template.png';
    // Attach the data to the link
    aDownloadLink.href = image;
    // Get the code to click the download link
    aDownloadLink.click();
}

pngDownload.addEventListener('click', function(){
    setChartCanvasImage();
});

///// JUEGO DE PESTAÑAS /////
//Cambios de pestañas
let tabs = document.getElementsByClassName('tab');
let contenidos = document.getElementsByClassName('content');

for(let i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function(e) {
        displayContainer(e.target);
    });
}

function displayContainer(elem) {
    let content = elem.getAttribute('data-target');

    //Poner activo el botón
    for(let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    elem.classList.add('active');

    //Activar el contenido
    for(let i = 0; i < contenidos.length; i++) {
        contenidos[i].classList.remove('active');
    }

    document.getElementsByClassName(content)[0].classList.add('active');
}
