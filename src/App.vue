<template>
<v-app id="inspire">
    <div>
        <v-app-bar class="app-color" :collapse="!collapseOnScroll" :collapse-on-scroll="collapseOnScroll">
            <v-toolbar-title v-ripple>2Mush-Wealth</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>help</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>update</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
    <v-content>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col cols="12" sm="8" md="4">
                    <v-card class="elevation-12">
                        <v-toolbar flat>
                            <v-toolbar-title>Wealth Form</v-toolbar-title>
                            <v-spacer />
                        </v-toolbar>
                        <v-card-text>
                            <template>
                                <v-stepper v-model="e6" vertical>
                                    <v-stepper-step class="black-color" :complete="e6 > 1" step="1">
                                        Create ETH Wallet
                                        <small>Create ETH wallet used to dispense Wealth</small>
                                    </v-stepper-step>

                                    <v-stepper-content step="1">
                                        <v-btn @click="e6 = 2">Create</v-btn>
                                    </v-stepper-content>

                                    <v-stepper-step :complete="e6 > 2" step="2">Approve Transfer of tokens to
                                        Created ETH
                                    </v-stepper-step>

                                    <v-stepper-content step="2">
                                        <v-card class="mb-12">
                                            <v-card-text>
                                                <v-form ref="form" v-model="valid" lazy-validation>
                                                    <v-text-field v-model="ethAddress" label="Eth Address" disabled>
                                                    </v-text-field>
                                                    <v-text-field v-model="tokenAddress" label="Token Adddress" required></v-text-field>
                                                    <v-text-field v-model="tokenAmount" label="Token Amount" required></v-text-field>
                                                </v-form>
                                            </v-card-text>
                                        </v-card>
                                        <v-btn @click="approve">Aprove</v-btn>
                                        <v-btn @click="e6=1" text>Cancel</v-btn>
                                    </v-stepper-content>

                                    <v-stepper-step :complete="e6 > 3" step="3">Start Date</v-stepper-step>
                                    <v-stepper-content step="3">
                                        <v-card class="mb-12">
                                            <v-card-text>
                                                <datetime type="datetime" v-model="startDate"></datetime>
                                            </v-card-text>
                                        </v-card>
                                        <v-row>
                                            <v-col>
                                                <v-btn @click="setStartDate">Continue</v-btn>
                                                <v-btn @click="cancelAproval" text v-ripple>Cancel</v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-stepper-content>

                                    <v-stepper-step step="4">End Date</v-stepper-step>
                                    <v-stepper-content step="4">
                                        <v-card class="mb-12">
                                            <v-card-text>
                                                <datetime zone="local" type="datetime" v-model="endDate"></datetime>
                                            </v-card-text>
                                        </v-card>
                                        <v-btn @click="startStream()">Start Stream</v-btn>
                                        <v-btn @click="back" text v-ripple>Back</v-btn>
                                        <v-btn @click="cancelAproval" text v-ripple>Cancel</v-btn>
                                    </v-stepper-content>
                                </v-stepper>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-col>

            </v-row>

        </v-container>
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
    </v-content>
</v-app>
</template>

<script>
import eth from 'node-eth-address'
import swal from 'sweetalert2'
export default {
    data() {
        return {
            e6: 1,
            collapseOnScroll: true,
            icons: [],
            startDate: new Date().toISOString().substr(0, 10),
            endDate: new Date().toISOString().substr(0, 10),
            convertedEndDate: "",
            convertedStartDate: "",
            tokenAmount: 0,
            tokenAmountRules: [],
            tokenAddress: "",
            tokenAddressRules: [],
            ethAddress: ""
        }
    },
    mounted() {
        this.init()
        //this.preventContextMenu()
        //this.preventCodeInspect()
    },
    methods: {
        checkDate(date) {
            var now = new Date().getTime()
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
            this.convertedStartDate = new Date(this.startDate).getTime()
            if (this.checkDate(this.convertedStartDate)) {
                console.log('selected start datetime: ', this.convertedStartDate)
                this.e6++
            } else {
                this.error("Start Date must be greater than the current time and date")
            }
        },
        cancelAproval() {

        },
        startStream() {
            this.convertedEndDate = new Date(this.endDate).getTime()
            if (this.checkDate(this.convertedEndDate)) {
                console.log('selected end datetime: ', this.convertedEndDate)
            } else if (this.convertedStartDate === this.convertedEndDate) {
                this.error("Start and End Date must not be equal")
            } else if (this.convertedEndDate > this.convertedStartDate) {
                this.error("End date and time must be greater than the start date and time")
            } else {
                this.error("End Date must be greater than the current time and date")
            }
        },
        allowedDates(val) {

            var today = new Date().getDate()
            var date = parseInt(val.split('-')[2], 10) >= today
            console.log(parseInt(val.split('-')[2], 10) >= today, today, parseInt(val.split('-')[2], 10))
            return date
        },
        approve() {
            this.e6++
        },
        init() {
            this.ethAddress = this.$store.state.address
            console.log("created address: ", this.ethAddress)
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
