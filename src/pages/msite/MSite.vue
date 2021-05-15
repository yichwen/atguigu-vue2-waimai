<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name || ''">
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <router-link to="/login" class="header_login_text">登录|注册</router-link>
      </span>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="foodTypes.length">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(foodTypes, index) in foodTypesList"
            :key="index"
          >
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(foodType, index) in foodTypes"
              :key="index"
            >
              <div class="food_container">
                <img :src="baseImageUrl + foodType.image_url" />
              </div>
              <span>{{ foodType.title }}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import HeaderTop from '@/components/header-top/HeaderTop'
import ShopList from '@/components/shop-list/ShopList'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

export default {
  watch: {
    foodTypes (value) {
      // 界面更新就立即创建Swiper对象
      // $nextTick回调函数，一旦界面完成更新，立即调用(此语句要写在数据更新之后)
      this.$nextTick(() => {
        // 创建一个Swiper对象，来实现轮播
        new Swiper('.swiper-container', {
          // 可以循环轮播
          loop: true,
          // 如果需要分页
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  },
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    HeaderTop,
    ShopList
  },
  computed: {
    ...mapState(['address', 'foodTypes']),
    foodTypesList () {
      const { foodTypes } = this
      const foodTypesList = []
      let foodTypesItem = []
      foodTypes.forEach((t) => {
        foodTypesItem.push(t)
        if (foodTypesItem.length === 8) {
          foodTypesList.push(foodTypesItem)
          foodTypesItem = []
        }
      })
      return foodTypesList
    }
  },
  mounted () {
    this.$store.dispatch('getFoodTypes')
    this.$store.dispatch('getShopList')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;

    .header_search {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;

      .icon-sousuo {
        font-size: 25px;
        color: #fff;
      }
    }

    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #fff;
      text-align: center;

      .header_title_text {
        font-size: 20px;
        color: #fff;
        display: block;
      }
    }

    .header_login {
      font-size: 14px;
      color: #fff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);

      .header_login_text {
        color: #fff;
      }
    }
  }

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
