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
      jogo: {
        nome: '',
        genero: '',
        publicadora: '',
        anoLancamento: ''
      }
    }
  },

  methods: {
    salvar () {
      this.$q.loading.show()
      console.log(this.jogo)
      Axios.post('http://localhost:3000/jogos', this.jogo)
        .then(() => {
          this.$q.notify({
            color: 'positive',
            message: 'Salvo com sucesso'
          })
          this.$q.dialog({
            title: 'Atenção',
            message: 'Deseja inserir um novo jogo?',
            color: 'primary',
            ok: true,
            cancel: 'Não'
          })
            .then(() => {
              this.limparCampos()
            })
            .catch(() => { this.$router.push('/') })
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Erro ao salvar'
          })
        })
        .then(() => { this.$q.loading.hide() })
    },

    mounted () {
      this.limparCampos()
      console.log(this.jogo)
    },

    limparCampos () {
      this.jogo = {
        nome: '',
        genero: '',
        publicadora: '',
        anoLancamento: ''
      }
    }
  }
}
</script>
