import vue from 'vue'
import vuex from 'vuex'
import accounts from 'web3-eth-accounts'
vue.use(vuex)
export default new vuex.Store(({
    state:{
        nodeURL:"http://localhost:7545",
        address:new accounts("http://localhost:8546").create().address,
        sablier:require('../../embarkArtifacts/contracts/Sablier').default,
        erc20: require('../../json/erc20ABI.json'),
        embark: require('../../embarkArtifacts/embarkjs').default,
        streamManager: require('../../embarkArtifacts/contracts/StreamManager').default,
        streams:[]
    }
}))