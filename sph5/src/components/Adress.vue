<template>
        <div id="example">
            <select v-model="prov">
                <option v-for="option in arr" :value="option.name">
                    {{ option.name }}
                </option>
            </select>
            <select v-model="city">
                <option v-for="option in cityArr" :value="option.name">
                    {{ option.name }}
                </option>
            </select>
            <select v-model="district" v-if="district">
                <option v-for="option in districtArr" :value="option.name">
                    {{ option.name }}
                </option>
            </select>
        </div>
    </template>
    <script>
      import arrAll from '@/utils/chinadata'
      export default{
            name:'Address',
            props:['prov','city','district'],
            data(){
                return{
                    arr: arrAll,
                    // prov: '北京',
                    // city: '北京',
                    // district: '东城区',
                    cityArr: [],
                    districtArr: []
                }
            },
            methods: {
                updateCity: function () {
                    for (var i in this.arr) {
                        var obj = this.arr[i];

                        if (obj.name == this.prov) {
                            this.cityArr = obj.sub;
                            break;
                        }
                    }
                    this.city = this.cityArr[1].name;
                },
                updateDistrict: function () {
                    for (var i in this.cityArr) {
                        var obj = this.cityArr[i];
                        if (obj.name == this.city) {
                            this.districtArr = obj.sub;
                            break;
                        }
                    }
                    if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                        this.district = this.districtArr[1].name;
                    } else {
                        this.district = '';
                    }
                },
                changeModel: function () {
                    this.$emit('address',{prov:this.prov,city:this.city,district:this.district})
                }
            },
            beforeMount: function () {
                // this.updateCity();
                // this.updateDistrict();
                console.log(this.prov)
            },
            watch: {
                prov: function () {
                    this.updateCity();
                    this.updateDistrict();
                    this.changeModel();
                },
                city: function () {
                    this.updateDistrict();
                    this.changeModel();
                },
                district: function() {
                    this.changeModel();
                }
            }
    }
    
    </script>