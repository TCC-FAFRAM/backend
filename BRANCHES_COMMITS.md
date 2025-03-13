# Manual de Boas Práticas de Uso do GitHub

## Passo 1 - Nome da Branch

### Padrão:
`<id-da-sua-tarefa>/<super-resumo-da-tarefa>`

### Exemplo:

`git checkout -b ID-100/criando-rota-api`

<br>

## Passo 2 - Nome de commits

* recurso: Um novo recurso para a aplicação, e não precisa ser algo grande, mas apenas algo que não existia antes e que a pessoa final irá acessar.
* conserto: Correções de bugs
* documen: Alterações em arquivos relacionados à documentações
* estilo: Alterações de estilização, formatação etc
* refatorar: Um codigo de refatoração, ou seja, que foi alterado, que tem uma mudança transparente para o usuário final, porém uma mudança real para a aplicação
* teste: Criação ou modificação de testes
* secundario: Alterações em arquivos de configuração, build, distribuição ou qualquer outra coisa que não envolva diretamente o código da aplicação para o usuário final

### Exemplo
recurso(API): criando rota da API para validacao de usuarios`

<br>

## Passo 3 - Nome da Pull Request

### Padrão:
`[<id-da-sua-tarefa>] tipo(escopo): descrição`


### Exemplo:
`[ID-100] recurso(API): criando rota da API para acesso aos videos`
