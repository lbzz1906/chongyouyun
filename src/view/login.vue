<template>
  <card id="log">
    <h2 slot="title">登陆平台</h2>
    <RadioGroup v-model="workerRole">
      <Radio label="前台管理">前台管理</Radio>
      <Radio label="医生">主治医生</Radio>
      <Radio label="药品管理">药品管理</Radio>
      <Radio label="人事管理">人事管理</Radio>
    </RadioGroup>
    <Divider dashed />
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.workerAccount" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.workerPassword" placeholder="Password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="success" @click="login">登陆</Button>
        <Button type="primary" @click="sign">注册</Button>
      </FormItem>
    </Form>

  </card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      workerRole: '',
      workerList: '',
      formInline: {
        workerAccount: '',
        workerPassword: ''
      },
      ruleInline: {
        workerAccount: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' }
        ],
        workerPassword: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/loginCheck', {
        params: {
          'workerAccount': this.formInline.workerAccount,
          'workerPassword': this.formInline.workerPassword,
          'workerRole': this.workerRole
        }
      }).then((res) => {
        this.$Message.success('登陆成功!!');
          if (this.workerRole == '前台管理') {
            this.$router.push({path: '/register'})
          } else if (this.workerRole == '医生') {
            this.$router.push({path: '/doctor'})
          } else if (this.workerRole == '药品管理') {
            this.$router.push({path: '/drugs'})
          } else if (this.workerRole == '人事管理') {
            this.$router.push({path: '/rooter'})
          }
      })
        .catch((err) => {
          this.$Message.error('登陆失败');
        })
    },
    sign: function () {
      this.$router.push({path: '/sign'})
    }
  }
}
</script>
<style>
#log {
  width: 400px;
  text-align: center;
  margin: 60px auto;
  border: #cfedfa solid 2px;
}

Button{
  margin: 0 20px;
}
h2 {
  font-size: 30px;
}

</style>
