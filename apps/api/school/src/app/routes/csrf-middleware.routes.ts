import { RouteInfo } from '@nestjs/common/interfaces';
export const csrfMiddlewareRoutes: (string | RouteInfo)[] = ['logout', 'refresh'];
