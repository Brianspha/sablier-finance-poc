<template>
<v-app id="inspire">
    <div>
        <v-app-bar class="app-color" :collapse="!collapseOnScroll" :collapse-on-scroll="collapseOnScroll">
            <v-toolbar-title v-ripple>2Mush-Wealth</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn href="https://github.com/Brianspha/sablier-finance-poc" icon>
                <v-icon>mdi-github-circle</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
    <v-content>
        <v-card>
            <v-tabs background-color="white" color="deep-purple accent-4" right>
                <v-tab>Create Stream</v-tab>
                <v-tab>Manage Streams</v-tab>
                <v-tab>FAQ</v-tab>

                <v-tab-item>
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-card class="elevation-12">
                                <v-toolbar flat>
                                    <v-toolbar-title>Wealth Form</v-toolbar-title>
                                    <v-spacer />
                                </v-toolbar>
                                <v-card-text>
                                    <template>
                                        <v-stepper v-model="e6" :complete="e6===4" vertical>
                                            <v-stepper-step color="deep-purple accent-4" class="black-color" :complete="e6 > 1" step="1">
                                                Create ETH Wallet
                                                <small>Create ETH wallet used to dispense Wealth</small>
                                            </v-stepper-step>

                                            <v-stepper-content step="1">
                                                <v-btn @click="e6 = 2" color="deep-purple accent-4">Create</v-btn>
                                            </v-stepper-content>
                                            <v-stepper-step color="deep-purple accent-4" :complete="e6 > 2" step="2">Start Date</v-stepper-step>
                                            <v-stepper-content step="2">
                                                <v-card class="mb-12">
                                                    <v-card-text>
                                                        <datetime type="datetime" v-model="startDate"></datetime>
                                                    </v-card-text>
                                                </v-card>
                                                <v-row>
                                                    <v-col>
                                                        <v-btn @click="setStartDate" color="deep-purple accent-4">
                                                            Continue</v-btn>
                                                        <v-btn @click="back" text v-ripple color="deep-purple accent-4">Back</v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-stepper-content>
                                            <v-stepper-step color="deep-purple accent-4" :complete="e6 > 3" step="3">End Date</v-stepper-step>
                                            <v-stepper-content step="3">
                                                <v-card class="mb-12">
                                                    <v-card-text>
                                                        <datetime type="datetime" v-model="endDate"></datetime>
                                                    </v-card-text>
                                                </v-card>
                                                <v-row>
                                                    <v-col>
                                                        <v-btn @click="setEndDate" color="deep-purple accent-4">
                                                            Continue</v-btn>
                                                        <v-btn @click="back" text v-ripple color="deep-purple accent-4">Back</v-btn>
                                                    </v-col>
                                                </v-row>
                                            </v-stepper-content>
                                            <v-stepper-step color="deep-purple accent-4" :complete="e6 > 4" step="4">Approve Transfer of tokens to
                                                Created ETH
                                            </v-stepper-step>
                                            <v-stepper-content step="4">
                                                <v-card class="mb-12">
                                                    <v-card-text>
                                                        <v-form ref="form" v-model="valid" lazy-validation>
                                                            <v-text-field v-model="ethAddress" :rules="tokenAddressRules" label="Recipient Address">
                                                            </v-text-field>
                                                            <v-text-field v-model="tokenAddress" label="Token Adddress" :rules="tokenAddressRules" required></v-text-field>
                                                            <v-text-field v-model="tokenAmount" label="Token Amount" :rules="tokenAmountRules" required></v-text-field>
                                                        </v-form>
                                                    </v-card-text>
                                                </v-card>
                                                <v-btn :disabled="!valid" @click="approve" color="deep-purple accent-4">Aprove</v-btn>
                                                <v-btn @click="back" text color="deep-purple accent-4">Cancel
                                                </v-btn>
                                            </v-stepper-content>
                                            <v-stepper-step color="deep-purple accent-4" :complete="e6 ===5" step="5">Create Stream
                                            </v-stepper-step>
                                            <v-stepper-content step="5">
                                                <v-btn @click="startStream" color="deep-purple accent-4">Create
                                                </v-btn>
                                                <v-btn @click="cancelAproval" color="deep-purple accent-4">Cancel
                                                </v-btn>
                                            </v-stepper-content>
                                        </v-stepper>
                                    </template>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" justify="center">
                        <v-col v-if="this.$store.state.streams.length===0" cols="12" md="4">
                            <v-card class="mx-auto">
                                <v-card-text>
                                    Currently No Active Streams
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col v-else v-for="(stream,i) in this.$store.state.streams" :key="i" cols="12" md="4">
                            <v-card class="mx-auto" max-width="450">
                                <v-card-text class="text--primary">
                                    <div>Receipient: {{stream.receipient}}</div>
                                    <div>Sender: {{stream.sender}}</div>
                                    <div>Deposit: {{stream.deposit}}</div>
                                    <div>Token Address: {{stream.tokenAddress}}</div>
                                    <div>Start Time: {{stream.startTime}}</div>
                                    <div>Stop Time: {{stream.stopTime}}</div>
                                    <div>Remaining Balance: {{stream.remainingBalance}}</div>
                                    <div>Rate Per Second: {{stream.ratePerSecond}}</div>
                                </v-card-text>
                                <v-card-actions>
                                    <v-btn color="deep-purple accent-4" @click="dialog=true; selectedStream=stream" text>
                                        Widthdraw
                                    </v-btn>
                                    <v-btn color="deep-purple accent-4" text @click="selectedStream=stream;cancelStream()">
                                        Cancel Stream
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>

                    </v-row>
                </v-tab-item>
                <v-tab-item>
                    <v-row align="center" justify="center">
                        <v-col cols="12" md="4">
                            <v-card>
                                <v-card-text>
                                    Coming Soon
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-tab-item>
            </v-tabs>
        </v-card>
        <v-footer padless>
            <v-card flat tile class="lighten-1  text-center" style="width:100vw;">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4 " icon>
                        <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="pt-0">
                    This Project is a Work in Progress please use at own risk
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text>
                    {{ new Date().getFullYear() }} — <strong>2Mush-Wealth</strong>
                </v-card-text>
            </v-card>
        </v-footer>
        <v-dialog v-model="dialog">
            <v-card>
                <v-card-title class="headline lighten-2" primary-title>
                    Available balance: {{this.selectedStream.remainingBalance}}
                </v-card-title>
                <v-divider></v-divider>
                <v-text-field v-model="withDrawAmount" label="Withdraw Amount" :rules="tokenAmountRules" required>
                </v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="withdrawStream">
                        Withdraw
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="true"></loading>
    </v-content>
</v-app>
</template>

<script>
import eth from 'node-eth-address'
import swal from 'sweetalert2'
import Loading from 'vue-loading-overlay';
import bigNumber from 'bignumber.js'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    components: {
        Loading
    },
    data() {
        return {
            selectedStream: 0,
            withDrawAmount: 0,
            dialog: false,
            valid: true,
            approved: false,
            e6: 1,
            collapseOnScroll: true,
            icons: [],
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            convertedEndDate: "",
            convertedStartDate: "",
            tokenAmount: 0,
            tokenAmountRules: [
                v => !!v || 'Amount is required',
                v => (v && !isNaN(v) && parseInt(v) > 0) || 'Amount  must be a valid number and greater than 0'
            ],
            tokenAddress: "",
            tokenAddressRules: [
                v => !!v || 'Token address is required',
                v => (v && web3.utils.isAddress(v)) || 'Invalid token address'
            ],
            ethAddress: "",
            isLoading: false,
            receipientAddress: ''
        }
    },
    mounted() {
        this.init()
        this.preventContextMenu()
        this.preventCodeInspect()
    },
    methods: {
        withdrawStream() {
            this.isLoading = true
            let This = this
            console.log('withdrawing: ', this.withDrawAmount, ' selectedStream: ', this.selectedStream)
            this.withDrawAmount = new bigNumber(this.withDrawAmount)
            this.selectedStream.remainingBalance = new bigNumber(this.selectedStream.remainingBalance).multipliedBy(new bigNumber(10).pow(18)).toFixed()
            console.log('withdrawing: ', this.withDrawAmount)
            console.log('selectedStream: ', this.selectedStream)
            var good = new bigNumber(this.selectedStream.remainingBalance).isGreaterThan(this.withDrawAmount)
            this.withDrawAmount = new bigNumber(this.withDrawAmount).toFixed()
            if (!good) {
                this.error("Cannot withdraw more than whats available")
                this.isLoading = false
                This.withDrawAmount = 0
                This.loadStreams()
            } else {
                this.$store.state.sablier.methods.withdrawFromStream(this.selectedStream.id, this.withDrawAmount)
                    .send({
                        gas: 8000000
                    }).then((results, error) => {
                        if (!error) {
                            This.success("Succesfully withdrew from stream")
                            This.isLoading = false
                            This.dialog = false
                            This.withDrawAmount = 0
                            This.loadStreams()
                        }
                    }).catch((error) => {
                        console.error('error whilst widthdrawing: ', error)
                        This.isLoading = false
                        This.dialog = false
                        This.error("Something went wrong whilst withdrawing from stream")
                        console.log('errro: ', error)
                        This.withDrawAmount = 0
                        This.loadStreams()
                    })
            }
        },
        cancelStream() {
            this.isLoading = true
            this.$store.state.sablier.methods.cancelStream(this.selectedStream.id).send({
                gas: 8000000
            }).then((results, error) => {
                if (!error) {
                    this.success("Succesfully cancelled stream")
                    this.isLoading = false
                    this.loadStreams()
                }
            }).catch((error) => {
                this.error("Something went wrong stream doesnt exist")
                console.error(error)
                this.isLoading = false
                this.loadStreams()
            })
        },
        setEndDate() {
            this.convertedEndDate = new bigNumber((parseInt(new Date(this.endDate).getTime()) / 1000)).toFixed()
            if (!this.checkDate(this.convertedEndDate)) {
                this.error("End Date must be greater than the current time and date")
            } else if (this.convertedStartDate === this.convertedEndDate) {
                this.error("Start and End Date must not be equal")
            } else {
                this.e6++
            }
        },
        toPrecision(number) {
            var preciseNumber = (number).toLocaleString('fullwide', {
                useGrouping: false
            })
            console.log('preciseNumber: ', preciseNumber)
            return preciseNumber
        },
        errorBlock(message) {
            swal.fire({
                title: 'Error',
                icon: 'error',
                text: message,
                showCloseButton: false,
                showCancelButton: false
            })
        },
        checkDate(date) {
            var now = new bigNumber(new Date().getTime() / 1000).toFixed()
            console.log("date>now: ", date > now, " now: ", now, " date: ", date)
            if (date > now) {
                return true
            } else {
                return false
            }
        },
        error(message) {
            swal.fire("Error", message, "error")
        },
        success(message) {
            swal.fire("Success", message, "success")
        },
        back() {
            this.e6--;
        },
        setStartDate() {
            this.convertedStartDate = new bigNumber((parseInt(new Date(this.startDate).getTime()) / 1000)).toFixed()
            if (this.checkDate(this.convertedStartDate)) {
                console.log('selected start datetime: ', this.convertedStartDate)
                this.e6++
            } else {
                this.error("Start Date must be greater than the current time and date")
            }
        },
        cancelAproval: async function () {
            this.isLoading = false
            var newToken = new web3.eth.Contract(this.$store.state.erc20, this.tokenAddress, {
                from: web3.eth.defaultAccount,
                gasPrice: 1000000000000
            })
            var userAllowance = await newToken.methods.allowance(web3.eth.defaultAccount, this.$store.state
                .sablier.address).call({
                gas: 8000000
            })
            var This = this
            newToken.methods.decreaseAllowance(this.$store.state.sablier.address, userAllowance).send({
                gas: 8000000
            }).then((results, error) => {
                if (error) {
                    This.error('Something went wrong whilst reverting allowance')
                    this.isLoading = false
                } else {
                    This.success('Reverted token allowance')
                    This.isLoading = false;
                    this.e6--
                }
            }).catch((error) => {
                This.error('Something went wrong whilst reverting allowance')
                this.isLoading = false
            })
        },
        startStream() {
            this.isLoading = true
            let This = this
            this.$store.state.sablier.methods.createStream(This.ethAddress, This.tokenAmount, This.tokenAddress,
                This.convertedStartDate, This.convertedEndDate).send({
                gas: 8000000
            }).then((results, error) => {
                if (error) {
                    This.error('Something went wrong whilst creating stream')
                    this.isLoading = false
                } else {
                    console.log('streamId: ', results.events.CreateStream.returnValues.streamId)
                    this.$store.state.streamManager.methods.addToStreamersStreams(results.events
                        .CreateStream.returnValues.streamId).send({
                        gas: 8000000
                    }).then((results, error) => {
                        if (error) {
                            This.isLoading = false;
                        } else {
                            This.success('Succesfully created stream')
                            This.isLoading = false;
                            This.loadStreams()
                        }
                    }).catch((error) => {
                        console.log('error whilst adding to stream manager')
                        This.isLoading = false
                    })

                    console.log('receipt: ', results)
                }
            }).catch((error) => {
                console.log('error whilst creating stream: ', error)
                This.error('Something went wrong whilst creating stream')
                This.isLoading = false;
            })
        },
        allowedDates(val) {
            var today = new Date().getDate()
            var date = parseInt(val.split('-')[2], 10) >= today
            console.log(parseInt(val.split('-')[2], 10) >= today, today, parseInt(val.split('-')[2], 10))
            return date
        },
        calculateDeposit(delta, deposit) {
            let diff = deposit.minus(deposit.minus(deposit.mod(delta)))
            deposit = new bigNumber(deposit).minus(diff)
            console.log(deposit.toFixed())
            return deposit
        },
        approve: async function () {
            this.isLoading = true
            let This = this
            var timedelta = new bigNumber(this.convertedEndDate - this.convertedStartDate)
            var newToken = new web3.eth.Contract(this.$store.state.erc20, this.tokenAddress, {
                from: web3.eth.defaultAccount,
                gasPrice: 1000000000000
            })
            var userBalance = await newToken.methods.balanceOf(web3.eth.defaultAccount).call({
                gas: 8000000
            })
            userBalance = parseInt(userBalance)
            var decimals = await newToken.methods.decimals().call({
                gas: 8000000
            })
            console.log('token decimals: ', decimals)
            this.tokenAmount = new bigNumber(this.tokenAmount)
            this.tokenAmount = this.tokenAmount.multipliedBy(new bigNumber(10).pow(decimals))
            console.log('tokenAmount: ', this.tokenAmount)
            this.tokenAmount = this.calculateDeposit(timedelta, this.tokenAmount).toFixed()
            console.log('timedelta: ', timedelta, ' tokenAmount: ', this.tokenAmount)
            console.log('endDate: ', this.convertedEndDate, ' startDate: ', this.convertedStartDate)
            console.log('selected end datetime: ', this.convertedEndDate)
            console.log('tokenAmount: ', this.tokenAmount)
            console.log('userBalance: ', userBalance)
            if (userBalance >= this.tokenAmount) {
                newToken.methods.approve(this.$store.state.sablier.address, this.tokenAmount).send({
                    gas: 800000
                }).then((results, error) => {
                    console.log('results: ', results, ' error: ', error)
                    if (error) {
                        This.error(
                            'Something went wrong whilst approving sablier contract to spend tokens'
                        )
                        This.isLoading = false;
                    } else {
                        this.isLoading = false
                        this.e6++
                    }
                })
            } else {
                this.error('Seems like you dont have enough tokens')
                this.isLoading = false
            }
            console.log('newToken: ', newToken)
        },
        init() {
            console.log('embark: ', this.$store.state.embark)
            console.log('sablier: ', this.$store.state.sablier.address)
            this.$store.state.embark.onReady((error) => {
                if (error) {
                    this.errorBlock('Seems like you dont have metamask installed')
                } else {
                    this.ethAddress = this.$store.state.address
                    console.log("created address: ", this.ethAddress)
                    this.loadStreams()
                }
            })
        },
        loadStreams() {
            let This = this
            This.$store.state.streams = []
            this.$store.state.streamManager.methods.getStreams().call({
                gas: 8000000
            }).then((ids, error) => {
                if (!error && ids && ids.length > 0) {
                    ids.map((id) => {
                        This.$store.state.sablier.methods.getStream(id).call({
                            gas: 8000000
                        }).then((stream, error) => {
                            if (!error) {
                                console.log('stream: ', stream)
                                This.$store.state.streams.push({
                                    "receipient": stream.recipient,
                                    "sender": stream.sender,
                                    "deposit": new bigNumber(stream.deposit).div(
                                        new bigNumber(10).pow(18)),
                                    "tokenAddress": stream.tokenAddress,
                                    "startTime": stream.startTime,
                                    "stopTime": stream.stopTime,
                                    "remainingBalance": new bigNumber(stream
                                        .remainingBalance).div(new bigNumber(10)
                                        .pow(18)),
                                    "ratePerSecond": stream.ratePerSecond,
                                    "id": id
                                })
                            }
                        })
                    })
                }
            })
        },
        preventContextMenu() {
            document.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        },
        preventCodeInspect() {
            document.onkeydown = function (e) {
                if (event.keyCode == 123) {
                    return false;
                }
                if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                    return false;
                }
                if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                    return false;
                }
                if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                    return false;
                }
                if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                    return false;
                }
            }
        }
    }
}
</script>

<style>
.app-color {
    background-color: rgb(3, 209, 89);
}

.v-stepper__step__step primary {
    background-color: black;
}
</style>
