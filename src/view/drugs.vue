<template>
  <div>
    <Row>
      <Col span="18" class="left">

        <card class="drugs" v-for="(item,index) in medicineList" style="border: 1px solid #0088ff;border-radius: 10px">
          <h slot="title">{{ item.medicineName }}</h>
          <Divider>药品编号</Divider>
          <p>{{ item.medicineID }}</p>
          <Divider>药品种类</Divider>
          <p>{{ item.medicineKind }}</p>
          <Divider>药品价格</Divider>
          <p>{{ item.medicinePrice }}</p>
          <Divider>药品数量</Divider>
          <p>{{ item.count }}</p>
          <Divider>入库时间</Divider>
          <p>{{ item.intime }}</p>
          <Button type="warning" class="but" @click="modify(index)">修改</Button>
          <Button type="error" class="but" @click="delDrugs(index)">删除</Button>
        </card>
      </Col>
      <Col span="6">
        <Card style="height: 633px;">
          <h slot="title">操作面板</h>
          <Input class="inp" v-model="searchWords" placeholder="输入药品名..."
                 style="width: 200px;display:inline-block"></Input>
          <Button type="info" @click="search">查询</Button>
          <Divider/>
          <Form>
            <FormItem label="种类:">
          <Input v-model="medicineKind" placeholder="medicineKind"></Input>
            </FormItem>
            <FormItem label="编号:">
            <Input v-model="medicineCategoryID" placeholder="medicineCategoryID"></Input>
            </FormItem>
            <FormItem label="名称:">
            <Input v-model="medicineName" placeholder="medicineName"></Input>
            </FormItem>
            <FormItem label="价格:">
            <Input v-model="medicinePrice" placeholder="medicinePrice"></Input>
            </FormItem>
            <FormItem label="数量:">
            <InputNumber :max="20" :min="1" v-model="count" placeholder="count"></InputNumber>
            </FormItem>
          </Form>
          <Button type="success" @click="addDrugs"  style="float: right;">添加</Button>
          <Button type="error" @click="router"  style="float: right;margin-right: 30px">出库管理</Button>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "drugs",
  data() {
    return {
      medicineList: [],
      medicineName: null,
      medicinePrice: null,
      count: null,
      medicineKind: null,
      medicineCategoryID: null,
      searchWords: '',
      intime: ''
    }
  },
  mounted() {
    axios.get('http://chongyouyun.free.vipnps.vip/getAllMedicine')
      .then((res) => {
        this.medicineList = res.data
      })
  },
  methods: {
    router(){
      this.$router.push('out')
    },
    empty: function () {
      this.medicineName = '';
      this.medicinePrice = '';
      this.count = '';
      this.medicineCategoryID = '';
      this.medicineKind = '';
      this.intime = '';
      this.searchWords = ''
    },
    getAllDrugs: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/getAllMedicine')
        .then((res) => {
          this.medicineList = res.data
          this.empty()
        })
    },
    modify: function (index) {
      axios.get('http://chongyouyun.free.vipnps.vip/updateMedicine',
        {
          params: {
            'medicineID': index + 1,
            'medicineName': this.medicineName,
            'medicinePrice': this.medicinePrice,
            'count': this.count
          }
        })
        .then((res) => {
          this.$Message.success('修改成功')
          this.empty()
          this.getAllDrugs()
        })
    },
    addDrugs: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/addMedicine',
        {
          params: {
            'medicineKind': this.medicineKind,
            'medicineName': this.medicineName,
            'medicinePrice': this.medicinePrice,
            'count': this.count,
            'medicineCategoryID': this.medicineCategoryID
          }
        })
        .then((res) => {
          alert("添加成功!")
          this.empty()
          this.getAllDrugs()
        })
    },
    delDrugs: function (index) {
      axios.get('http://chongyouyun.free.vipnps.vip/deleteMedicine',
        {
          params: {
            'medicineID': index + 1
          }
        })
        .then((res) => {
          alert("删除成功!")
          this.empty()
          this.getAllDrugs()
        })
    },
    search: function () {
      axios.get('http://chongyouyun.free.vipnps.vip/getMedicineByName',
        {
          params: {
            'medicineName': this.searchWords
          }
        })
        .then((res) => {
          this.medicineList = res.data
          this.empty()
        })
        .catch((err) => {
          alert('没有找到!')
        })
    }
  }
}

</script>

<style scoped>
h {
  font-size: 25px;
}
.inp {
  margin: 12px 30px;
  width: 230px;
}

.drugs {
  display: inline-block;
  width: 200px;
  height: 390px;
  margin: 10px;
}

.left {
  height: 627px;
  overflow: auto;
}

.left::-webkit-scrollbar {
  width: 8px;
}

.left::-webkit-scrollbar-track {
  background-color: #d6ebff;
}

.left::-webkit-scrollbar-thumb {
  background-color: #6babfc;
}

.but {
  margin: 10px 18px 0 18px;
  padding-left: 9px;
  font-size: 12px;
  display: inline;
  width: 45px;
  height: 22px;
}

p {
  line-height: 2px;
  text-align: center;
  color: #ff4636;
  font-weight: bold;
}

</style>
