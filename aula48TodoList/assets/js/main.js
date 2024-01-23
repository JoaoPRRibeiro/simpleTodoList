const inputTarefa = document.querySelector(`.input-tarefa`);
const btnTarefa = document.querySelector(`.btn-tarefa`);
const tarefas = document.querySelector(`.tarefas`);

function criaLi(params) {
  const li = document.createElement('li')
  return li
}

inputTarefa.addEventListener('keypress', function (e) {
  if(e.keyCode === 13) {
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value)
  }
})

function limpaInput() {
  inputTarefa.value = ''
  inputTarefa.focus()
}

function criaBotaoApagar(li) {
  li.innerText += ' '
  const botaoApagar = document.createElement('button')
  botaoApagar.innerText = 'Apagar'
  botaoApagar.setAttribute('class', 'apagar')
  botaoApagar.setAttribute('title', 'apagar essa tarefa')
  li.appendChild(botaoApagar)
}

function criaTarefa(textoInput) {
  const li = criaLi();
  li.innerText = textoInput;
  tarefas.appendChild(li)
  criaBotaoApagar(li)
  limpaInput()
  salvarTarefas()
}

btnTarefa.addEventListener('click', function (e) {
  if(!inputTarefa.value) return;
  criaTarefa(inputTarefa.value)
})

document.addEventListener('click', function(e) {
  const el = e.target
  
  if (el.classList.contains('apagar')) {
    el.parentElement.remove();
    salvarTarefas()
  }
})

function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li')
  const listaDeTarefas = []

  for(let tarefa of liTarefas){
    let tarefaTexto = tarefa.innerText
    tarefaTexto = tarefaTexto.replace('Apagar', '').trim()//O método trim() retorna o texto sem espaços em branco no início e/ou fim da string.
    listaDeTarefas.push(tarefaTexto)
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas)//SALVANDO JSON COMO STRING PARA PODER TRANSFORMAR EM DADOS DNV DPS
  localStorage.setItem('tarefas', tarefasJSON)//SALVANDO TAREFAS NO LOCALSTORAGE
}

function adicionaTarefasSalvas() { //PEGA AS INFORMACOES SALVAS DO JSON E TRANSFORMA EM CONTEUDO DA PAGINA NOVAMENTE
  const tarefas = localStorage.getItem('tarefas')
  const listaDeTarefas = JSON.parse(tarefas);

  for(let tarefa of listaDeTarefas){
    criaTarefa(tarefa)
  }
}
adicionaTarefasSalvas()
