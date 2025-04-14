document.addEventListener("DOMContentLoaded", () => {
    const inputTarefa = document.querySelector('input');
    const lista = document.querySelector('.tarefas');
  
    let tarefas = [];
  
    function adicionarTarefa(texto) {
      if (texto.trim()) {
        tarefas.push({ texto, feita: false });
        renderizarTarefas();
      }
    }
  
    function renderizarTarefas() {
      lista.innerHTML = '';
      tarefas.forEach((tarefa, i) => {
        const item = document.createElement('div');
        item.className = 'tarefa';
  
        const label = document.createElement('label');
        if (tarefa.feita) label.classList.add('checked');
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarefa.feita;
  
        const span = document.createElement('span');
        span.textContent = tarefa.texto;
  
        checkbox.addEventListener('change', () => {
          tarefa.feita = checkbox.checked;
          renderizarTarefas();
        });
  
        label.appendChild(checkbox);
        label.appendChild(span);
  
        const icons = document.createElement('div');
        icons.className = 'icons';
  
        const botaoEditar = document.createElement("a");
        botaoEditar.href = "#";
        const imgEditar = document.createElement("img");
        imgEditar.src = "./img/PencilSimple.png";
        imgEditar.alt = "editar";
        botaoEditar.appendChild(imgEditar);
        botaoEditar.addEventListener('click', (e) => {
          e.preventDefault();
  
          const inputEdicao = document.createElement('input');
          inputEdicao.type = 'text';
          inputEdicao.value = tarefa.texto;
  
          span.replaceWith(inputEdicao);
          inputEdicao.focus();
  
          inputEdicao.addEventListener('blur', () => {
            if (inputEdicao.value.trim()) tarefa.texto = inputEdicao.value;
            renderizarTarefas();
          });
  
          inputEdicao.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
              if (inputEdicao.value.trim()) tarefa.texto = inputEdicao.value;
              renderizarTarefas();
            }
          });
        });
  
        const botaoExcluir = document.createElement("a");
        botaoExcluir.href = "#";
        const imgExcluir = document.createElement("img");
        imgExcluir.src = "./img/Trash.png";
        imgExcluir.alt = "Apagar";
        botaoExcluir.appendChild(imgExcluir);
        botaoExcluir.addEventListener('click', (e) => {
          e.preventDefault();
          tarefas.splice(i, 1);
          renderizarTarefas();
        });
  
        icons.appendChild(botaoEditar);
        icons.appendChild(botaoExcluir);
  
        item.appendChild(label);
        item.appendChild(icons);
        lista.appendChild(item);
      });
    }
  
    inputTarefa.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const texto = inputTarefa.value;
        adicionarTarefa(texto);
        inputTarefa.value = '';
      }
    });
  
    renderizarTarefas();
  });
  