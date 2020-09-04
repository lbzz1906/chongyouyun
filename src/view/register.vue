<template>

  <card id="res" style="border: #0088ff 1px solid">
    <h2 slot="title">挂号系统</h2>
    <Form>
      <FormItem label="病人姓名:">
    <Input type="text" v-model="patientName" placeholder="patientName..."></Input>
      </FormItem>
      <FormItem label="性别:">
    <RadioGroup v-model="registrationMoney">
      <Radio label="150"></Radio>
      <Radio label="300"></Radio>
    </RadioGroup>
      </FormItem>
      <FormItem label="科室:">
    <Input type="text" v-model="department" placeholder="department..."></Input><br><br>
    <Button type="success" size="large" @click="regis">挂号</Button>
        <Button type="error" size="large" @click="logout">退出登录</Button>
      </FormItem>
    </Form>
  </card>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    return {
      patientName: '',
      registrationMoney: '',
      department: ''
    }
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/'
      })
    },
    regis: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/addRegistration', {
        params: {
          'patientName': this.patientName,
          'registrationMoney': this.registrationMoney,
          'department': this.department
        }
      }).then((res) => {
        console.log(res)
        alert('挂号成功')
        this.$router.push({path: '/register'})
      })
        .catch((err) => {
          alert('挂号失败!!')
        })
    },
  }
}
</script>

<style scoped>
h2 {
  font-size: 30px;
}

#res {
  text-align: center;
  margin: 60px auto;
  width: 20%;
}
</style>
