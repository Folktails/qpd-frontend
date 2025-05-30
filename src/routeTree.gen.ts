/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as UserIndexImport } from './routes/user/index'
import { Route as QuestionIndexImport } from './routes/question/index'
import { Route as QuestionWriteImport } from './routes/question/write'
import { Route as QuestionConfirmImport } from './routes/question/confirm'
import { Route as UserAuthRegisterImport } from './routes/user/auth/register'
import { Route as UserAuthLoginImport } from './routes/user/auth/login'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const UserIndexRoute = UserIndexImport.update({
  id: '/user/',
  path: '/user/',
  getParentRoute: () => rootRoute,
} as any)

const QuestionIndexRoute = QuestionIndexImport.update({
  id: '/question/',
  path: '/question/',
  getParentRoute: () => rootRoute,
} as any)

const QuestionWriteRoute = QuestionWriteImport.update({
  id: '/question/write',
  path: '/question/write',
  getParentRoute: () => rootRoute,
} as any)

const QuestionConfirmRoute = QuestionConfirmImport.update({
  id: '/question/confirm',
  path: '/question/confirm',
  getParentRoute: () => rootRoute,
} as any)

const UserAuthRegisterRoute = UserAuthRegisterImport.update({
  id: '/user/auth/register',
  path: '/user/auth/register',
  getParentRoute: () => rootRoute,
} as any)

const UserAuthLoginRoute = UserAuthLoginImport.update({
  id: '/user/auth/login',
  path: '/user/auth/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/question/confirm': {
      id: '/question/confirm'
      path: '/question/confirm'
      fullPath: '/question/confirm'
      preLoaderRoute: typeof QuestionConfirmImport
      parentRoute: typeof rootRoute
    }
    '/question/write': {
      id: '/question/write'
      path: '/question/write'
      fullPath: '/question/write'
      preLoaderRoute: typeof QuestionWriteImport
      parentRoute: typeof rootRoute
    }
    '/question/': {
      id: '/question/'
      path: '/question'
      fullPath: '/question'
      preLoaderRoute: typeof QuestionIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/': {
      id: '/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserIndexImport
      parentRoute: typeof rootRoute
    }
    '/user/auth/login': {
      id: '/user/auth/login'
      path: '/user/auth/login'
      fullPath: '/user/auth/login'
      preLoaderRoute: typeof UserAuthLoginImport
      parentRoute: typeof rootRoute
    }
    '/user/auth/register': {
      id: '/user/auth/register'
      path: '/user/auth/register'
      fullPath: '/user/auth/register'
      preLoaderRoute: typeof UserAuthRegisterImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/question/confirm': typeof QuestionConfirmRoute
  '/question/write': typeof QuestionWriteRoute
  '/question': typeof QuestionIndexRoute
  '/user': typeof UserIndexRoute
  '/user/auth/login': typeof UserAuthLoginRoute
  '/user/auth/register': typeof UserAuthRegisterRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/question/confirm': typeof QuestionConfirmRoute
  '/question/write': typeof QuestionWriteRoute
  '/question': typeof QuestionIndexRoute
  '/user': typeof UserIndexRoute
  '/user/auth/login': typeof UserAuthLoginRoute
  '/user/auth/register': typeof UserAuthRegisterRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/question/confirm': typeof QuestionConfirmRoute
  '/question/write': typeof QuestionWriteRoute
  '/question/': typeof QuestionIndexRoute
  '/user/': typeof UserIndexRoute
  '/user/auth/login': typeof UserAuthLoginRoute
  '/user/auth/register': typeof UserAuthRegisterRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/question/confirm'
    | '/question/write'
    | '/question'
    | '/user'
    | '/user/auth/login'
    | '/user/auth/register'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/question/confirm'
    | '/question/write'
    | '/question'
    | '/user'
    | '/user/auth/login'
    | '/user/auth/register'
  id:
    | '__root__'
    | '/'
    | '/question/confirm'
    | '/question/write'
    | '/question/'
    | '/user/'
    | '/user/auth/login'
    | '/user/auth/register'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  QuestionConfirmRoute: typeof QuestionConfirmRoute
  QuestionWriteRoute: typeof QuestionWriteRoute
  QuestionIndexRoute: typeof QuestionIndexRoute
  UserIndexRoute: typeof UserIndexRoute
  UserAuthLoginRoute: typeof UserAuthLoginRoute
  UserAuthRegisterRoute: typeof UserAuthRegisterRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  QuestionConfirmRoute: QuestionConfirmRoute,
  QuestionWriteRoute: QuestionWriteRoute,
  QuestionIndexRoute: QuestionIndexRoute,
  UserIndexRoute: UserIndexRoute,
  UserAuthLoginRoute: UserAuthLoginRoute,
  UserAuthRegisterRoute: UserAuthRegisterRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/question/confirm",
        "/question/write",
        "/question/",
        "/user/",
        "/user/auth/login",
        "/user/auth/register"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/question/confirm": {
      "filePath": "question/confirm.tsx"
    },
    "/question/write": {
      "filePath": "question/write.tsx"
    },
    "/question/": {
      "filePath": "question/index.tsx"
    },
    "/user/": {
      "filePath": "user/index.tsx"
    },
    "/user/auth/login": {
      "filePath": "user/auth/login.tsx"
    },
    "/user/auth/register": {
      "filePath": "user/auth/register.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
