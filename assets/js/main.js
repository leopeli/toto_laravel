let ulTarefas = document.querySelector('#aFazer')
let formulario = document.querySelector('form')
let input = document.querySelector('input')

const listarTarefas = (elementoHtml) => {
    fetch('http://localhost:8000/api/listar-tarefas')
        .then(resposta => resposta.json())
        .then(dados => {
            let html =''
            dados.forEach(dado => {
                html += `
                    <li class="list-group-item d-flex">
                        <span>${dado.conteudo}</span>
                        <div class="ml-auto">
                            <a id="ConcluirTarefa" tarefa-id=${dado.id} href="#">
                                <i title="Concluir tarefa" class="material-icons">done</i>
                            </a>
                            <a id="deletarTarefa" tarefa-id=${dado.id} href="#">
                                <i title="Deletar tarefa" class="material-icons">delete</i>
                            </a>
                        </div>
                    </li>
                `
            })
            elementoHtml.innerHTML = html
        })
}

listarTarefas(ulTarefas)

formulario.onsubmit = (evento) => {
    evento.preventDefault()
    adicionarTarefa(input.value)
    listarTarefas(ulTarefas)
}

const adicionarTarefa = (tarefa) => {
	let dados = new FormData()
    dados.append('conteudo', tarefa)
    input.value = ''
		

	fetch('http://localhost:8000/api/adicionar-tarefa', {
		method: 'post',
		body: dados
	}).then(resposta => resposta.json()).then(dados =console.log(dados)) 
}
