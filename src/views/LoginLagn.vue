<template>
  <div id="body_login">
    <div windowLogin :class="istrue ? 'flip-scale-down-hor' : 'flip-scale-down-hor-2' ">
      <vs-card type="3" v-if="!isLogin">
        <template #title>
          <h3>Inicia sesión en LAGN</h3>
        </template>
        <template #img>
          <img src="../assets/img/logo.svg" alt="img_logo">
        </template>
        <template #text>
          <div inputsUser>
            <vs-input v-model="nameUser" label="Ingrese Username" placeholder="userLagn">
              <template v-if="!validEmail && nameUser !== ''" #message-danger>
                Usuario Invalido
              </template>
            </vs-input>
            <vs-input type="password" v-model="password" label="Ingrese Contraseña" placeholder="contraseña">
              <template v-if="!validPassword && password !== ''" #message-danger>
                Tamaño de contraseña invalido
              </template>
            </vs-input>
          </div>
          <div actionLogin>
            <span>
              <a @click="istrue = true">
                Registrate!
              </a>
            </span>
            <vs-button>
              <span class="span">
                Login
              </span>
            </vs-button>
          </div>  
        </template>
      </vs-card>
      <vs-card type="3" v-if="isLogin">
        <template #title>
          <h3>Registrate en LAGN</h3>
        </template>
        <template #text>
          <div structRegister>
            <div inputsUser style="margin-right: 25px;">
              <vs-input v-model="nameUser" label="Ingrese Username" placeholder="userLagn">
                <template v-if="!validEmail && nameUser !== ''" #message-danger>
                  Usuario Invalido
                </template>
              </vs-input>
              <vs-input type="password" v-model="password" label="Ingrese Contraseña" placeholder="contraseña">
                <template v-if="!validPassword && password !== ''" #message-danger>
                  Tamaño de contraseña invalido
                </template>
              </vs-input>
            </div>
            <div inputsUser>
              <vs-input v-model="nameUser" label="Ingrese Username" placeholder="userLagn">
                <template v-if="!validEmail && nameUser !== ''" #message-danger>
                  Usuario Invalido
                </template>
              </vs-input>
              <vs-input type="password" v-model="password" label="Ingrese Contraseña" placeholder="contraseña">
                <template v-if="!validPassword && password !== ''" #message-danger>
                  Tamaño de contraseña invalido
                </template>
              </vs-input>
            </div>
          </div>
          <div inputsUser style="margin-top: 10px;">
            <vs-input v-model="nameUser" label="Ingrese Username" placeholder="userLagn">
              <template v-if="!validEmail && nameUser !== ''" #message-danger>
                Usuario Invalido
              </template>
            </vs-input>
            <vs-input type="password" v-model="password" label="Ingrese Contraseña" placeholder="contraseña">
              <template v-if="!validPassword && password !== ''" #message-danger>
                Tamaño de contraseña invalido
              </template>
            </vs-input>
          </div>
          <div actionLogin>
            <span>
              <a @click="istrue = true">
                Ya tienes cuenta ?
              </a>
            </span>
            <vs-button>
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
export default {
  name: "login-lagn",
  data(){
    return{
      nameUser: '',
      password: '',
      isLogin: false,
      istrue: false
    }
  },
  computed: {
    validEmail() {
      return this.nameUser.length > 6 ? true : false
    },
    validPassword(){
      return this.password.length > 8 ? true : false
    }
  },
  mounted(){
    this.bubbler();
  },
  methods:{
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
    width: inherit!important;
    display: flex;
    flex-direction: column;
    align-items: center;
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


</style>