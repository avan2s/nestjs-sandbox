import { InjectionToken, Provider } from '@nestjs/common';
import { DiscoverableDecorator, DiscoveryService } from '@nestjs/core';
import { ServiceDiscoveryService } from './service-discovery/service-discovery.service';

type DiscoverableServiceDecorator<T extends object | never> =
  DiscoverableDecorator<T> & {
    /**
     * displayName for the implementation
     */
    displayName: string;

    /**
     * the injection token which can be used in order to inject a list of all implementations into a list of abstractions
     */
    TOKEN_ALL: InjectionToken;

    /**
     * @param token an injection token, which can be used in the constructor with `@Inject(<token>)` annotation.
     * If no token is set, the token will be used for getting the list of all service implementations. If you
     * want to filter the list with service parameters you have to define your own injection token
     * @param filterFn an optional filter function in order to filter services by their service parameters
     * @returns a provider for a module definition.
     */
    forList: (
      token?: InjectionToken,
      filterFn?: (params: Partial<T>) => boolean,
    ) => Provider;
  };

/**
 * Creates a decorator that can be used to decorate service implementations with metadata.
 * The decorator will also add the class to the collection of discoverable classes (by metadata key).
 * Decorated classes can be discovered using the `getProviders` and `getControllers` methods.
 * In the provider section, you can additionally use the `forList` method in order to add explorer.
 *
 * ```ts
 * export const AnimalProvider = createServiceDecorator<{
 *  size: 'big' | 'small';
 * }>(AbstractParty.name);
 *
 * import { Module } from '@nestjs/common';
 * import { DiscoveryModule } from 'your-discovery-module';
 *
 * @Module({
 *   imports: [DiscoveryModule],
 *   providers: [
 *     AnimalProvider.forList(),
 *     AnimalProvider.forList(
 *       'bigAnimals',
 *       (serviceParams) => serviceParams.size === 'big',
 *     ),
 *   ],
 * })
 * export class ExplorerModule {}
 * ```
 * @param displayName the name of the abstraction. It will be used i.e to provider better info and error diagnostic messages
 * @returns the decorator function
 */
export function createServiceDecorator<T extends object | never>(
  displayName: Readonly<string>,
): DiscoverableServiceDecorator<T> {
  const decorator =
    DiscoveryService.createDecorator<T>() as DiscoverableServiceDecorator<T>;
  decorator.displayName = displayName;
  decorator.TOKEN_ALL = Symbol(`${decorator.displayName}_${decorator.KEY}_all`);
  decorator.forList = (
    token: InjectionToken = decorator.TOKEN_ALL,
    filterFn: (params: Partial<T>) => boolean = () => true,
  ) => ({
    provide: token,
    useFactory(serviceDiscoveryService: ServiceDiscoveryService) {
      return serviceDiscoveryService.getProviderInstances(decorator, filterFn);
    },
    inject: [ServiceDiscoveryService],
  });
  return decorator;
}
