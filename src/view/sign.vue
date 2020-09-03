<template>
  <div>
  <card id="sig">
    <h2 slot="title">注册员工账号</h2>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="Role">
          <RadioGroup v-model="workerRole">
            <Radio label="前台管理"></Radio>
            <Radio label="医生"></Radio>
            <Radio label="药品管理"></Radio>
            <Radio label="人事管理" disabled></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem prop="name">
          <Input type="text" v-model="formInline.workerName" placeholder="Username">
          </Input>
        </FormItem>
        <FormItem prop="account">
          <Input type="text" v-model="formInline.workerAccount" placeholder="UserAccount">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.workerPassword" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="sex">
          <RadioGroup v-model="workerSex">
            性别:&nbsp&nbsp&nbsp&nbsp
            <Radio label="男"></Radio>
            <Radio label="女"></Radio>
          </RadioGroup>
        </FormItem><br>
        <FormItem prop="age">
          <Input type="text" v-model="workerAge" placeholder="UserAge">
          </Input>
        </FormItem><br>
        <FormItem>
          <Button type="success" @click="login">去登陆</Button>
          <Button type="primary" @click="sign">注册</Button>
        </FormItem>
      </Form>
  </card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "sign",
  data() {
    return {
      workerRole: '',
      workerSex: '',
      workerAge: '',
      formInline: {
        workerAccount: '',
        workerName: '',
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
    login(){
      this.$router.push('/')
    },
    sign: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/addWorker', {
        params: {
          'workerName': this.formInline.workerName,
          'workerPassword': this.formInline.workerPassword,
          'workerRole': this.workerRole,
          'workerSex': this.workerSex,
          'workerAge': this.workerAge,
          'workerAccount': this.formInline.workerAccount
        }
      }).then((res) => {
        this.$Message.success('注册成功')
        this.$router.push({path: '/'})
      })
        .catch((err) => {
          this.$Message.error('注册失败');
        })
    },
  }
}
</script>
<style scoped>
#sig {
  width: 400px;
  text-align: center;
  margin: 60px auto;
  border: #cfedfa solid 2px;
}

h2 {
  font-size: 30px;
}
</style>
