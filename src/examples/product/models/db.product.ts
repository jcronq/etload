import { RootProduct } from './root.product';
import { DbData, HasGuid } from '../../common/models';

export interface DbProduct extends RootProduct, DbData, HasGuid {}
