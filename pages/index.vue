<template>
    <div class="outer">
        <div class="container information">
            <p>
                {{ getTodaysPretty }}
            </p>
        </div>
        <div class="container submittedDiv">
            <transition name="fade" mode="out-in">
                <div v-if="!submitted" key="1">
                    <input v-model="email" class="email" type="email" spellcheck="false">
                    <br>
                    <div class="buttonContainer">
                        <button class="submit" @click="onSubmit('register', 'Tillagd till mejllistan')">Prenumerera</button>
                        <button class="submit" @click="onSubmit('leave', 'Borttagen från mejllistan')">Avprenumerera</button>
                    </div>
                </div>
                <div v-else key="2" class="submittedDiv">
                    <p>{{ submitted }}</p>
                </div>
            </transition>
        </div>
        <div class="container information">
            <p>
                Ange din mejladress för att få ett mejl med dagens namnsdag klockan sju varje morgon.
            </p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import validator from 'validator'

export default {
    data () {
        return {
            submitted: false,
            password: '',
            email: ''
        }
    },

    computed: {
        ...mapGetters({
            getTodaysPretty: 'namnsdagar/getTodaysPretty'
        })
    },

    methods: {
        async onSubmit (endpoint, successMessage) {
            if (!this.email) { return }
            try {
                if (!validator.isEmail(this.email)) {
                    this.submitted = 'Ogiltig mejladress'
                    setTimeout(() => {
                        this.submitted = false
                    }, 2000)
                    return
                }
                this.submitted = 'Skickar...'
                await this.$axios.post('https://namnsdag-back-end.herokuapp.com/' + endpoint, { email: this.email }).catch((error) => {
                    this.submitted = error.response.data.error
                    this.email = ''
                    throw Error
                })
                this.email = ''
                this.submitted = successMessage
                setTimeout(() => {
                    this.submitted = false
                }, 2000)
            } catch (e) {
                if (!this.submitted) { this.submitted = 'Något gick fel' }
                setTimeout(() => {
                    this.submitted = false
                }, 2000)
            }
            return false
        }
    }
}
</script>

<style>

div.outer {
    width: 303px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 32px;
    color: #be9b7b;
    background-color: #001414;
    font-family: monospace;
}

div.container {
    margin-top: 20px;
    text-align: center;
}

div.information {
    padding: 10px 0;
    border-top: 1px solid #be9b7b;
    border-bottom: 1px solid #be9b7b;
    font-family: monospace;
}

input.email {
    width: 303px;
    margin-bottom: 5px;
    height: 25px;
    padding-left: 5px;
    border: none;
    border: 1px solid #be9b7b;
    border-radius: 5px;
    background-color: #001414;
    color: #be9b7b;
    font-family: monospace;
}

input.email::selection {
    background-color: #be9b7b;
    color: #001414;
}

textarea:focus, input:focus{
    outline: none;
}

button:focus {
    outline: none;
}

button.submit {
    width: 151px;
    margin: 0;
    height: 25px;
    background-color: #001414;
    border: 1px solid #be9b7b;
    border-radius: 5px;
    font-family: monospace;
    color: #be9b7b;
    cursor: pointer;
}

button.submit:hover {
    background-color: #be9b7b;
    color: #001414;
}

input.email, button.submit {
    -webkit-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.75);
}

.buttonContainer {
    font-size: 0;
}

.buttonContainer.button {
    font-size: 1rem;
}

div.submittedDiv {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

</style>
