import vue from 'vue'
import vuex from 'vuex'
import accounts from 'web3-eth-accounts'
vue.use(vuex)
export default new vuex.Store(({
    state:{
        nodeURL:"http://localhost:7545",
        address:new accounts("http://localhost:9545").create().address,
        sablier:require('../../embarkArtifacts/contracts/Sablier')
    }
}))