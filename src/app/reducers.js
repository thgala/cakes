import ggLayout from './modules/layout';
import ggForm from './modules/form';
import ggRouter from './modules/router';


export default {  
  [ggLayout.constants.MODULE_NAME]: ggLayout.reducer,
  [ggForm.constants.MODULE_NAME]: ggForm.reducer,
  [ggRouter.constants.MODULE_NAME]: ggRouter.reducer
}