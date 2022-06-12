import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './+state/routing.reducer';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './custom-route.serializer';

@NgModule({
  imports: [
    StoreModule.forFeature('routing', reducer),
    EffectsModule.forFeature([]),
  ],
  exports: [],
  // providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  // TODO: Not sure if its needed .
})
export class RoutingModule {}
