import { INJECTION_TOKENS } from 'src/shared/constants/injection-tokens.constants';

export const typeormRepositoryProviders = () => {
  const repositories: {
    provide: symbol;
    useClass: new (...args: any[]) => any;
  }[] = [];
  for (const [key, value] of Object.entries(INJECTION_TOKENS)) {
    const nameWithoutSuffix = key.replace(/_REPOSITORY$/, '');
    const repositoryName = nameWithoutSuffix.toLowerCase();
    const className = `TypeOrm${nameWithoutSuffix.charAt(0) + nameWithoutSuffix.slice(1).toLowerCase()}Repository`;

    const repositoryModule = require(
      `./repositories/${repositoryName}.repository`,
    );
    const RepositoryClass = repositoryModule[className];

    repositories.push({
      provide: value,
      useClass: RepositoryClass,
    });
  }
  return repositories;
};
