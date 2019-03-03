<template>
  <q-page class="layout-padding">
    <div class="row">
      <div class="col-md-12">
        <!-- Apontando nas variáveis do data quais dados, quais colunas usar, assim qual o identificador único da linha, e qual indicação de que
        a tabela já foi carregada. -->
        <!-- Os componentes q-table, q-tr e q-td foram importados no arquivo /quasar.conf.js -->
        <q-table
          :data="jogos"
          :columns="colunas"
          title="Jogos"
          row-key="id"
          :loading="!carregado"
        >
          <!-- Tornando cada linha clicável e chamando uma função a partir do click -->
          <q-tr slot="body" slot-scope="props" :props="props" @click.native="irParaPagina(props.row)" class="cursor-pointer">
            <!-- Iterando cada coluna para exibir o valor dela -->
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.value }}
            </q-td>
          </q-tr>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
// Importando a biblioteca que faz requisições HTTP
import axios from 'axios'

export default {
  name: 'PageIndex',
  data () {
    return {
      jogos: [],
      carregado: false,
      colunas: [
        {
          name: 'id',
          label: 'Codigo',
          field: 'id',
          sortable: true
        },
        {
          name: 'nome',
          label: 'Nome',
          field: 'nome',
          sortable: true
        },
        {
          name: 'genero',
          label: 'Gênero',
          field: 'genero',
          sortable: true
        },
        {
          name: 'anoLancamento',
          label: 'Ano Lanç.',
          field: 'anoLancamento',
          sortable: true
        }
      ]
    }
  },
  methods: {
    irParaPagina (row) {
      // Trocando a 'página' e URL. A rota foi definida do arquivo /router/routes.js
      this.$router.push('/' + row.id)
      // Colocando as informações da linha selecionada no console do navegador
      console.log(row)
    }
  },
  mounted () {
    // Ao carregar o componente, fazer uma requição http em nossa API, para retornar todos os nossos jogos
    axios.get('http://localhost:3000/jogos')
      .then((res) => {
        // Então, salve esses jogos na variável jogos, dentro do data
        this.jogos = res.data
        console.log(res)
      })
      .catch((err) => {
        // Caso algo dê errado, mostre o erro no console do navegador
        console.log(err)
      })
      .then(() => {
        // De qualquer forma, torne a variável carregado como verdadeira, para parar o indicativo de carregando na data table
        this.carregado = true
      })
  }
}
</script>
