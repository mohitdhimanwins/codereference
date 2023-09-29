import { Observable } from 'rxjs';
import { Sidebar } from '../enums';
import { FeatureAvailibility, EntityCount } from '@entities';

export interface MenuItem extends FeatureAvailibility {
  title?: string;
  route?: string;
  icon?: string;
  isExpanded?: boolean;
  class?: string;
  children?: MenuItem[];
  entityType?: Sidebar;
  entityKey?: string;
  data$?: Observable<EntityCount>;
  isVisible?: boolean;
}
