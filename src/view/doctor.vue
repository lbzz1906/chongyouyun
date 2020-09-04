<template>
  <Row>
    <Col span="3" class="patients">
      <label>
        <Divider></Divider>
        <Row>
          <Col span="15">
            <Input placeholder="输入关键字" v-model="patientName"></Input>
          </Col>
          <Col span="8">
            <Button type="warning" @click="search" style="height: 32px;margin-top: 0">查询</Button>
          </Col>
        </Row>
      </label>
      <card v-for="(item,index) in patientsList" style="height: 180px">
        <p slot="title" style="font-weight: bold;color: #ff0000;font-size: 22px">{{ item.patientID }}号</p>
        <p>姓名: {{ item.patientName }}</p>
        <p>科室: {{ item.department }}</p>
        <p>状态: {{ item.patientState }}</p>
        <BackTop></BackTop>
        <Button type="warning" @click="write(index)">写入信息</Button>
        <Button type="success" @click="show(index)">查询信息</Button>
      </card>
    </Col>
    <Col span="11">
      <card>
        <h2 slot="title">病人情况</h2>
        <Form>
          <FormItem>
            <label>
              <Input style="width: 200px" type="text" placeholder="医生编号" v-model.lazy="doctorID"></Input>
            </label><br>
          </FormItem>
          <FormItem>
            <label>
              <Input style="width: 200px" type="text" placeholder="病人年龄" v-model.lazy="patientAge"></Input>
            </label><br>
          </FormItem>
          <FormItem>
            <RadioGroup v-model.lazy="patientSex">
              性别:&nbsp&nbsp&nbsp&nbsp
              <Radio label="男"></Radio>
              <Radio label="女"></Radio>
            </RadioGroup>
          </FormItem>
        </Form>
        <Divider>诊断描述</Divider>
        <Input type="textarea" :autosize="{minRows: 5,maxRows: 16}" placeholder="诊断描述..."
               v-model.lazy="diagnosticDescription"
               class="text"></Input></card>
    </Col>
    <Col span="10">
      <card>
        <h2 slot="title">处方</h2>
        <Form>
          <FormItem>
            <Input type="textarea" :autosize="{minRows: 16,maxRows: 24}" placeholder="编写处方..."
                   class="text" v-model.lazy="prescription"></Input>
          </FormItem>
        </Form>
        <Button type="error" @click="logout" style="margin-right: 20px">退出登录</Button>
      </card>
    </Col>
  </Row>
</template>

<script>
import axios from "axios";

export default {
  name: "doctor",
  data() {
    return {
      patientsList: [],
      patientName: '',
      patientID: '',
      department: '',
      doctorID: '',
      patientAge: '',
      patientSex: '',
      diagnosticDescription: '',
      prescription: '',
      patientState: '',
      active: '-1',
      searchWords: ''
    }
  },
  mounted: function () {
    axios.get('http://chongyouyun.free.vipnps.vip/getAllMedicalHistory')
      .then((res) => {
        this.patientsList = res.data
      })
      .catch((err) => {
        // alert('获取失败!!')
      })
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/'
      })
    },
    search: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/getMedicalHistory',
        {
          params: {
            'patientName': this.patientName
          }
        })
        .then((res) => {
          this.patientsList = res.data
        })
        .catch((err) => {
          this.$Message.error('查无此人!')
        })
    },
    write: function (index) {
      axios.get('http://chongyouyun.free.vipnps.vip/writeMedicalHistory',
        {
          params: {
            'doctorID': this.doctorID,
            'patientID': index + 1,
            'patientAge': this.patientAge,
            'patientSex': this.patientSex,
            'diagnosticDescription': this.diagnosticDescription,
            'prescription': this.prescription
          }
        })
        .then((res) => {
          alert('修改成功!!')
          this.patientsList[index].patientState = '已诊断'

        })
        .catch((err) => {
          alert('获取失败!!')
          alert(index + 1)
        })
    },
    show: function (index) {
      axios.get('http://chongyouyun.free.vipnps.vip/getAllMedicalHistory')
        .then((res) => {
          this.patientsList = res.data
          this.doctorID = this.patientsList[index].doctorID
          this.patientAge = this.patientsList[index].patientAge
          this.patientSex = this.patientsList[index].patientSex
          this.diagnosticDescription = this.patientsList[index].diagnosticDescription
          this.prescription = this.patientsList[index].prescription
        })
        .catch((err) => {
          alert('获取失败!!')
        })
    }
  }
}

</script>

<style scoped>
h2 {
  font-size: 30px;
}

p {
  margin-left: 16px;
}

#inp {
  width: 200px;
}

Button {
  margin: 9px 8px;
  padding-left: 4px;
  font-size: 12px;
  display: inline;
  width: 57px;
  height: 22px;
}

.patients {
  height: 628px;
  overflow: auto;
}

.patients::-webkit-scrollbar {
  width: 8px;
}

.patients::-webkit-scrollbar-track {
  background-color: #d6ebff;
}

.patients::-webkit-scrollbar-thumb {
  background-color: #6babfc;
}
</style>
