<template>
  <q-page class="layout-padding">
    <div class="row">
      <div class="col-xs-12 col-md-6">
        <!-- v-model é uma conexão com o data do componente. Se algo é alterado no input, é alterado do data e vice-versa -->
        <q-input v-model="jogo.nome" stack-label="Nome do Jogo" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-input v-model="jogo.genero" stack-label="Gênero" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-input v-model="jogo.publicadora" stack-label="Publicadora" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-input v-model="jogo.anoLancamento" type="number" stack-label="Ano de Lançamento" />
      </div>
    </div>
    <div class="row q-mt-sm">
      <div class="col-12">
        <q-btn @click="salvar()" label="Salvar" class="full-width" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
import Axios from 'axios'

export default {
  data () {
    return {
      jogo: {}
    }
  },
  methods: {
    salvar () {
      /* Fazendo uma requição patch, ou seja, 'remendando' nosso jogo via API. A string com os ` é uma maneira diferente de poder se
      concatenar texto e variáveis sem precisar do caractere +. Nesse caso, estamos mandando o objeto do jogo inteiro para a API */
      Axios.patch(`http://localhost:3000/jogos/${this.jogo.id}`, this.jogo)
        .then(() => {
          // Mostrar um indicativo de que o update deu certo
          this.$q.notify({
            color: 'positive',
            message: 'Salvo com sucesso'
          })
        })
    }
  },
  mounted () {
    // Mostre o indicador de carregamento
    this.$q.loading.show()
    // Fazendo uma requisição HTTP, dessa vez trazendo os dados somente do nosso jogo solicitado, indicado pelo parâmetro 'id' na nossa URL
    Axios.get('http://localhost:3000/jogos/' + this.$route.params.id)
      .then((res) => {
        // Como a API retorna um array, pegar somente a posição 0.
        this.jogo = res.data[0]
      })
      .catch((err) => { console.log(err) })
      // De qualquer forma, esconda o indicador de carregamento
      .then(() => { this.$q.loading.hide() })
  }
}
</script>
