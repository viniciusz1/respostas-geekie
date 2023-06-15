

function enviarRequisicao(){
    var xhttp = new XMLHttpRequest();
    let link = document.getElementById('input').value
    if(link.includes('v3.json')){
        link = link.replace("v3.json", "v2.json");
    }

    xhttp.open("GET", link, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    let listPerguntasRespostasLetras = respostas(JSON.parse(xhttp.responseText))
    adicionarAoHtml(listPerguntasRespostasLetras[0], listPerguntasRespostasLetras[1], listPerguntasRespostasLetras[2])
}

function respostas(questions){
    let perguntas = []
    let respostas = []
    let letras = []
    if(questions.hasOwnProperty('exclusive_exercises')) {
        let questoesDesordenadas = encontrarValorChave(questions, 'exclusive_exercises')
        for(let i of questoesDesordenadas){
            let questoes = i['questions'][0]
            console.log("\nPergunta: " + questoes['wording'][0]['content'])
            perguntas.push(questoes['wording'][0]['content'])
            choice_correta = questoes['correct_choice_id']
            if(questoes['choices']){
                for(let index_choice = 0; index_choice < questoes['choices'].length; index_choice++){
                    if(questoes['choices'][index_choice]['id'] == choice_correta){
                        let resposta = questoes['choices'][index_choice]['content'][0]['content']
                        respostas.push(resposta)
                        console.log("Resposta: NUM - " + (index_choice + 1)  + " texto: "+resposta)
                        letras.push(retornaLetra(index_choice))
                    }
                }
            }else{
                console.log('Solução: ' + questoes['solution'][0]['content'])
                letras.push('Descritiva')
                respostas.push(questoes['solution'][0]['content'])
            }
        }
    }
    return [perguntas, respostas, letras]
}

function retornaLetra(index){
    switch(index){
        case 0:
            return 'A'
        case 1:
            return 'B'
        case 2:
            return 'C'
        case 3:
            return 'D'
        case 4:
            return 'E'
    }
}


function adicionarAoHtml(perguntas, respostas, letras){
const tbody = document.getElementById("tbody");

for (let i = 0; i < perguntas.length; i++) {
  const novaLinha = document.createElement("tr");

  const celulaPergunta = document.createElement("td");
  celulaPergunta.innerHTML = perguntas[i];
  novaLinha.appendChild(celulaPergunta);

  const celulaResposta = document.createElement("td");
  celulaResposta.innerHTML = respostas[i];
  novaLinha.appendChild(celulaResposta);

  const celulaLetra = document.createElement("td");
  celulaLetra.innerHTML = letras[i];
  novaLinha.appendChild(celulaLetra);

  tbody.appendChild(novaLinha);
}
}


function encontrarValorChave(json, chave) {
    if (typeof json === "object" && json !== null) {
      if (chave in json) {
        return json[chave];
      } else {
        for (var key in json) {
          var resultado = encontrarValorChave(json[key], chave);
          if (resultado !== undefined) {
            return resultado;
          }
        }
      }
    }
  }