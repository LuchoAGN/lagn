<template>
  <div id="body_login">
    <div windowLogin :class="!isLogin  ? 'flip-scale-down-hor' : 'flip-scale-down-hor-2' ">
      <vs-card type="3" v-if="!isLogin">
        <template #title>
          <h3>Inicia sesión en LAGN</h3>
        </template>
        <template #img>
          <img src="../assets/img/logo.svg" alt="img_logo">
        </template>
        <template #text>
          <div inputsUser>
            <vs-input v-model="nameUser" icon-after label="Ingrese Username" placeholder="userLagn">
              <template #icon>
                <Icon icon="bx:user" width="20" height="20"/>
              </template>
              <template v-if="!validUser && nameUser !== ''" #message-danger>
                Usuario Invalido
              </template>
            </vs-input>
            <vs-input 
              type="password" 
              v-model="password"
              :visiblePassword="hasVisiblePassword"
              icon-after 
              label="Ingrese Contraseña" 
              placeholder="contraseña"
              @click-icon="hasVisiblePassword = !hasVisiblePassword"
            >
              <template #icon>
                <Icon v-if="!hasVisiblePassword" icon="bx:show-alt"  width="20" height="20"/>
                <Icon v-else icon="bx:hide"  width="20" height="20"/>
              </template>
              <template v-if="!validPassword && password !== ''" #message-danger>
                Contraseña invalido
              </template>
            </vs-input>
          </div>
          <div actionLogin>
            <span>
              <a @click="istrue = true">
                Registrate!
              </a>
            </span>
            <vs-button @click="login()">
              <span class="span">
                Login
              </span>
            </vs-button>
          </div>  
        </template>
      </vs-card>
      <vs-card type="3" v-if="isLogin">
        <template #title>
          <div style="padding-left: 120px;">
            <h3>Registrate en LAGN</h3>
          </div>
        </template>
        <template #text>
          <div structRegister>
            <div inputsUser style="margin-right: 25px;">
              <vs-input v-model="dataUser.username" label="Ingrese Username" placeholder="AndresP">
                <template v-if="!validUsername && dataUser.username !== ''" #message-danger>
                  Debes tener mas de 6 caracteres
                </template>
              </vs-input>
              <vs-input 
                type="password" 
                v-model="dataUser.password" 
                label="Ingrese Contraseña" 
                placeholder="contraseña"
                :progress="getProgress"
              >
                <template v-if="getProgress >= 100" #message-success>
                  Secure password
                </template>
                <template v-if="!validPass && dataUser.password !== ''" #message-danger>
                  Debes tener mas de 8 caracteres
                </template>
              </vs-input>
              <vs-input 
                type="password" 
                v-model="dataUser.password2" 
                label="Repetir Contraseña" 
                placeholder="contraseña"
              >
                <template v-if="!validPassEquals && dataUser.password2 !== ''" #message-danger>
                  Debe coincidir las contraseñas
                </template>
              </vs-input>
            </div>
            <div inputsUser>
              <vs-input v-model="dataUser.email" label="Ingrese Email" placeholder="andres@lagn.com">
                <template v-if="!validEmail && dataUser.email !== ''" #message-danger>
                  Correo electronico invalido
                </template>
              </vs-input>
              <vs-input v-model="dataUser.phone_number" label="Ingrese Telefono" placeholder="3000001122">
                <template v-if="!validPhone && dataUser.phone_number !== ''" #message-danger>
                  Numero telefonico invalido
                </template>
              </vs-input>
            </div>
          </div>
          <div inputsUser style="margin-top: 10px; display: flex;">
            <vs-input v-model="dataUser.first_name" label="Ingrese su nombre" placeholder="Andres" style="margin-right: 25px;">
              <template v-if="!validName && dataUser.first_name !== ''" #message-danger>
                Debes tener mas de 3 caracteres
              </template>
            </vs-input>
            <vs-input v-model="dataUser.last_name" label="Ingrese su apellido" placeholder="Polo">
              <template v-if="!validLastName && dataUser.last_name !== ''" #message-danger>
                Debes tener mas de 3 caracteres
              </template>
            </vs-input>
          </div>
          <div actionRegister>
            <span>
              <a @click="istrue = true">
                Ya tienes cuenta ?
              </a>
            </span>
            <vs-button @click="registerUser()">
              <span class="span">
                Sign up
              </span>
            </vs-button>
          </div>  
        </template>
      </vs-card>
    </div>
  </div>
</template>
<script>

import api from '../api/index'
import { Icon } from '@iconify/vue2';

export default {
  name: "login-lagn",
  components: {
		Icon,
	},
  data(){
    return{
      hasVisiblePassword: false,
      nameUser: '',
      password: '',
      dataUser: {
        username: '',
        password: '',
        password2: '',
        email: '',
        phone_number: '',
        first_name: '',
        last_name: ''
      },
      isLogin: false,
      istrue: false
    }
  },
  computed: {
    validUser() {
      return this.nameUser.length > 6 ? true : false
    },
    validPassword(){
      return this.password.length > 8 ? true : false
    },
    validUsername(){
      return this.dataUser.username.length > 6 ? true : false
    },
    validPass(){
      return this.dataUser.password.length > 8 ? true : false
    },
    validPassEquals(){
      return this.dataUser.password == this.dataUser.password2
    },
    validEmail(){
      // eslint-disable-next-line 
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.dataUser.email)
    },
    validPhone(){
      return this.dataUser.phone_number.length > 8 ? true : false
    },
    validName(){
      return this.dataUser.first_name.length >= 3 ? true : false
    },
    validLastName(){
      return this.dataUser.last_name.length >= 3 ? true : false
    },
    getProgress() {
      let progress = 0

      if (/\d/.test(this.dataUser.password)) {
        progress += 20
      }
      if (/(.*[A-Z].*)/.test(this.dataUser.password)) {
        progress += 20
      }
      if (/(.*[a-z].*)/.test(this.dataUser.password)) {
        progress += 20
      }
      if (this.dataUser.password.length >= 8) {
        progress += 20
      }
      if (/[^A-Za-z0-9]/.test(this.dataUser.password)) {
        progress += 20
      }

      return progress
    }
  },
  mounted(){
    this.bubbler();
  },
  methods:{
    login: async function(){
      
      var infoperson = null

      if(this.validUser && this.validPassword)
      {
        var obj = {
          "parameter":{
            "data": {
              "username": this.nameUser,
              "password": this.password
            }
          }
        }

        await api
        .request("post", "/login", obj)
        .then((response) => {
          infoperson = {
            user: response.data.result_extra,
            token: response.data.result.access_token
          }
        })
        
        if(infoperson != null){
          window.localStorage.setItem("dataProfile_lagn", JSON.stringify(infoperson));
          this.$router.push("/");
          window.location.reload();
        }
      }
    },
    registerUser: async function(){
      if(this.validUsername && this.validPass && this.validPassEquals && this.validEmail && 
        this.validPhone && this.validName && this.validLastName)
      {
        var obj = {
          "parameter":{
            "data": this.dataUser
          }
        }

        await api
        .request("post", "/signup", obj)
        .then((response) => {
          console.log(response)
        })
        .catch(function () {
          self.notiFail = true;
        });
      }
    },
    randomNumber(start, end){
      return Math.random() * (end - start);
    },
    bubbler(){
      var self = this;
      var water = document.getElementById('body_login'),
      i  = 0;

      function generateBubbles() {
        if(i < 60) {
          var el     = document.createElement('svg'),
              circle = document.createElement('circle'),
              size   = self.randomNumber(1, 40);

          water.appendChild(el);

          el.appendChild(circle);
          el.setAttribute('viewBox', '0 0 100 100');
          el.setAttribute('class', 'bubble');
          el.setAttribute('style', 'width: ' + size + 'px; height: ' + size + 'px; left: ' + self.randomNumber(1, window.innerWidth/4) + 'vw;');

          circle.setAttribute('cx', 50);
          circle.setAttribute('cy', 50);
          circle.setAttribute('r', 50);

          i++;
        } else {
          clearInterval(cycle);
        }
      }

      generateBubbles();
      var cycle = setInterval(generateBubbles, 150);
    }
  },
  watch:{
    istrue(){
      var self = this;
      if(self.istrue){
        setTimeout(() => {
          self.isLogin = self.isLogin ? false : true
          self.istrue = false
        }, 250);
      }
    }
  }
}
</script>
<style lang="scss">
  div[windowLogin]{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  div[windowLogin] img{
    margin-left: 25px;
    margin-right: 25px;
    background-color: #0C3E5E;
  }

  div[windowLogin] div.vs-card{
    max-width:800px!important;
    min-width: 550px!important;
    cursor: auto!important;
    align-items: center;
  }

  div[windowLogin] div.vs-card__text{
    width: inherit !important;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }

  div[inputsUser]{
    margin-top: 40px;
  }

  div[inputsUser] div{
    margin-bottom: 10px;
  }

  div[windowLogin] div.vs-card h3{
    text-align: center;
  }

  div[windowLogin] div.vs-card button{
    background-color: #0C3E5E;
  }

  div[inputsUser] div.vs-card label{
    text-align: center;
  }

  div[windowLogin] div[actionLogin]{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  div[windowLogin] div[actionLogin] span a{
    margin-left: 6px;
    cursor: pointer;
  }

  div[windowLogin] div[actionLogin] button{
    margin-left: 65px;
  }

  div[windowLogin] div[actionLogin] button.span{
    margin-left: 0px;
  }

  $b-size: 35px;
  $b-surface: -120vh;

  div#body_login{
    height: 100vh;
    margin: 0;
    padding: 0;
    width: 100vw;
    background: #1E2023 ;
  }

  div#body_login{
    overflow: hidden;
  }

  .bubble {
    border-radius: 100%;
    position: fixed;
    bottom: 0;
    will-change: transform;
    background: rgba(#FFF, .02); // gradient fallback
    background: radial-gradient(circle at center, rgba(#FFF, 0.20) 0, rgba(#FFF, .03) 25%);
    animation: bubble 2000ms infinite cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }

  @keyframes bubble {
    from {
      transform: translateY($b-size);
      opacity: 1;
    }

    to {
      transform: translateY($b-surface);
      opacity: 0.25;
    }
  }

  .flip-scale-down-hor {
    animation: flip-scale-down-hor 0.5s linear both;
  }

  @keyframes flip-scale-down-hor {
    0% {
      -webkit-transform: scale(1) rotateX(180deg);
              transform: scale(1) rotateX(180deg);
    }
    50% {
      -webkit-transform: scale(0.4) rotateX(90deg);
              transform: scale(0.4) rotateX(90deg);
    }
    100% {
      -webkit-transform: scale(1) rotateX(0);
              transform: scale(1) rotateX(0);
    }
  }

  .flip-scale-down-hor-2 {
    animation: flip-scale-down-hor 0.5s linear both;
  }

  div[structRegister]{
    display: flex;
    flex-direction: row;
  }

  .flip-scale-down-hor-2 .vs-card__text{
    align-items: flex-start!important;
  }

  div[windowLogin] div[actionRegister]{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 100px;
  }

  div[windowLogin] div[actionRegister] button{
    margin-left: 65px;
  }

  div[windowLogin] div[actionRegister] span a{
    cursor: pointer;
  }
</style>