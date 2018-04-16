<template>
  <div class="Address">
    <lazy-render :time="700" :limit="50" track-by-data>
      <div class="content">
        <ul>
          <li>
            <div>收货人</div>
            <div>
              <input type="text" placeholder="请输入收货人" v-model="data.recipients_name">
            </div>
          </li>
          <li>
            <div>手机号码</div>
            <div>
              <input type="text" placeholder="请输入手机号码" v-model="data.recipients_phone">
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <div>所在地区</div>
            <div v-if="data.province_name">
              {{data.province_name + data.city_name + data.distinct_name}}
            </div>
            <div @click.stop="showadd">
              <span>请选择 <i class="iconfont icon-jinru"></i></span>
            </div>
          </li>
          <li>
            <div>详细地址</div>
            <div>
              <input type="text" placeholder="请输入详细地址" v-model="data.address_desc">
            </div>
          </li>
        </ul>
      </div>
      <div class="btns">
        <btn :obj='btnstyle' :text="textbtn" v-on:statr="sbmite"></btn>
      </div>
      <section class="showChose" v-show="showChose">
        <section class="address">
          <section class="title" v-if="false">
            <div>居住地址</div>
          </section>
          <section class="titles">
            <span @click="closeAdd()" class="close"><i class="iconfont icon-guanbi"></i></span>
            <div class="area" @click="provinceSelected()" v-if="Province">{{Province?Province:'请选择'}}</div>
            <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
            <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">
              {{District?District:'请选择'}}
            </div>
          </section>
          <ul>
            <li class="addList" v-for="(v,k) in info" @click.stop="getProvinceId(v.parent_id, v.name)"
                v-show="showProvince"
                :class="v.selected ? 'active' : ''">{{v.name}}
            </li>
            <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.parent_id, v.name)"
                v-show="showCity"
                :class="v.selected ? 'active' : ''">{{v.name}}
            </li>
            <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.parent_id, v.name)"
                v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}
            </li>
          </ul>
        </section>
      </section>
    </lazy-render>
  </div>
</template>

<script>
  // import RegionPicker from 'region-picker'
  // import 'region-picker/dist/region-picker.css'
  import Address from '../../Json/address.json'
  import btn from '../../components/btn/index'
  import {Toast} from 'mint-ui'

  export default {
    name: 'index',
    data: function () {
      return {
        textbtn: '保存',
        btnstyle: {
          opacity: 1,
          width: '70%',
          boxShadow: '0 10px 24px 0 rgba(46, 185, 255, 0.4)',
        },
        visible: true,
        showChose: false,
        showProvince: true,
        showCity: false,
        showDistrict: false,
        showCityList: false,
        showDistrictList: false,
        province: 1,
        city: 3,
        district: 57,
        GetProvinceId: false,
        Province: '',
        City: '',
        District: '',
        // v-for循环判断是否为当前
        selected: false,
        info: Address,
        data: {}
      }
    },
    mounted: function () {
      // console.log(this.$refs.picker)
      this.upnew()
    },
    methods: {
      upnew: function () {
        this.$axios.address_get({vip_user_id: 1}).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
          this.data = res.data.qing_data.address_info
        })
      },
      updata: function (str, callback) {
        var data = {
          parent_id: str,
          page_index: 1
        }
        this.$axios.location(data).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
          callback(res.data.qing_data)
        })
      },
      choseAdd: function () {
        this.showChose = true;
      },
      showadd: function () {
        this.showChose = true
        this.updata(-1, res => {
          this.info = res.list
        })
      },
      closeAdd: function () {
        this.showChose = false;
      },
      _filter(add, name, code) {
        let result = [];
        for (let i = 0; i < add.length; i++) {
          if (code === add[i].id) {
            result = add[i][name];
          }
        }
        return result;
      },
      getProvinceId: function (code, input) {
        this.updata(code, res => {
          this.showCityList = res.list
        })
        this.Province = input;
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
        // this.showCityList =
        // this.showCityList = this._filter(this.info, 'city', this.province);
        // this.info.map(a => a.selected = false);
        // this.info[index].selected = true;
      },
      provinceSelected: function () {
        // 清除市级和区级列表
        this.updata(-1, res => {
          this.info = res.list
        })
        this.showCityList = false;
        this.showDistrictList = false;
        // 清除市级和区级选项
        this.City = false;
        this.District = false;
        // 选项页面的切换
        this.showProvince = true;
        this.showCity = false;
        this.showDistrict = false;
      },
      getCityId: function (code, input, index) {
        this.updata(code, res => {
          this.showDistrictList = res.list
        })
        // this.city = code;
        this.City = input;
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
        // this.showDistrictList = this._filter(this.showCityList, 'district', this.city);
        // 选择当前添加active
        // this.showCityList.map(a => a.selected = false);
        // this.showCityList[index].selected = true;
      },
      citySelected: function () {
        this.showProvince = false;
        this.showCity = true;
        this.showDistrict = false;
      },
      getDistrictId: function (code, input) {
        // this.district = code;
        this.District = input;
        // 选择当前添加active
        // this.showDistrictList.map(a => a.selected = false);
        // this.showDistrictList[index].selected = true;
        this.data.distinct_name = this.District
        this.data.city_name = this.City
        this.data.province_name = this.Province
        this.showChose = false
      },
      districtSelected: function () {
        this.showProvince = false;
        this.showCity = false;
        this.showDistrict = true;
      },
      sbmite: function () {
        console.log(this.data)
        if (!this.data.recipients_name) {
          return Toast({
            message: '请输入收货人',
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        } else if (!this.data.recipients_phone) {
          return Toast({
            message: '请输入手机号',
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        } else if (!this.data.distinct_name) {
          return Toast({
            message: '请选择所在区域',
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        } else if (!this.data.address_desc) {
          return Toast({
            message: '请输入详细地址',
            iconClass: 'iconfont icon-bangdingshibai',
            duration: 3000
          })
        }
        this.$axios.address_post(this.data).then(res => {
          if (res.data.qing_code !== 100) {
            return
          }
          sessionStorage.setItem('Home', 'mine')
          this.$router.push({
            name: 'Home'
          })
        })
      }
    },
    components: {btn}
  }
</script>

<style scoped>
  @import "../../assets/css/views/Address/index.css";

  .myAddress {
    width: 100%;
    background-color: white;
    border-top: 4px solid rgba(245, 245, 245, 1);
    color: #333;
  }

  .myAddress .cont {
    border-bottom: 1px solid rgba(245, 245, 245, 0.8);
  }

  .myAddress .cont span {
    display: inline-block;
    font-size: 0.28rem;
    color: #333;
    line-height: 0.88rem;
    margin-left: 0.32rem;
  }

  .myAddress .cont section {
    float: left;
  }

  .myAddress .cont p {
    display: inline-block;
    font-size: 0.28rem;
    color: #333333;
    line-height: 0.88rem;
    margin-left: 1rem;
  }

  .myAddress .cont .pic2 {
    float: right;
    width: 0.14rem;
    height: 0.24rem;
    margin: 0.32rem 0.32rem 0.32rem 0;
  }

  .myAddress .cont p.text {
    margin-left: 0.72rem;
  }

  .addList {
    width: 100%;
    line-height: 0.88rem;
    color: #333;
  }


</style>
