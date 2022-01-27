//0 vermelho
//1 verde
//2 azul
//3 amarelo

let nivel = 0;
const niveis = [3,4,5,6];
let [vermelho, verde, azul, amarelo] = ['vermelho', 'verde', 'azul', 'amarelo'];
let cores = [vermelho, verde, azul, amarelo];
let ordemAleatoria = [];
let tempoDaPiscada = 500;
let ordemUsuario = [];

//sortear ordem das cores
const sorteioCores = () => {
    ordemAleatoria = [];
    ordemUsuario = [];
    for(let i = 0; i < niveis[nivel]; i++){
        ordemAleatoria.push(parseInt(Math.random()*4));
    }

    for(let i in ordemAleatoria){
        let time = i*tempoDaPiscada;
        setTimeout(() =>{
            acenderCor(ordemAleatoria[i]);
        }, time);
    }
}

const getCor = (index) => {
    let elementoSelecionado;
  
    if(cores[index] == vermelho || index == vermelho)
        elementoSelecionado = elementoVermelho;
    else if(cores[index] == verde || index == verde)
        elementoSelecionado = elementoVerde;
    else if(cores[index] == amarelo || index == amarelo)
        elementoSelecionado = elementoAmarelo;
    else if(cores[index] == azul || index == azul)
        elementoSelecionado = elementoAzul;
    
    return elementoSelecionado;
}

const acenderCor = (index) => {
    let elementoSelecionado = getCor(index);
    
    elementoSelecionado.classList.add('opacidade');

    setTimeout(() => {
        elementoSelecionado.classList.remove('opacidade');
    }, (tempoDaPiscada/2));
}

const checkOrdem = () => {
    let isGanhou = true;
    for(let i in ordemAleatoria){
        if(ordemUsuario[i] != ordemAleatoria[i]){
            isGanhou = false;
            alert("Você perdeu!")
            resetNivel();
            break;
        }
    }
    if(isGanhou){
        nivel++;
        if(nivel < niveis.length){
            alert('Você acertou!!\nClique em OK para ir ao próximo nível');
            setNivel();
        }else{
            alert('Não há mais níveis');
            resetNivel();
        }
    }
}

const click = (element) => {
    element = element.target;
    let cor = cores.indexOf(element.classList[0]);
    
    ordemUsuario.push(cor);

    element.classList.add('opacidade');

    setTimeout(() => {
        element.classList.remove('opacidade');
    }, tempoDaPiscada);
}

const setNivel = () => {
    document.querySelector('#nivel').textContent = nivel+1;
}

const resetNivel = () => {
    nivel = 0;
    setNivel();
}

setNivel();

const elementoVermelho = document.querySelector('.vermelho');
elementoVermelho.addEventListener('click', click, this);

const elementoVerde = document.querySelector('.verde');
elementoVerde.addEventListener('click', click, this);

const elementoAmarelo = document.querySelector('.amarelo');
elementoAmarelo.addEventListener('click', click, this);

const elementoAzul = document.querySelector('.azul');
elementoAzul.addEventListener('click', click, this);

document.querySelector('.botao-iniciar').addEventListener('click', sorteioCores);
document.querySelector('.botao-check').addEventListener('click', checkOrdem);
document.querySelector('.botao-reset').addEventListener('click', resetNivel);