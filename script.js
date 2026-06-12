// Troque esta data pela data em que vocês começaram.
// Formato: ano, mês-1, dia, hora, minuto
const dataInicio = new Date(2019, 1, 19, 14, 00);

function atualizarContador() {
  const agora = new Date();
  let anos = agora.getFullYear() - dataInicio.getFullYear();
  let meses = agora.getMonth() - dataInicio.getMonth();
  let dias = agora.getDate() - dataInicio.getDate();
  let horas = agora.getHours() - dataInicio.getHours();
  let minutos = agora.getMinutes() - dataInicio.getMinutes();

  if (minutos < 0) { minutos += 60; horas--; }
  if (horas < 0) { horas += 24; dias--; }
  if (dias < 0) {
    const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
    dias += ultimoMes;
    meses--;
  }
  if (meses < 0) { meses += 12; anos--; }

  document.getElementById('anos').textContent = anos;
  document.getElementById('meses').textContent = meses;
  document.getElementById('dias').textContent = dias;
  document.getElementById('horas').textContent = horas;
  document.getElementById('minutos').textContent = minutos;
}

atualizarContador();
setInterval(atualizarContador, 60000);

function criarCoracao() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.animationDuration = 5 + Math.random() * 5 + 's';
  heart.style.fontSize = 12 + Math.random() * 24 + 'px';
  document.getElementById('hearts').appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(criarCoracao, 700);

// Mini player: mantém a posição da música se a página for recarregada.
const audioPlayer = document.getElementById('audioPlayer');
const playHistoria = document.getElementById('playHistoria');

if (audioPlayer) {
  const tempoSalvo = localStorage.getItem('tempoNossaMusica');

  audioPlayer.addEventListener('loadedmetadata', () => {
    if (tempoSalvo && !Number.isNaN(Number(tempoSalvo))) {
      audioPlayer.currentTime = Number(tempoSalvo);
    }
  });

  audioPlayer.addEventListener('timeupdate', () => {
    localStorage.setItem('tempoNossaMusica', audioPlayer.currentTime);
  });
}

if (playHistoria && audioPlayer) {
  playHistoria.addEventListener('click', async () => {
    try {
      await audioPlayer.play();
    } catch (error) {
      console.log('O navegador bloqueou o play automático.');
    }

    const historia = document.getElementById('historia');
    if (historia) {
      historia.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Galeria randômica sem repetição.
// Coloque suas fotos em assets/fotos e adicione os nomes abaixo.
const fotos = [
  'assets/fotos/foto1.jpg',
  'assets/fotos/foto2.jpg',
  'assets/fotos/foto3.jpg',
  'assets/fotos/foto4.jpg',
  'assets/fotos/foto5.jpg',
  'assets/fotos/foto6.jpg',
  'assets/fotos/foto7.jpg',
  'assets/fotos/foto8.jpg',
  'assets/fotos/foto9.jpg',
  'assets/fotos/foto10.jpg',
  'assets/fotos/foto11.jpg',
  'assets/fotos/foto12.jpg',
  'assets/fotos/foto13.jpg',
  'assets/fotos/foto14.jpg',
  'assets/fotos/foto15.jpg',
  'assets/fotos/foto16.jpg',
  'assets/fotos/foto17.jpg',
  'assets/fotos/foto18.jpg',
  'assets/fotos/foto19.jpg',
  'assets/fotos/foto20.jpg',
  'assets/fotos/foto21.jpg',
  'assets/fotos/foto22.jpg',
  'assets/fotos/foto23.jpg',
  'assets/fotos/foto24.jpg',
  'assets/fotos/foto25.jpg',
  'assets/fotos/foto26.jpg'
];
  
const galeria = document.getElementById('galeriaRandomica');
const contadorGaleria = document.getElementById('contadorGaleria');
const modalFoto = document.getElementById('modalFoto');
const fotoAmpliada = document.getElementById('fotoAmpliada');
const fecharModal = document.getElementById('fecharModal');

let filaFotos = [];
let exibidas = 0;

function embaralharFotos(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function renovarFila() {
  filaFotos = embaralharFotos(fotos);
}

function proximasFotos(quantidade = 3) {
  if (filaFotos.length < quantidade) {
    renovarFila();
  }

  const selecionadas = filaFotos.splice(0, quantidade);
  exibidas += selecionadas.length;

  if (exibidas > fotos.length) {
    exibidas = selecionadas.length;
  }

  return selecionadas;
}

function mostrarFotosRandomicas() {
  if (!galeria) return;

  const selecionadas = proximasFotos(3);
  galeria.innerHTML = '';

  selecionadas.forEach((foto) => {
    const img = document.createElement('img');
    img.src = foto;
    img.alt = 'Foto do casal';
    img.loading = 'lazy';

    img.onerror = function () {
      this.src = 'assets/placeholder.svg';
      this.style.cursor = 'default';
    };

    img.addEventListener('click', () => {
      if (img.src.includes('placeholder.svg')) return;
      fotoAmpliada.src = foto;
      modalFoto.classList.add('ativo');
      modalFoto.setAttribute('aria-hidden', 'false');
    });

    galeria.appendChild(img);
  });

  if (contadorGaleria) {
    contadorGaleria.textContent = `Fotos ${Math.min(exibidas, fotos.length)} de ${fotos.length}`;
  }
}

if (galeria) {
  renovarFila();
  mostrarFotosRandomicas();
  setInterval(mostrarFotosRandomicas, 5000);
}

if (fecharModal) {
  fecharModal.addEventListener('click', () => {
    modalFoto.classList.remove('ativo');
    modalFoto.setAttribute('aria-hidden', 'true');
  });
}

if (modalFoto) {
  modalFoto.addEventListener('click', (event) => {
    if (event.target === modalFoto) {
      modalFoto.classList.remove('ativo');
      modalFoto.setAttribute('aria-hidden', 'true');
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalFoto) {
    modalFoto.classList.remove('ativo');
    modalFoto.setAttribute('aria-hidden', 'true');
  }
});

// Mensagem surpresa final.
const abrirSurpresa = document.getElementById('abrirSurpresa');
const mensagemSurpresa = document.getElementById('mensagemSurpresa');

if (abrirSurpresa && mensagemSurpresa) {
  abrirSurpresa.addEventListener('click', () => {
    mensagemSurpresa.classList.toggle('ativo');
    const estaAberta = mensagemSurpresa.classList.contains('ativo');
    mensagemSurpresa.setAttribute('aria-hidden', String(!estaAberta));
    abrirSurpresa.textContent = estaAberta ? 'Guardar mensagem' : 'Clique aqui';
  });
}
