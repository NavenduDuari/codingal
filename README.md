### Codingal Frontend Assessment

Assignment details: Codingal Frontend Assessment.pdf

## How to run

From project root, run
```bash
yarn
cd packages/client
yarn start
```

Then go to the following route
```text
http://localhost:3000/header
http://localhost:3000/posts
```

## TODO

For the interest of time the following functionality are partly supported now and could be done in more extensive manner

- Documentation of the code
- Extensive unit test. I have added the client side tooling for unit tests and included one test but it could be extended for the whole project
- E2E tests
- Element reuse during infinite scroll. Right now, all the DOM elements are present after
scrolling irrespective of the the fact that some of those elements might be outside of the viewport. We could determine the viewport and reuse elements outside of the viewport during infinite scrolling. This would increase the performance of the app.
- Optimaization required to improve Lighthouse score

## Project structure

### Yarn workspace

It's a good practice to keep all the client code in monorepo for a large enough production system. Since all the moving component has to work together, using a monorepo would eliminate the need to have a compatibilty matrix.

The project is build with yarn workspace. The implementation of the project is inside `package/client`. 

If a new package is required, all we need to do is create a new directory `package/package_name` and run yarn from the root. Example of a new package could be a library which is required in the main module. 

### Typescript

Typescript build system is created such a way so that incremental compilation is supported. 

The compiler options are inherited from project root from `tsconfig.base.json`. If a new module is added we can inherit the base config. This would create a single config for compilation.

Also when we build the project, TypeScript only builds the packageswhich have been changed not the complete packages.

### Component and Container

The react code is written in the popular Component (Dumb) and Container (Stateful) philosophy.

Inside the react container code,  we use 
- Saga from sideeffect management
- Redux as state store

### Other standard tooling

- eslint for linting
- create-react-app -> webpack as build system
