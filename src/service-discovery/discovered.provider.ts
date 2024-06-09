import { InjectionToken, Provider } from '@nestjs/common';
import { DiscoverableDecorator } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

export class DisvoceredProvider {
  public static forSingle<F extends object | never>(
    provider: DiscoverableDecorator<F>,
    token: InjectionToken = provider,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider {
    return {
      provide: token,
      useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
        const instances = serviceDiscoveryService.getProviderInstances(
          provider,
          filterFn,
        );
        if (instances.length === 0) {
          throw Error(`No provider found for token`);
        } else if (instances.length > 1) {
          throw Error(`Multiple providers found`);
        } else {
          return instances[0];
        }
      },
      inject: [ServiceDiscoveryService],
    };
  }

  public static forList<F extends object | never>(
    provider: DiscoverableDecorator<F>,
    token: InjectionToken = provider,
    filterFn: (params: Partial<F>) => boolean = () => true,
  ): Provider {
    return {
      provide: token,
      useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
        return serviceDiscoveryService.getProviderInstances(provider, filterFn);
      },
      inject: [ServiceDiscoveryService],
    };
  }
}

// interface ExtendedDecorator<F extends object | never>
//   extends DiscoverableDecorator<F> {
//   token: string;
//   annotatedClasses: ClassConstructor[];
//   get: <F extends object | never>(
//     filterFn?: (params: Partial<F>) => boolean,
//   ) => Provider;
//   getList: <F extends object | never>(
//     filterFn?: (params: Partial<F>) => boolean,
//   ) => Provider;
// }

// type ClassConstructor<T = any> = new (...args: any[]) => T;

// export function createExtendedDecorator<T extends object | never>(
//   tokenPrefix: string,
// ): DiscoverableDecorator<T> {
//   const decorator = DiscoveryService.createDecorator<T>();
//   const annotatedClasses: ClassConstructor[] = [];

//   const extendedDecorator: DiscoverableDecorator<T> & { token: string } = {
//     token: `${tokenPrefix}${decorator.KEY}`,
// annotatedClasses: annotatedClasses,

// get: <F extends object | never>(
//   filterFn: (params: Partial<F>) => boolean = () => true,
// ): Provider => {
//   return {
//     provide: decorator,
//     useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
//       const instances = serviceDiscoveryService.getServiceInstances(
//         decorator,
//         filterFn,
//       );
//       if (instances.length === 0) {
//         throw Error(`No provider found for token`);
//       } else if (instances.length > 1) {
//         throw Error(`Multiple providers found`);
//       } else {
//         return instances[0];
//       }
//     },
//     inject: [ServiceDiscoveryService],
//   };
// },

// getList: <F extends object | never>(
//   filterFn: (params: Partial<F>) => boolean = () => true,
// ): Provider => ({
//   provide: decorator,
//   useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
//     return serviceDiscoveryService.getServiceInstances(decorator, filterFn);
//   },
//   inject: [ServiceDiscoveryService],
// }),
//   return decorator;
// }

// Modify the decorator function to track annotated classes
//   const originalDecorator = decorator as any;
//   const newDecorator = (target: ClassConstructor) => {
//     annotatedClasses.push(target);
//     originalDecorator(target);
//   };

//   Object.assign(newDecorator, extendedDecorator);
//   return newDecorator as unknown as ExtendedDecorator<T>;

// const PartyProvider = createExendedDecorator<{ foo: 'party' }>('party_');
// @PartyProvider()
// export class HouseParty {
//   celebrate() {
//     console.log('yeah house party');
//   }
// }
