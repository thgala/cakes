import ggLayout from './modules/layout';
import ggForm from './modules/form';
import ggRouter from './modules/router';
import ggStore from './modules/store';
import ggAuth from './modules/auth';
import ggTranslator from './modules/translator';
import ggOrder from './modules/order';
import ggPlan from './modules/plan';
import ggAddress from './modules/address';
import ggPayment from './modules/payment';
import ggBraintree from './modules/braintree';
import ggCountry from './modules/country';
import ggNavigator from './modules/navigator';
import ggNotification from './modules/notification';

import watch from 'redux-watch';
import isObjEqual from 'lodash.isequal';
import { createSelector } from 'reselect';


export const checkoutPlanListAndOrder = store => watcher(store, createSelector(
    ggOrder.selectors.orderActive,
    ggPlan.selectors.planList,
    (order, planList) => ({ order, planList })
  ),
  s => {
    if(
      s.order.id &&
      !s.order.subscription_plan_id &&
      s.planList.length !== 0
    ){
      const
        planId = s.planList[0].id,
        orderNumber = s.order.number;

      store.dispatch( ggOrder.actions.updateOrder({ subscription_plan_id: planId }) );
      store.dispatch( ggOrder.actions.updateOrderPlan(orderNumber, planId) );
    }
  }
)

export const checkoutOrder = store => watcher(store, ggOrder.selectors.orderActive,
  (order, oldOrder) => {
    if(order.id !== oldOrder.id && !!order.id){
      store.dispatch( ggBraintree.actions.authorize(order.number) );
      store.dispatch( ggPlan.actions.getPlans(order.item_total) );
    }

    if( !!order.id ){
      !!order.subscription_plan_id && store.dispatch( ggPlan.actions.setActivePlanId(order.subscription_plan_id) );
      !!order.shipping_address_id && store.dispatch( ggAddress.actions.setActiveAddress(order.shipping_address_id, ggAddress.constants.SHIPPING_NAME) );
      !!order.billing_address_id && store.dispatch( ggAddress.actions.setActiveAddress(order.billing_address_id, ggAddress.constants.BILLING_NAME) );
      !!order.current_payment_source_id && store.dispatch( ggPayment.actions.setActiveUserPaymentMethodId(order.current_payment_source_id) );
    }
  }
)



function watcher(store, selector, action){
  let w = watch(() => selector(store.getState()), isObjEqual);

  store.subscribe(w(action))
}