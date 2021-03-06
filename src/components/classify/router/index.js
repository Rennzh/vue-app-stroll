import GoodDetail from 'components/good-detail/GoodDetail.vue';
import RefineOrder from 'components/shoppingcar/component/RefineOrder';
import MyAddress from 'components/classify/component/ClassifyAddress.vue';
import MyAddAddress from 'components/shoppingcar/component/AddAddress.vue';

export default {
  routes: [
    {
      path: 'class-good-detail',
      name: 'class-good-detail',
      components: {
        classgooddetailcontent: GoodDetail
      },
      meta: {
        nextRouteNameList: [
          'class-good-buy-imedi'
        ]
      },
      children: [
        {
          path: 'class-good-buy-imedi',
          name: 'class-good-buy-imedi',
          component: RefineOrder,
          meta: {
            nextRouteNameList: [
              'class-buy-imedi-config-address'
            ]
          },
          children: [
            {
              path: 'class-buy-imedi-config-address',
              name: 'class-buy-imedi-config-address',
              component: MyAddress,
              meta: {
                nextRouteNameList: [
                  'class-add-address'
                ]
              },
              children: [
                {
                  path: 'class-add-address',
                  name: 'class-add-address',
                  component: MyAddAddress
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
