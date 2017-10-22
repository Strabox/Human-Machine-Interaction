/*
##################################
##################################
VARIÁVEIS
##################################
##################################
*/
/*
##################################
##################################
BIMBY
##################################
##################################
*/
INDEX_DA_PANELA_EM_MENUS=3;
var TIMER_COZINHAR = "off";
var BIMBY_DETECTAR = "on";
var BIMBY_ESTADO = "off";
var DIA_OU_NOITE="dia";
var TAREFA_FUNCAO=" Cortar";
var TAREFA_VELOCIDADE=" Lento";
var TAREFA_TEMPERATURA=80;
var TAREFA_TEMPO=3;
var tempoBimbyCozinhar=3;
var bimby_ingredientes_panela = new Array();
var MAX_INGREDIENTES = 10;
var ptr_ingrediente_escolhido;
var indice_ingred_static=0;
var ingrediente_a_por;
var sufixoToAdd;
var graus="ºC";
var temperaturas=new Array();
temperaturas[0]=40;
temperaturas[1]=60;
temperaturas[2]=80;
temperaturas[3]=100;
temperaturas[4]=120;
temperaturas[5]=140;
temperaturas[6]=160;
temperaturas[7]=180;
temperaturas[8]=200;
var segundos=" min";
var tempos=new Array();
tempos[0]=1;
tempos[1]=2;
tempos[2]=3;
tempos[3]=4;
tempos[4]=5;
tempos[5]=10;
tempos[6]=15;
tempos[7]=20;
tempos[8]=25;
tempos[9]=30;
tempos[10]=45;
tempos[11]=60;
tempos[12]=90;
tempos[13]=120;
var gramas=" g"
var pesos1=new Array();
pesos1[0]=10;
pesos1[1]=20;
pesos1[2]=30;
pesos1[3]=40;
pesos1[4]=50;
var pesos2=new Array();
pesos2[0]=25;
pesos2[1]=50;
pesos2[2]=75;
pesos2[3]=100;
pesos2[4]=150;
pesos2[5]=200;
pesos2[6]=250;
pesos2[7]=500;
pesos2[8]=750;
pesos2[9]=1000;
var ml=" ml";
var quantidades1=new Array();
quantidades1[0]=25;
quantidades1[1]=50;
quantidades1[2]=75;
quantidades1[3]=100;
quantidades1[4]=150;
quantidades1[5]=200;
quantidades1[6]=250;
quantidades1[7]=500;
quantidades1[8]=750;
quantidades1[9]=1000;
var unidades="";
var quantidadesN=new Array();
quantidadesN[0]=1;
quantidadesN[1]=2;
quantidadesN[2]=3;
quantidadesN[3]=4;
quantidadesN[4]=5;
quantidadesN[5]=6;
quantidadesN[6]=7;
quantidadesN[7]=8;
quantidadesN[8]=9;
quantidadesN[9]=10;


/*
##################################
##################################
SONO
##################################
##################################
*/
var SONO_DETECTAR = "on";
var TEMPO_CADA_PASSO=20;
var simbolos = new Array();//inputs do teste de sono
simbolos[0] = "teste_cima";
simbolos[1] = "teste_baixo";
simbolos[2] = "teste_direita";
var sequencia = new Array();//a sequencia random gerada para cada teste de sono
var teste_passo = 0;//indica em q passo (0, 1, 2) do teste de sono vai
var teste_registar = "off";//liga ou desliga detecção de input antes do teste de sono
var timer_teste;//ponteiro para timer de preparação do teste de sono
var tempo_teste_decimas;// de 10 a 0 décimas de segundo, para cada passo do teste de sono
var timer_teste_decimas;// ponteiro para o timer de cada passo do teste de sono
var timer_ready1;
var timer_ready2;
var timer_ready3;
var timer_ready4;
var emMovimento=false;

/*
##################################
##################################
KITTADO
##################################
##################################
*/
var DIA_OU_NOITE="dia";
var FUNDO_DIA_ACTUAL = -1;					//Cor Actual do Interior do Automóvel.
var JANTES_SOURCE = "Images/Jantes/jante";	//Localizacao das Imagens das Jantes.
var CORES_SOURCE = "Images/Cores/cor";		//Localizacao das Cores.
var IMAGES_EXTENSION = ".png";				//Extensao das Imagens Usada.
var NUM_CORES = 8;							//Numero de cores disponiveis na APP.
var NUM_JANTES = 7;							//Numero de jantes disponiveis na APP.
var escolherCor = 0;


/*
##################################
##################################
FUNÇÕES COMUNS A TODAS AS FUNCIONALIDADES
##################################
##################################
*/

/*########################################################
  ######                 MAIN                       ######
  ########################################################
*/

var menus = new Menus();
menus.addMenu(new Menu(1,"escondido"));

/* PRE-LOADING BACKGROUND IMAGES */

var images = ['Images/cockpit_dia_x3.png','Images/cockpit_noite_x3.png','Images/cockpit_dia_x3_cor0.png','Images/cockpit_dia_x3_cor1.png','Images/cockpit_dia_x3_cor2.png','Images/cockpit_dia_x3_cor3.png','Images/cockpit_dia_x3_cor4.png','Images/cockpit_dia_x3_cor5.png','Images/cockpit_dia_x3_cor6.png','Images/cockpit_dia_x3_cor7.png'];
var loadedImages = [];
var img;
for (var i = 0; i < images.length; i++) {
   img = new Image().src = images[i];
   loadedImages[i] = img; // not sure if this is needed
}
/*###########################################################*/

/* mod(n,m) - Modulo do JS nao funciona normalmente */
function mod(n, m) {
        return ((m % n) + n) % n;
}

function getElementByID(id){
	return document.getElementById(id);
}

/* test(event) - Function that handle keyboard events.*/
function test(event) {
    if (BIMBY_DETECTAR=="off") return;
    if (event.keyCode===79)			/* L - Handler */
        ok();
	else if	(event.keyCode===83)	/* S - Handler */
		baixo();
	else if	(event.keyCode===87)	/* W - Handler */
		cima();
	else if	(event.keyCode===76)	/* O - Handler */
		retro();
	else if	(event.keyCode===78)	/* N - Day/Night Handler */
		switchDiaNoite();
	else if (event.keyCode===77)	/* M - Moving/Not moving Handler */
		toggleEmMovimento();
}
/* funções de fundos de menus (variam com dia ou noite) */
function fundoSeleccionado(){
	if (DIA_OU_NOITE=="dia")
		/*return "FFFF66";*/
		return "#202020";/*"transparent";*/
	/*else return "white";*/
	else return "#202020";/*"transparent";*/
}
function fundoNaoSeleccionado(){
	if (DIA_OU_NOITE=="dia")
		/*return "orange";*/
		return "#FF4C00";
	/*else return "cornflowerblue";*/
	return "#006B00";
}
/* switchDiaNoite() - troca entre dia e noite, verificando var dia_ou_noite, para mudar o CSS;*/
function switchDiaNoite(){
	var shit =document.getElementById("esquema");
	if(DIA_OU_NOITE=="dia"){
		DIA_OU_NOITE="noite";
		shit.href="noite.css";
		document.body.style.backgroundImage="url('Images/cockpit_noite_x3.png')";
	}else{
		DIA_OU_NOITE="dia";
		shit.href="dia.css";
		if(FUNDO_DIA_ACTUAL != -1)	
			document.body.style.backgroundImage = "url('Images/cockpit_dia_x3_cor"+FUNDO_DIA_ACTUAL+".png')";
		else					//Caso ainda não se tenha mudado nenhuma cora fica com o default.
			document.body.style.backgroundImage="url('Images/cockpit_dia_x3.png')";
	}
	
	var m;

	for(var i=0; i < menus.menus.length; i++){
		m = menus.menus[i].getSelected();
		m.style.backgroundColor=fundoNaoSeleccionado();
	}
}

var estadoAjudas="off";
var ajudaAberta;
var menuActivo="";

function toggleAjudas(){
	var toggles = document.getElementsByClassName("ajudatog");
	var num_togs=toggles.length;
	var i;
	//getElementByID("lol3").innerHTML="inicio toggle: "+estadoAjudas;
	if (estadoAjudas == "on"){
		estadoAjudas="off";
		if(ajudaAberta !== null){
			ajudaAberta.style.visibility="hidden";
		}
		for(i=0; i<num_togs; i++){
			toggles[i].innerHTML="Abrir ajuda";
		}
		//getElementByID("lol5").innerHTML="fim toggle para off"+estadoAjudas;
		return;
	}
	for(i=0; i<num_togs; i++){
		toggles[i].innerHTML="Fechar ajuda";
	}
	estadoAjudas="on"; //estavam desligadas
	updateAjudas();
	//getElementByID("lol5").innerHTML="fim toggle para on"+estadoAjudas;
	return;
}

function updateAjudas(){	// muda a ajuda visível dependendo do menu
	// aparece em toggle^^, na class Menus (para actualizar com OK) e em retro.
	//getElementByID("lol4").innerHTML=estadoAjudas;
	if (estadoAjudas == "off") return;
	if(ajudaAberta){
		ajudaAberta.style.visibility="hidden";
	}
	menuAberto = menus.getActiveMenu().htmlName;
	//getElementByID("lol1").innerHTML=menuAberto;
	var novaAj = getElementByID("ajuda_"+menuAberto);
	if(novaAj){
		ajudaAberta=novaAj;
		//getElementByID("lol2").innerHTML=ajudaAberta.getElementsByTagName("li")[1].innerHTML;
		ajudaAberta.style.visibility="visible";	
	}
	menuActivo=menuAberto;
}

var mov1="Veículo está parado. Pressionar M para o pôr em movimento.";
var mov2="Veículo está em movimento. Pressionar M para o deixar parado.";
function toggleEmMovimento(){
	var indica=getElementByID("emMovimento");
	var coiso_de_testar=getElementByID("fazerTesteSono");
	if(!emMovimento){
		emMovimento=true;
		indica.innerHTML=mov2;
		coiso_de_testar.innerHTML="Pare o carro para fazer o teste";
		return;
	} else {
		emMovimento=false;
		indica.innerHTML=mov1;
		coiso_de_testar.innerHTML="Fazer o teste";
		return;
	}
}

var radioplaying=false;	
function toggleRadio(){
	var radio=getElementByID("radio");
	if(!radioplaying){
		radioplaying=true;
		radio.volume=0.5;
		radio.play();
	}
	else if(radioplaying){
		radioplaying=false;
		radio.pause();
	}
}

/*
##################################
##################################
MENUS
##################################
##################################
*/
/*
##################################
##################################
Objecto Menus Contem todos os menus na aplicação ou seja 
	aqueles que já foram abertos.
##################################
##################################
*/
function Menus(){				//Construtor
	this.menus = new Array();	//Conjunto de Menus individuais.
	this.activeMenu = -1;
	
	this.addMenu = addMenu;
	function addMenu(menu){		//Adiciona um menu ao conjunto de Menus.
		this.activeMenu++;
		this.menus[this.activeMenu] = menu;
		updateAjudas();
	}
	
	this.getActiveMenu = getActiveMenu;
	function getActiveMenu(){	//Devolve o Menu que está "activo".
		if(this.activeMenu != -1)
			return this.menus[this.activeMenu];
		else 
			return -1;
	}
	
	this.removeMenu = removeMenu;
	function removeMenu(){		//Remove o ultimo menu do array de MENUS.
		if(this.menus.length > 1){
			this.getActiveMenu().resetMenu();
			this.menus.pop();
			this.activeMenu--;
		}
		this.getActiveMenu().showMenu();
	}
}
/*
##################################
##################################
MENU NORMAL
##################################
##################################
*/
/* Objecto Menu Representacao do HTML mas em JS */
function Menu(menuSize,nameHtml){	//Construtor
	this.htmlName = nameHtml;		
	this.size = menuSize;
	this.ptr = 1;
	/*Inicializar o cursor quando se abre o menu */
	var menu = getElementByID(this.htmlName).getElementsByTagName("li");
	menu[this.ptr].style.backgroundColor = fundoNaoSeleccionado();
	
	this.next = next;
	function next(){				/* Desloca o selector do menu */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		menu[this.ptr].style.backgroundColor = fundoSeleccionado();
		this.ptr = mod(this.size,this.ptr)+1;
		menu[this.ptr].style.backgroundColor = fundoNaoSeleccionado();
	}
	
	this.back = back;
	function back(){				/* Desloca o selector do menu */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		menu[this.ptr].style.backgroundColor = fundoSeleccionado();
		this.ptr = mod(this.size,this.ptr-2)+1;
		menu[this.ptr].style.backgroundColor = fundoNaoSeleccionado();
	}
	
	this.showMenu = showMenu;
	function showMenu(){			/* Funcao que activa/Abre o menu em HTML*/
		var menu = getElementByID(this.htmlName);
		menu.style.visibility = "visible";
	}
	
	this.hideMenu = hideMenu;
	function hideMenu(){			/* Funcao que só esconde o Menu em HTML. */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		menu = getElementByID(this.htmlName);
		menu.style.visibility = "hidden";
	}
	
	this.resetMenu = resetMenu;
	function resetMenu(){			/* Funcao que Desactiva o Menu/Fecha em HTML. */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		var i;
		for(i = 0; i < menu.length;i++){
			menu[i].style.backgroundColor = fundoSeleccionado();
		}
		this.hideMenu();
	}
	
	this.getSelected = getSelected;
	function getSelected(){
		return menu[this.ptr];
	}
}

/*
##################################
##################################
Objecto MenuRotativo PARA IMAGENS
	- Desde que exista uma ordem 0,1,2,3,4.....,menuSize
##################################
##################################
*/
function MenuRotativo(menuSize,numElementos,nameHtml,Source,End){
	this.source = Source;
	this.end = End;
	this.elementos = numElementos;		//Numero de Elementos 
	this.size = menuSize;				//Tamanho do menu no ecrâ (quantas hipoteses se podem ver)!!!
	this.htmlName = nameHtml;			//Nome do Menu no codigo HTML.
	this.array = new Array();			//Array Auxiliar para controlo de execucao;
	
	var i;
	for(i = 0; i < this.size;i++){		//Inicializacao do Array.
		this.array[i] = i;
	}
	/* Methods */
	this.getSelected = getSelected;
	function getSelected(){			/* Devolve o ITEM que está seleccionado no menu */
		return this.array[Math.floor(this.size/2)];
	}
	
	/* changeType - Usado para alterar o Modelo das Jantes */
	this.changeType = changeType;
	function changeType(type,numMenu){
		var menu = getElementByID(this.htmlName).getElementsByTagName("li")[numMenu].getElementsByTagName("p");
		menu[0].innerHTML = type+1;
	}
	
	this.back = back;
	function back(){
		var i;
		for(i = this.size-1; i >= 0; i--){
			var menu = getElementByID(this.htmlName).getElementsByTagName("li")[i+1].getElementsByTagName("img");
			if(i == 0){
				menu[0].src = this.source +""+mod(this.elementos,this.array[i]-1)+ this.end;
				this.array[i] = mod(this.elementos,this.array[i]-1);
				if(this.htmlName == "alterarJantes")
					this.changeType(this.array[i],i+1);
			}
			else{
				menu[0].src = this.source +""+this.array[i-1]+ this.end;
				this.array[i] = this.array[i-1];
				if(this.htmlName == "alterarJantes")
					this.changeType(this.array[i-1],i+1);
			}
		}
	}
	
	this.next = next;
	function next(){
		var i;
		for(i = 0; i < this.size; i++){
			var menu = getElementByID(this.htmlName).getElementsByTagName("li")[i+1].getElementsByTagName("img");
			if(i == (this.size-1)){
				menu[0].src = this.source +""+mod(this.elementos,this.array[i]+1)+this.end;
				this.array[i] = mod(this.elementos,this.array[i]+1);
				if(this.htmlName == "alterarJantes")
					this.changeType(this.array[i],i+1);
			}
			else{
				menu[0].src = this.source +""+this.array[i+1]+this.end;
				this.array[i] = this.array[i+1];
				if(this.htmlName == "alterarJantes")
					this.changeType(this.array[i+1],i+1);
			}
		}
	}
	
	this.showMenu = showMenu;
	function showMenu(){
		var menu = getElementByID(this.htmlName);
		menu.style.visibility = "visible";
	}
	
	this.resetMenu = resetMenu;
	function resetMenu(){			/*@@@ FIX-ME @@@ */
		menu = getElementByID(this.htmlName);
		menu.style.visibility = "hidden";
		
		menu = getElementByID("janteActual");
		menu.style.visibility = "hidden";
	}
}
/*
##################################
##################################
Objecto MenuRotativo PARA LISTAS
	- Desde que exista uma ordem 0,1,2,3,4.....,menuSize
##################################
##################################
*/
function MenuRotativoListas(menuSize,numElementos,nameHtml,arraydado, sufixo){
	this.elementos = numElementos;		//Numero de Elementos 
	this.size = menuSize;				//Tamanho do menu no ecrâ (quantas hipoteses se podem ver)!!!
	this.htmlName = nameHtml;			//Nome do Menu no codigo HTML.
	this.array = new Array();			//Array Auxiliar para controlo de execucao;
	this.dados = arraydado;
	this.sufixo = sufixo;		//ºC, min, unidades, ml, gramas, pode ser "".
	sufixoToAdd= sufixo;
	
	var i;
	for(i = 0; i < this.size;i++){		//Inicializacao do Array.
		this.array[i] = i;
		getElementByID(this.htmlName).getElementsByTagName("li")[i].innerHTML=this.dados[i]+sufixo;		
	}
	getElementByID(this.htmlName).getElementsByTagName("li")[Math.floor(this.size/2)].style.backgroundColor=fundoNaoSeleccionado();
	/* Methods */
	this.getSelected = getSelected;
	function getSelected(){			/* Devolve o ITEM que está seleccionado no menu */
		return this.dados[this.array[Math.floor(this.size/2)]];
	}
	
	this.next = next;
	function next(){
		var i;
		for(i = 0; i <= this.size-1; i++){
			var menu = getElementByID(this.htmlName).getElementsByTagName("li")[i]
			if(i == this.size-1){
				this.array[i] = mod(this.elementos,this.array[i]+1);
				menu.innerHTML = this.dados[this.array[i]] +sufixo;
			}
			else{
				this.array[i] = this.array[i+1];
				menu.innerHTML = this.dados[this.array[i]] +sufixo;
			}
		}
	}
	
	this.back = back;
	function back(){
		var i;
		for(i = this.size-1; i >=0; i--){
			var menu = getElementByID(this.htmlName).getElementsByTagName("li")[i]
			if(i == 0){
				this.array[i] = mod(this.elementos,this.array[i]-1+this.elementos);
				menu.innerHTML = this.dados[this.array[i]]+sufixo;
			}
			else{
				this.array[i] = this.array[i-1];
				menu.innerHTML = this.dados[this.array[i-1]]+sufixo;
			}
		}
	}
	
	this.showMenu = showMenu;
	function showMenu(){
		var menu = getElementByID(this.htmlName);
		menu.style.visibility = "visible";
	}
	
	this.resetMenu = resetMenu;
	function resetMenu(){			/*@@@ FIX-ME @@@ */
		menu = getElementByID(this.htmlName);
		menu.style.visibility = "hidden";
	}
}

/*
##################################
##################################
Objecto menu para eventos Quick Time
##################################
##################################
*/
function QuickTime(menuSize,nameHtml){	//Construtor
	this.htmlName = nameHtml;		
	this.size = menuSize;

	/*Inicializar o cursor quando se abre o menu */
	var menu = getElementByID(this.htmlName).getElementsByTagName("li");
	menu[0].style.backgroundColor = fundoNaoSeleccionado();
	
	var pos=new Array();
	pos=geraStringPosicao();
	getElementByID(sequencia[teste_passo]).style.top=pos[0];
	getElementByID(sequencia[teste_passo]).style.pos=pos[1];
	teste_registar="off";
	timer_teste=setTimeout(function(){
		getElementByID(sequencia[teste_passo]).style.visibility="visible";
		teste_registar="on";
		getElementByID("teste_passo_tempo").style.visibility="visible";
		timer_teste_decimas=setInterval(function(){decrementaTimerDecimas();},100);
		},3000);
	
	
	this.next = next;
	function next(){	//BAIXO
	if (teste_registar=="off") return;
		clearInterval(timer_teste_decimas);
		if (sequencia[teste_passo]==simbolos[1]){ //acerta
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			if (teste_passo == 2){ passar_teste(); teste_passo=(teste_passo+1)%3; teste_registar=="off"; return;}
			teste_passo=(teste_passo+1)%3;
			var pos=new Array();
			pos=geraStringPosicao();
			getElementByID(sequencia[teste_passo]).style.top=pos[0];
			getElementByID(sequencia[teste_passo]).style.pos=pos[1];
			getElementByID(sequencia[teste_passo]).style.visibility="visible";
			tempo_teste_decimas=TEMPO_CADA_PASSO;
			timer_teste_decimas=setInterval(function(){decrementaTimerDecimas();},100);
		} else { //falha
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			falhar_teste();
		}
	}
	
	this.back = back;
	function back(){	//CIMA		
	if (teste_registar=="off") return;
		clearInterval(timer_teste_decimas);
		if (sequencia[teste_passo]==simbolos[0]){ //acerta
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			if (teste_passo == 2){ passar_teste(); teste_passo=(teste_passo+1)%3; teste_registar=="off"; return; }
			teste_passo=(teste_passo+1)%3;
			var pos=new Array();
			pos=geraStringPosicao();
			getElementByID(sequencia[teste_passo]).style.top=pos[0];
			getElementByID(sequencia[teste_passo]).style.pos=pos[1];
			getElementByID(sequencia[teste_passo]).style.visibility="visible";
			tempo_teste_decimas=TEMPO_CADA_PASSO;
			timer_teste_decimas=setInterval(function(){decrementaTimerDecimas();},100);
		} else { //falha
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			falhar_teste();
		}
	}
	
	this.showMenu = showMenu;
	function showMenu(){			/* Funcao que activa/Abre o menu em HTML*/
		var menu = getElementByID(this.htmlName);
		menu.style.visibility = "visible";
	}
	
	this.hideMenu = hideMenu;
	function hideMenu(){			/* Funcao que só esconde o Menu em HTML. */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		menu = getElementByID(this.htmlName);
		menu.style.visibility = "hidden";
	}
	
	this.resetMenu = resetMenu;
	function resetMenu(){			/* Funcao que Desactiva o Menu/Fecha em HTML. */
		var menu = getElementByID(this.htmlName).getElementsByTagName("li");
		var i;
		for(i = 0; i < menu.length;i++){
			menu[i].style.backgroundColor = fundoSeleccionado();
		}
		this.hideMenu();
	}
	
	this.getSelected = getSelected;
	function getSelected(){
		return menu[this.ptr];
	}
}







/*
##################################
##################################
OK
##################################
##################################
*/

function ok(){
	var menuJs = menus.getActiveMenu();
	//updateAjudas();
	if(menuJs.htmlName == "escondido"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			getElementByID("imagem_funcion").style.visibility="visible";
			getElementByID("indicaComoIniciar").style.visibility="hidden";
			menuJs = new Menu(6,"principal");
			menus.addMenu(menuJs);
		}
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "principal"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			getElementByID("imagem_funcion").src="Images/Icons/carro.png";
			menuJs = new Menu(4,"inicial"); //KITTADO
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			getElementByID("imagem_funcion").src="Images/bimby_pan.png";
			menuJs = new Menu(4,"bimby_main"); //BIMBY
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 3){
			menuJs.hideMenu();
			getElementByID("imagem_funcion").src="Images/Icons/lua.png";
			menuJs = new Menu(3,"sono_main"); //SONOLENCIA
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 5){
			toggleRadio();
		}
		else if(menuJs.ptr == 6){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajuda_principal");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	
/*
##################################
##################################
SONO
##################################
##################################
*/
	else if(menuJs.htmlName == "sono_main"){
		if(menuJs.ptr == 1){
			if(emMovimento) return;
			menuJs.hideMenu();
			readyTesteSono();
			menuJs = new QuickTime(3,"teste");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			menuJs = new Menu(3,"sono_taxi_confirmar");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 3){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudasono_main");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "sono_taxi_confirmar"){
		if(menuJs.ptr == 1){
			retro();
			return;
		}
		if(menuJs.ptr == 2){
			retro();
			getElementByID("a_chamar_taxi").style.visibility="visible";
			setTimeout(function(){getElementByID("a_chamar_taxi").style.visibility="hidden";},2000);
			return;
		}
		else if(menuJs.ptr == 3){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudasono_taxi");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu(menuJs);
	}
	else if (menuJs.htmlName == "teste"){
		if (teste_registar=="off") return;
		clearInterval(timer_teste_decimas);
		if (sequencia[teste_passo]==simbolos[2]){ //acerta
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			if (teste_passo == 2){ passar_teste(); teste_passo=(teste_passo+1)%3; teste_registar=="off"; return;}
			teste_passo=(teste_passo+1)%3;
			var pos=new Array();
			pos=geraStringPosicao();
			getElementByID(sequencia[teste_passo]).style.top=pos[0];
			getElementByID(sequencia[teste_passo]).style.pos=pos[1];
			getElementByID(sequencia[teste_passo]).style.visibility="visible";
			timer_teste_decimas=TEMPO_CADA_PASSO;
			timer_teste_decimas=setInterval(function(){decrementaTimerDecimas();},100);
		} else { //falha
			getElementByID(sequencia[teste_passo]).style.visibility="hidden";
			falhar_teste();
		}
	}
	
/*
##################################
##################################
BIMBY
##################################
##################################
*/
	else if(menuJs.htmlName == "bimby_main"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			menuJs = new Menu(4+bimby_ingredientes_panela.length,"bimby_panela");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			menuJs = new Menu(7,"bimby_tarefa");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 3){
			if (BIMBY_ESTADO=="off"){
				bimbyStart();
			}
			else if(BIMBY_ESTADO=="on"){
				menuJs.hideMenu();
				menuJs= new Menu(2,"bimby_confirma_parar");
				menus.addMenu(menuJs);
				menuJs.showMenu();
			}
			return;
		}
		else if(menuJs.ptr == 4){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudabimby_main");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "bimby_confirma_parar"){
		if(menuJs.ptr == 1){ // não parar
			retro();
			return;
		}
		else if(menuJs.ptr == 2){ // parar
			if(BIMBY_ESTADO=="on"){
				bimbyStop();
			}
			retro();
			return;
		}
	}
			/*panela e ingredientes*/
	else if(menuJs.htmlName == "bimby_panela"){
		if(menuJs.ptr == 1){
			if (bimby_ingredientes_panela.length == MAX_INGREDIENTES) return;
			menuJs.hideMenu();
			menuJs = new Menu(8,"bimby_add");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			if (bimby_ingredientes_panela.length == 0) return;
			menuJs.hideMenu();
			menuJs= new Menu(2,"bimby_confirma_esvaziar");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == menus.menus[INDEX_DA_PANELA_EM_MENUS].size-1){	//saltar para tarefa
			retro();
			baixo();
			ok();
			return;
		}
		else if(menuJs.ptr == menus.menus[INDEX_DA_PANELA_EM_MENUS].size){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudabimby_panela");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		else {
			removerUmIngrediente( menuJs.getSelected().id);
			menuJs.ptr=0;
			menus.menus[INDEX_DA_PANELA_EM_MENUS].size--;
			menuJs.next();
			return;
		}
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "bimby_confirma_esvaziar"){
		if(menuJs.ptr == 1){ // não esvaziar
			retro();
			return;
		}
		else if(menuJs.ptr == 2){  // sim esvaziar
			bimbyEsvaziaIngredientes();
			menus.menus[INDEX_DA_PANELA_EM_MENUS].size=4;
			retro();
			return;
		}
	}
	
	else if(menuJs.htmlName == "bimby_add"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			menuJs = new Menu(5,"bimby_pre_feitos");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			menuJs = new Menu(6,"bimby_carnes");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 3){
			menuJs.hideMenu();
			menuJs = new Menu(4,"bimby_gorduras");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 4){
			menuJs.hideMenu();
			menuJs = new Menu(4,"bimby_leites");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 5){
			menuJs.hideMenu();
			menuJs = new Menu(4,"bimby_massas");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 6){
			menuJs.hideMenu();
			menuJs = new Menu(4,"bimby_temperos");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 7){
			menuJs.hideMenu();
			menuJs = new Menu(6,"bimby_vegetais");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 8){	//AJUDA
			/*menuJs.hideMenu();
			menuJs = new Menu(1,"ajudabimby_ingredientes");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "bimby_carnes" || menuJs.htmlName == "bimby_massas" ){
		ingrediente_a_por = menuJs.getSelected().innerHTML;
		menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", pesos2 ,gramas);
		menus.addMenu(menuJs);
		menuJs.showMenu();
	}	
	else if(menuJs.htmlName == "bimby_vegetais" ){
		ingrediente_a_por = menuJs.getSelected().innerHTML;
		menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", quantidadesN, unidades);
		menus.addMenu(menuJs);
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "bimby_gorduras" ){
		if (menuJs.ptr == 4){			//oleo alimentar
			ingrediente_a_por = menuJs.getSelected().innerHTML;
			menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", quantidades1, ml);
			menus.addMenu(menuJs);
		} else {
			ingrediente_a_por = menuJs.getSelected().innerHTML;
			menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", pesos2, gramas);
			menus.addMenu(menuJs);
		}
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "bimby_leites" ){
		if (menuJs.ptr == 1 || menuJs.ptr == 3 ){ //leite natas
			ingrediente_a_por = menuJs.getSelected().innerHTML;
			menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", quantidades1, ml);
			menus.addMenu(menuJs);
		} else {					//queijo

			ingrediente_a_por = menuJs.getSelected().innerHTML;
			menuJs=new MenuRotativoListas(5, 10,"bimby_quantidades", pesos2, gramas);
			menus.addMenu(menuJs);
		}
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "bimby_temperos" ){
		ingrediente_a_por = menuJs.getSelected().innerHTML;
		sufixo=gramas;
		menuJs=new MenuRotativoListas(5, 5,"bimby_quantidades", pesos1, gramas);
		menus.addMenu(menuJs);
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "bimby_quantidades"){
		bimbyAddIngrediente( ingrediente_a_por , menuJs.getSelected(), sufixoToAdd );
		retro();
		return;
	}
	
	
	/*|| menuJs.htmlName == "bimby_gorduras" || menuJs.htmlName == "bimby_leites" || menuJs.htmlName == "bimby_massas" || menuJs.htmlName == "bimby_temperos" || menuJs.htmlName == "bimby_vegetais" ){
		bimbyAddIngrediente( menuJs.getSelected().innerHTML );
		/*retro();
		retro();*/
		/*menus.menus[INDEX_DA_PANELA_EM_MENUS].size++;*/
	/*}*/
	else if(menuJs.htmlName == "bimby_pre_feitos"){
		if(menuJs.ptr ==1){ //carbonara
			bimbyAddIngrediente( "Fusilli" ,500,gramas);
			bimbyAddIngrediente( "Natas" ,250,ml);
			bimbyAddIngrediente( "Porco" ,250,gramas);
			bimbyAddIngrediente( "Pimenta" ,20,gramas);
			bimbyAddIngrediente( "Manteiga" ,25,gramas);
		}
		else if(menuJs.ptr ==2){ //empadao
			bimbyAddIngrediente( "Vaca" , 250,gramas);
			bimbyAddIngrediente( "Batata" , 2,unidades);
			bimbyAddIngrediente( "Leite" , 250,ml);
			bimbyAddIngrediente( "Manteiga", 25,gramas);
			bimbyAddIngrediente( "Tomate",1,unidades);
		}
		else if(menuJs.ptr ==3){ //bolohnesa
			bimbyAddIngrediente( "Vaca",250,gramas);
			bimbyAddIngrediente( "Esparguete",500,gramas);
			bimbyAddIngrediente( "Tomate", 2,gramas);
			bimbyAddIngrediente( "Parmesão", 50, gramas);
			bimbyAddIngrediente( "Rosmaninho", 10,gramas);
		}
		else if(menuJs.ptr ==4){ //fondue
			bimbyAddIngrediente( "Porco",250,gramas);
			bimbyAddIngrediente( "Vaca",250,gramas);
			bimbyAddIngrediente( "Óleo",100,ml);
			bimbyAddIngrediente( "Pimenta",10,gramas);
		}
		else if(menuJs.ptr ==5){ //sopa
			bimbyAddIngrediente( "Abóbora" ,1,unidades);
			bimbyAddIngrediente( "Batata" ,4,unidades);
			bimbyAddIngrediente( "Cenoura" ,2,unidades);
			bimbyAddIngrediente( "Couve" ,1,unidades);
			bimbyAddIngrediente( "Nabo" ,2,unidades);
		}
		retro();
		retro();
		return;
	}	
	/*-------------------------------*/
	else if(menuJs.htmlName == "bimby_tarefa"){
		if(menuJs.ptr ==1){
			menuJs.hideMenu();
			menuJs= new Menu(3,"bimby_funcao");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr ==2){
			menuJs.hideMenu();
			menuJs= new Menu(4,"bimby_velocidade");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr ==3){
			//menuJs.hideMenu();
			menuJs=new MenuRotativoListas(5,9,"bimby_temperatura",temperaturas,graus);
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr ==4){
			//menuJs.hideMenu();
			menuJs=new MenuRotativoListas(5,14,"bimby_tempo",tempos,segundos);
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr ==5){
			if (BIMBY_ESTADO=="off"){
				bimbyStart();
			}
			else if(BIMBY_ESTADO=="on"){
				menuJs.hideMenu();
				menuJs= new Menu(2,"bimby_confirma_parar");
				menus.addMenu(menuJs);
				menuJs.showMenu();
			}
			return;
		}
		else if(menuJs.ptr ==6){	//jump to ingredientes
			retro();
			cima();
			ok(); 
			return;
		}
		else if(menuJs.ptr ==7){	//AJUDA
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudabimby_tarefa");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "bimby_funcao"){
		if(menuJs.ptr == 3){		//AJUDA
			/*menuJs.hideMenu();
			menuJs = new Menu(1,"ajudabimby_funcao");
			menus.addMenu(menuJs);
			menuJs.showMenu();*/
			toggleAjudas();
		}
		else{
			bimbySetFuncao( menuJs.getSelected().innerHTML );
			retro();
		}
	}
	else if(menuJs.htmlName == "bimby_velocidade"){
		if(menuJs.ptr == 4){		//AJUDA
			/*menuJs.hideMenu();
			menuJs = new Menu(1,"ajudabimby_velocidade");
			menus.addMenu(menuJs);
			menuJs.showMenu();*/
			toggleAjudas();
		}
		else{
			bimbySetVelocidade( menuJs.getSelected().innerHTML );
			retro();
		}
	}
	else if(menuJs.htmlName == "bimby_temperatura"){		
		bimbySetTemperatura( parseInt( menuJs.getSelected() ) );
		retro();
	}
	else if(menuJs.htmlName == "bimby_tempo"){		
		bimbySetTempo( parseInt( menuJs.getSelected() ) );
		retro();
	}
	
	
/*
##################################
##################################
KITTADO
##################################
##################################
*/	else if(menuJs.htmlName == "alterarSuspensao"){
		var memory;
		if(menuJs.ptr == 1){
			memory = "Conforto";
		}
		else if(menuJs.ptr == 2){
			memory = "Desportivo";
		}
		else if(menuJs.ptr == 3){
			memory = "Normal";
		}
		else if(menuJs.ptr == 4){
			memory = "Todo o Terreno";
		}
		if(menuJs.ptr < 5){
			getElementByID("suspensao").innerHTML = "Modo: " + memory + '<img class="icon" src="Images/Icons/Suspensao.png">';
		}
		else if(menuJs.ptr == 5){  //ajuda
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudakittado_susp");
			menus.addMenu(menuJs);
			menuJs.showMenu();*/
			toggleAjudas();
		}
	}
	else if(menuJs.htmlName == "inicial"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			menuJs = new Menu(5,"alterarCores");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			menuJs = new MenuRotativo(3,NUM_JANTES,"alterarJantes",JANTES_SOURCE,IMAGES_EXTENSION);
			menus.addMenu(menuJs);
			menuHtml = getElementByID("janteActual");
			menuHtml.style.visibility = "visible";
		}
		else if(menuJs.ptr == 3){
			menuJs.hideMenu();
			menuJs = new Menu(5,"alterarSuspensao");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 4){  //ajuda
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudakittado_main");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	else if(menuJs.htmlName == "alterarCores"){
		if(menuJs.ptr == 1){
			menuJs.hideMenu();
			menuJs = new Menu(6,"coresExterior");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 2){
			menuJs.hideMenu();
			menuJs = new Menu(6,"coresInterior");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 3){
			menuJs.hideMenu();
			menuJs = new Menu(6,"coresJantes");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 4){
			menuJs.hideMenu();
			menuJs = new Menu(5,"coresFavoritas");
			menus.addMenu(menuJs);
		}
		else if(menuJs.ptr == 5){		// Ajuda deste Menu
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudakittado_cores");
			menus.addMenu(menuJs);*/
			toggleAjudas();
		}
		menuJs.showMenu();
	}
	
	else if(menuJs.htmlName == "alterarSuspensao"){
		if(menuJs.ptr ==5){ 		//ajuda
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudakittado_susp");
			menus.addMenu(menuJs);
			menuJs.showMenu();*/
			toggleAjudas();
		}
	}
	/* Alterar Jantes */
	else if(menuJs.htmlName == "alterarJantes"){
		var janteActual = getElementByID("janteActualImg");
		janteActual.src = JANTES_SOURCE + menuJs.getSelected()+ IMAGES_EXTENSION;
	}
	/* Alterar Cores Favoritas */
	else if(menuJs.htmlName == "coresFavoritas"){
		if(menuJs.ptr == 5){		//Ajuda deste Menu
			/*menuJs.hideMenu();
			menuJs= new Menu(1,"ajudakittado_favo");
			menus.addMenu(menuJs);
			menuJs.showMenu();*/
			toggleAjudas();
		}
		else{
			var ptr = menuJs.ptr;
			menuJs = new MenuRotativo(3,NUM_CORES,"escolherCores",CORES_SOURCE,IMAGES_EXTENSION);
			menus.addMenu(menuJs);
			menuJs.showMenu();
			menuJs = document.getElementById("escolherCores");
			menuJs.value = "" + ptr;
		}
	}
	/* Editar uma cor das cores favoritas. NOTA: Menu sem Ajuda de propósito. */
	else if(menuJs.htmlName == "escolherCores"){
		var inteiro = parseInt(getElementByID("escolherCores").value);	// Value diz qual a cor favorita a alterar */
		var menu = document.getElementById("coresFavoritas").getElementsByTagName("li")[inteiro].getElementsByTagName("img");
		menu[0].src = CORES_SOURCE + menuJs.getSelected() + IMAGES_EXTENSION;
		menu = document.getElementById("coresInterior").getElementsByTagName("li")[inteiro].getElementsByTagName("img");
		menu[0].src = CORES_SOURCE + menuJs.getSelected() + IMAGES_EXTENSION;
		menu = document.getElementById("coresExterior").getElementsByTagName("li")[inteiro].getElementsByTagName("img");
		menu[0].src = CORES_SOURCE + menuJs.getSelected() + IMAGES_EXTENSION;
		menu = document.getElementById("coresJantes").getElementsByTagName("li")[inteiro].getElementsByTagName("img");
		menu[0].src = CORES_SOURCE + menuJs.getSelected() + IMAGES_EXTENSION;
		setColor(inteiro,menuJs.getSelected());
		retro();
		return;
	}
	else if(menuJs.htmlName == "coresExterior" || menuJs.htmlName == "coresInterior" || menuJs.htmlName == "coresJantes"){
		if(menuJs.ptr < 5){
			var novaCor = getElementByID(menuJs.htmlName + "Actual");
			novaCor.src = CORES_SOURCE + getColor(menuJs.ptr) + IMAGES_EXTENSION;
			if(menuJs.htmlName == "coresInterior" && DIA_OU_NOITE == "dia"){
				document.body.style.backgroundImage="url('Images/cockpit_dia_x3_cor"+getColor(menuJs.ptr)+".png')";
				FUNDO_DIA_ACTUAL = getColor(menuJs.ptr);
			}
			else if(DIA_OU_NOITE == "noite")
				FUNDO_DIA_ACTUAL = getColor(menuJs.ptr);
		}
		else if(menuJs.ptr == 5){		
			if(menuJs.htmlName == "coresExterior")
				escolherCor = 1;
			else if(menuJs.htmlName == "coresInterior")
				escolherCor = 2;
			else if(menuJs.htmlName == "coresJantes")
				escolherCor = 3;
			menuJs = new MenuRotativo(3,NUM_CORES,"escolherCores2",CORES_SOURCE,IMAGES_EXTENSION);
			menus.addMenu(menuJs);
			menuJs.showMenu();	
		}
		else if(menuJs.ptr = 6){		//Ajuda deste Menu.
			toggleAjudas();
		}
	}
	else if(menuJs.htmlName == "escolherCores2"){		//Escolher Cores diretamente sem passar pelas favoritas.
		var menu;
		if(escolherCor == 1){
			menu = getElementByID("coresExteriorActual");
		}
		else if(escolherCor == 2){
			menu = getElementByID("coresInteriorActual");
			if(DIA_OU_NOITE == "dia"){
				document.body.style.backgroundImage="url('Images/cockpit_dia_x3_cor"+menuJs.getSelected()+".png')";
				FUNDO_DIA_ACTUAL = menuJs.getSelected();
			}
			else if(DIA_OU_NOITE == "noite"){
				FUNDO_DIA_ACTUAL = menuJs.getSelected();
			}
		}
		else if(escolherCor == 3){
			menu = getElementByID("coresJantesActual");
		}
		menu.src = CORES_SOURCE + menuJs.getSelected() + IMAGES_EXTENSION;
		retro();
	}
}



/*
##################################
##################################
BACK Button
##################################
##################################
*/
function retro(){
	menus.removeMenu();
	
	// para cancelar o teste de sono:
	getElementByID("teste_passo_tempo").style.visibility="hidden";
	getElementByID("teste_tempo_restante").style.visibility="hidden";
	getElementByID("teste_direita").style.visibility="hidden";
	getElementByID("teste_baixo").style.visibility="hidden";
	getElementByID("teste_cima").style.visibility="hidden";
	clearTimeout(timer_teste);
	clearTimeout(timer_ready1);
	clearTimeout(timer_ready2);
	clearTimeout(timer_ready3);
	clearTimeout(timer_ready4);
	clearInterval(timer_teste_decimas);
	getElementByID("sono_tempo_comecar").innerHTML=" 3";
	
	// actualizar o ícone da funcionalidade actual
	if (menus.menus.length == 2){
		getElementByID("imagem_funcion").src="Images/Icons/icon_kitt.png";
	}
	if (menus.menus.length ==1){
		getElementByID("imagem_funcion").style.visibility="hidden";
		getElementByID("indicaComoIniciar").style.visibility="visible";
		// manter o menu escondido bem escondido
		getElementByID("escondido").style.visibility="hidden";
	}
	updateAjudas();
}


/*
##################################
##################################
UP Button
##################################
##################################
*/
function cima(){
	menus.getActiveMenu().back();
}
/*
##################################
##################################
DOWN Button
##################################
##################################
*/
function baixo(){
	menus.getActiveMenu().next();
}





/*
##################################
##################################
FUNÇÕES
##################################
##################################
*/




/*
##################################
##################################
KITTADO
##################################
##################################
*/

var cor1 = 0;
var cor2 = 1;
var cor3 = 2
var cor4 = 3;
function getColor(inteiro){
	if(inteiro == 1)
		return cor1;
	else if(inteiro == 2)
		return cor2;
	else if(inteiro == 3)
		return cor3;
	else if(inteiro == 4)
		return cor4;
}
function setColor(inteiro,value){
	if(inteiro == 1)
		cor1 = value;
	else if(inteiro == 2)
		cor2 = value;
	else if(inteiro == 3)
		cor3 = value;
	else if(inteiro == 4)
		cor4 = value;
}






/*
##################################
##################################
SONO
##################################
##################################
*/
function readyTesteSono(){
	sequencia[0]= simbolos[Math.floor(Math.random()*3)];
	sequencia[1]= simbolos[Math.floor(Math.random()*3)];
	sequencia[2]= simbolos[Math.floor(Math.random()*3)];
	timer_ready1=setTimeout(function(){getElementByID("sono_tempo_comecar").innerHTML=" 2";},1000);
	timer_ready2=setTimeout(function(){getElementByID("sono_tempo_comecar").innerHTML=" 1";},2000);
	timer_ready3=setTimeout(function(){getElementByID("sono_tempo_comecar").innerHTML=" 3";},3000);
	timer_ready4=setTimeout(function(){getElementByID("teste").style.visibility="hidden";},3000);
	tempo_teste_decimas=TEMPO_CADA_PASSO;
}
function geraStringPosicao(){
	var pos = new Array();
	var x = (Math.floor(Math.random()*40)+20)+"%";
	var y = (Math.floor(Math.random()*40)+10)+"%";
	pos[0]=x;
	pos[1]=y;
	return pos;
}
function passar_teste(){
	getElementByID("teste_passado").style.visibility="visible";
	setTimeout(function(){ getElementByID("teste_passado").style.visibility="hidden";},3000);
	getElementByID("teste_direita").style.visibility="hidden";
	getElementByID("teste_baixo").style.visibility="hidden";
	getElementByID("teste_cima").style.visibility="hidden";
	tempo_teste_decimas=TEMPO_CADA_PASSO;
	getElementByID("teste_passo_tempo").style.visibility="hidden";
	retro();
}
function falhar_teste(){
	getElementByID("teste_falhado").style.visibility="visible";
	setTimeout(function(){ getElementByID("teste_falhado").style.visibility="hidden";},3000);
	getElementByID("teste_direita").style.visibility="hidden";
	getElementByID("teste_baixo").style.visibility="hidden";
	getElementByID("teste_cima").style.visibility="hidden";
	clearInterval(timer_teste_decimas);
	teste_passo = 0;
	tempo_teste_decimas=TEMPO_CADA_PASSO;
	teste_registar=="off"
	getElementByID("teste_passo_tempo").style.visibility="hidden";
	retro();
	baixo();
	ok();
}
function decrementaTimerDecimas(){
	tempo_teste_decimas=tempo_teste_decimas-1;
	if (tempo_teste_decimas==0){ falhar_teste(); tempo_teste_decimas=TEMPO_CADA_PASSO;}
	getElementByID("teste_passo_tempo").innerHTML=stringTempoDecimas();
}
function stringTempoDecimas(){
	var string;
	string=" "+Math.floor(tempo_teste_decimas/10)+","+Math.floor(tempo_teste_decimas%10);
	return string;
}






/*
##################################
##################################
BIMBY
##################################
##################################
*/
function bimbyStart(){
	BIMBY_ESTADO="on";
	var botao=getElementByID("iniciar_botao");
	var botao2=getElementByID("iniciar_botao2");
	botao2.innerHTML="Parar";
	botao.innerHTML="Parar";
	getElementByID("relogio_digital_numero").innerHTML=stringTempo()
	getElementByID("bimby_terminado").style.visibility="hidden";
	getElementByID("relogio_digital").style.visibility="visible";
	getElementByID("ainiciar_botao").src="Images/bimby_stop.png";
	getElementByID("ainiciar_botao2").src="Images/bimby_stop.png";
	timerBimbyCozinhar = setInterval(function(){decrementaTempo();},1000);
}
function decrementaTempo(){
	if (tempoBimbyCozinhar==0) bimbyStop();
	tempoBimbyCozinhar--;
	getElementByID("relogio_digital_numero").innerHTML=stringTempo();
}	
function bimbyStop(){
	clearInterval(timerBimbyCozinhar);
	BIMBY_ESTADO="off";
	tempoBimbyCozinhar=TAREFA_TEMPO;
	var botao=getElementByID("iniciar_botao");
	var botao2=getElementByID("iniciar_botao2");
	botao2.innerHTML="Iniciar";
	botao.innerHTML="Iniciar";
	getElementByID("relogio_digital").style.visibility="hidden";
	getElementByID("bimby_terminado").style.visibility="visible";
	getElementByID("ainiciar_botao").src="Images/bimby_start.png";
	getElementByID("ainiciar_botao2").src="Images/bimby_start.png";
	setTimeout(function(){getElementByID("bimby_terminado").style.visibility="hidden";},2000);
}	
function bimbyAddIngrediente( nome_ingred, quantidade , sufixo){
	/*quantidade=5;*/
	var indexSeExiste=bimby_ingredientes_panela.indexOf(nome_ingred);
	if (indexSeExiste != -1){
		var node = getElementByID(nome_ingred);
		var novaquant = parseInt(node.getElementsByTagName("p")[0].innerHTML);
		novaquant += quantidade;
		node.getElementsByTagName("p")[0].innerHTML=novaquant+sufixo;
		return;
	}
	menus.menus[INDEX_DA_PANELA_EM_MENUS].size++;
	bimby_ingredientes_panela.push(nome_ingred);/*"ingrediente_na_panela"+indice_ingred_static);*/
	if(bimby_ingredientes_panela.length==MAX_INGREDIENTES){
		getElementByID("botao_add_ingred").innerHTML="Panela cheia";
	}
	var panela=getElementByID("bimby_panela");
	var novo_ingred_html=document.createElement("li");
	novo_ingred_html.innerHTML=nome_ingred;
	novo_ingred_html.setAttribute("id", nome_ingred);/*"ingrediente_na_panela" + indice_ingred_static );*/
	var nova_quantidade=document.createElement("p");
	nova_quantidade.innerHTML=""+quantidade+sufixo;
	nova_quantidade.style.display="inline";
	nova_quantidade.style.position="absolute";
	nova_quantidade.style.right="5pt";
	novo_ingred_html.appendChild(nova_quantidade);
	/*indice_ingred_static++;*/
	var inserir_antes_disto=getElementByID("bimby_atalho_tarefa");
	panela.insertBefore(novo_ingred_html,inserir_antes_disto);
	
	
	/* Adicionar a cruz de apagar ingrediente */
	var nova_cruz=document.createElement("img");
	nova_cruz.setAttribute("src", "Images/Icons/bimby_remove.png");
	nova_cruz.setAttribute("class", "icon");
	novo_ingred_html.appendChild(nova_cruz);
	/*--*/
	getElementByID("botao_esvazia_ingred").innerHTML="Esvaziar panela";
	getElementByID("panela_vazia").style.display="none";
	getElementByID("panela_vazia2").style.display="none";
	getElementByID("bimby_ingred_adicionado").style.visibility="visible";
	setTimeout(function(){getElementByID("bimby_ingred_adicionado").style.visibility="hidden";},1500);
}
function bimbyEsvaziaIngredientes(){
	var panela=getElementByID("bimby_panela");
	var max=bimby_ingredientes_panela.length;
	var ingred;
	for(var i=max-1; i>=0; i--){
		ingred=bimby_ingredientes_panela[i];
		panela.removeChild( getElementByID(ingred));
		bimby_ingredientes_panela.pop();
	}
	getElementByID("botao_esvazia_ingred").innerHTML="Panela vazia";
	getElementByID("botao_add_ingred").innerHTML="Adicionar";
	getElementByID("panela_vazia").style.display="inline";
	getElementByID("panela_vazia2").style.display="inline";
}
function removerUmIngrediente( nome_ingred ){//indicemaistres ){
	var indice=bimby_ingredientes_panela.indexOf( nome_ingred );
	bimby_ingredientes_panela.splice(indice, 1);
	var panela=getElementByID("bimby_panela");
	panela.removeChild( getElementByID(nome_ingred) );
	if(bimby_ingredientes_panela.length==0){
		getElementByID("botao_esvazia_ingred").innerHTML="Panela vazia";
		getElementByID("panela_vazia").style.display="inline";
		getElementByID("panela_vazia2").style.display="inline";
	}
}
function bimbySetFuncao( funcao ){
	TAREFA_FUNCAO=funcao;
	getElementByID("funcao_preview").innerHTML=funcao;
}
function bimbySetVelocidade( velocidade ){
	TAREFA_VELOCIDADE=velocidade;
	getElementByID("velocidade_preview").innerHTML=velocidade;
}
function bimbySetTemperatura( temperatura ){
	TAREFA_TEMPERATURA=parseInt(temperatura);
	getElementByID("temperatura_preview").innerHTML=temperatura+"ºC";
}
function bimbySetTempo( tempo ){
	TAREFA_TEMPO=parseInt(tempo);
	tempoBimbyCozinhar=parseInt(tempo);
	getElementByID("tempo_preview").innerHTML=stringTempo();
	getElementByID("relogio_digital_numero").innerHTML=stringTempo();
}
function stringTempo(){
	var string;
	var horas=parseInt(Math.floor(tempoBimbyCozinhar/60));
	var minutos=parseInt(Math.floor(tempoBimbyCozinhar%60));
	if (minutos<10) minutos="0"+minutos;
	string = horas+"h"+minutos+"m";
	return string;
}