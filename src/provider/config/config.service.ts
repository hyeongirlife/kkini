import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config';
import { Config } from './config.interface';

@Injectable()
export class ConfigService<K = Config> extends NestConfig<K> {
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(path, { infer: true });
    return value;
  }
}

// !!위 코드는 @nestjs/config 모듈에서 제공되는 ConfigService 클래스를 상속받아 get 메소드를 오버라이드한 코드입니다.

// !!@nestjs/config 모듈은 환경 변수, 환경 설정 파일 등을 로드하여 애플리케이션에서 사용할 수 있도록 해주는 모듈입니다. ConfigService 클래스는 이러한 설정 값을 애플리케이션에서 쉽게 가져올 수 있도록 도와주는 클래스입니다.

// !!위 코드에서 @Injectable() 데코레이터는 이 클래스가 Injectable 하다는 것을 나타냅니다. 이 클래스는 다른 모듈에서 사용될 수 있으며, @Inject() 데코레이터를 사용하여 의존성 주입이 가능합니다.

// !!get 메소드는 NestConfig 클래스에서 상속받은 메소드입니다. 이 메소드는 path 매개변수를 받아 해당하는 설정 값을 반환합니다. Path<K>와 PathValue<K, P>는 TypeScript의 제네릭 타입으로, 설정 값의 타입과 경로를 지정하는 데 사용됩니다.

// !!override 키워드는 메소드나 속성을 오버라이드할 때 사용됩니다. 이 경우 get 메소드를 오버라이드하여 부모 클래스에서 반환되는 값을 그대로 반환하도록 설정합니다.

// !!즉, 위 코드는 ConfigService 클래스에서 get 메소드를 오버라이드하여, 설정 값을 가져올 때 infer 옵션을 추가하여 타입을 추론하도록 구현한 것입니다. 이렇게 하면, 설정 값을 가져올 때마다 타입을 일일히 지정하지 않아도 되므로 코드의 가독성과 유지 보수성이 향상됩니다.
