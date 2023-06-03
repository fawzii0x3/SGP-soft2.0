import { offlineExchange } from '@urql/exchange-graphcache';
import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Brand = {
  __typename?: 'Brand';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type CreateItemInput = {
  brandName: Scalars['String'];
  buyPrice: Scalars['Float'];
  color: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  maxPrice: Scalars['Float'];
  minPrice: Scalars['Float'];
  minQuantity: Scalars['Float'];
  model: Scalars['String'];
  quantity: Scalars['Float'];
  supplierName: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
  target: Scalars['String'];
};

export type FieldError2 = {
  __typename?: 'FieldError2';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  brand: Brand;
  buyPrice: Scalars['Float'];
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  maxPrice: Scalars['Float'];
  minPrice: Scalars['Float'];
  minQuantity: Scalars['Float'];
  model: Scalars['String'];
  quantity: Scalars['Float'];
  selected: Scalars['Boolean'];
  supplier?: Maybe<Supplier>;
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  errors?: Maybe<Array<FieldError>>;
  item?: Maybe<Item>;
};

export type Mutation = {
  __typename?: 'Mutation';
  EditItem: ItemResponse;
  createItem: ItemResponse;
  createUser: UserResponse;
  deleteItem: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  handelOrder: OrderResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  removeItem?: Maybe<Order>;
};


export type MutationEditItemArgs = {
  data: UpdateItemInput;
  id: Scalars['String'];
};


export type MutationCreateItemArgs = {
  data: CreateItemInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteItemArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationHandelOrderArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: UserLogin;
};


export type MutationRemoveItemArgs = {
  id: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  created_date: Scalars['String'];
  id: Scalars['ID'];
  seller?: Maybe<User>;
  soldItems: Array<SoldItem>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  errors?: Maybe<Array<FieldError2>>;
  order?: Maybe<Order>;
};

export type Query = {
  __typename?: 'Query';
  MyOrder?: Maybe<Order>;
  items: Array<Item>;
  meUser?: Maybe<User>;
  orders: Array<Order>;
  users: Array<User>;
};

export type SoldItem = {
  __typename?: 'SoldItem';
  buyPrice: Scalars['Float'];
  color?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  item?: Maybe<Item>;
  minPrice: Scalars['Float'];
  name: Scalars['String'];
  order: Order;
  quantity: Scalars['Float'];
  soldPrice: Scalars['Float'];
};

export type Supplier = {
  __typename?: 'Supplier';
  address?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};

export type UpdateItemInput = {
  brandName: Scalars['String'];
  buyPrice: Scalars['Float'];
  color: Scalars['String'];
  maxPrice: Scalars['Float'];
  minPrice: Scalars['Float'];
  minQuantity: Scalars['Float'];
  model: Scalars['String'];
  quantity: Scalars['Float'];
  supplierName: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  privilege: Scalars['Boolean'];
};

export type UserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  privilege: Scalars['Boolean'];
};

export type UserLogin = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type CreateItemMutationVariables = Exact<{
  data: CreateItemInput;
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'ItemResponse', errors?: Array<{ __typename?: 'FieldError', target: string, message: string }> | null, item?: { __typename?: 'Item', id: string, model: string, color?: string | null, minQuantity: number, minPrice: number, maxPrice: number, buyPrice: number, quantity: number, selected: boolean, brand: { __typename?: 'Brand', id: string, name: string }, supplier?: { __typename?: 'Supplier', id: string, name: string } | null } | null } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type EditItemMutationVariables = Exact<{
  data: UpdateItemInput;
  id: Scalars['String'];
}>;


export type EditItemMutation = { __typename?: 'Mutation', EditItem: { __typename?: 'ItemResponse', errors?: Array<{ __typename?: 'FieldError', target: string, message: string }> | null, item?: { __typename?: 'Item', id: string, model: string, color?: string | null, minQuantity: number, minPrice: number, maxPrice: number, buyPrice: number, quantity: number, selected: boolean, brand: { __typename?: 'Brand', id: string, name: string }, supplier?: { __typename?: 'Supplier', id: string, name: string } | null } | null } };

export type HandelOrderMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type HandelOrderMutation = { __typename?: 'Mutation', handelOrder: { __typename?: 'OrderResponse', errors?: Array<{ __typename?: 'FieldError2', field: string, message: string }> | null, order?: { __typename?: 'Order', id: string, created_date: string, seller?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null, soldItems: Array<{ __typename?: 'SoldItem', color?: string | null, id: string, name: string, soldPrice: number, quantity: number, buyPrice: number, minPrice: number, item?: { __typename?: 'Item', id: string } | null }> } | null } };

export type LoginMutationVariables = Exact<{
  data: UserLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', target: string, message: string }> | null, user?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', target: string, message: string }> | null, user?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null } };

export type DeleteItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteItemMutation = { __typename?: 'Mutation', deleteItem: boolean };

export type RemoveItemMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoveItemMutation = { __typename?: 'Mutation', removeItem?: { __typename?: 'Order', id: string, created_date: string, seller?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null, soldItems: Array<{ __typename?: 'SoldItem', color?: string | null, id: string, name: string, soldPrice: number, quantity: number, buyPrice: number, minPrice: number, item?: { __typename?: 'Item', id: string } | null }> } | null };

export type MeUserQueryVariables = Exact<{ [key: string]: never; }>;


export type MeUserQuery = { __typename?: 'Query', meUser?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null };

export type MyOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type MyOrderQuery = { __typename?: 'Query', MyOrder?: { __typename?: 'Order', id: string, created_date: string, seller?: { __typename?: 'User', id: string, name: string, privilege: boolean } | null, soldItems: Array<{ __typename?: 'SoldItem', id: string, name: string, quantity: number, soldPrice: number, color?: string | null, buyPrice: number, minPrice: number, item?: { __typename?: 'Item', id: string } | null }> } | null };

export type ItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, model: string, color?: string | null, minQuantity: number, minPrice: number, maxPrice: number, buyPrice: number, quantity: number, selected: boolean, brand: { __typename?: 'Brand', id: string, name: string }, supplier?: { __typename?: 'Supplier', id: string, name: string } | null }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, privilege: boolean }> };


export const CreateItemDocument = gql`
    mutation CreateItem($data: CreateItemInput!) {
  createItem(data: $data) {
    errors {
      target
      message
    }
    item {
      id
      model
      color
      minQuantity
      minPrice
      maxPrice
      buyPrice
      quantity
      selected
      brand {
        id
        name
      }
      supplier {
        id
        name
      }
    }
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Float!) {
  deleteUser(id: $id)
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const EditItemDocument = gql`
    mutation EditItem($data: UpdateItemInput!, $id: String!) {
  EditItem(id: $id, data: $data) {
    errors {
      target
      message
    }
    item {
      id
      model
      color
      minQuantity
      minPrice
      maxPrice
      buyPrice
      quantity
      selected
      brand {
        id
        name
      }
      supplier {
        id
        name
      }
    }
  }
}
    `;

export function useEditItemMutation() {
  return Urql.useMutation<EditItemMutation, EditItemMutationVariables>(EditItemDocument);
};
export const HandelOrderDocument = gql`
    mutation HandelOrder($id: String!) {
  handelOrder(id: $id) {
    errors {
      field
      message
    }
    order {
      id
      created_date
      seller {
        id
        name
        privilege
      }
      soldItems {
        color
        id
        name
        soldPrice
        quantity
        buyPrice
        minPrice
        item {
          id
        }
      }
    }
  }
}
    `;

export function useHandelOrderMutation() {
  return Urql.useMutation<HandelOrderMutation, HandelOrderMutationVariables>(HandelOrderDocument);
};
export const LoginDocument = gql`
    mutation Login($data: UserLogin!) {
  login(data: $data) {
    errors {
      target
      message
    }
    user {
      id
      name
      privilege
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInput!) {
  createUser(data: $data) {
    errors {
      target
      message
    }
    user {
      id
      name
      privilege
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const DeleteItemDocument = gql`
    mutation deleteItem($id: String!) {
  deleteItem(id: $id)
}
    `;

export function useDeleteItemMutation() {
  return Urql.useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DeleteItemDocument);
};
export const RemoveItemDocument = gql`
    mutation removeItem($id: String!) {
  removeItem(id: $id) {
    id
    created_date
    seller {
      id
      name
      privilege
    }
    soldItems {
      color
      id
      name
      soldPrice
      quantity
      buyPrice
      minPrice
      item {
        id
      }
    }
  }
}
    `;

export function useRemoveItemMutation() {
  return Urql.useMutation<RemoveItemMutation, RemoveItemMutationVariables>(RemoveItemDocument);
};
export const MeUserDocument = gql`
    query MeUser {
  meUser {
    id
    name
    privilege
  }
}
    `;

export function useMeUserQuery(options?: Omit<Urql.UseQueryArgs<MeUserQueryVariables>, 'query'>) {
  return Urql.useQuery<MeUserQuery, MeUserQueryVariables>({ query: MeUserDocument, ...options });
};
export const MyOrderDocument = gql`
    query MyOrder {
  MyOrder {
    id
    created_date
    seller {
      id
      name
      privilege
    }
    soldItems {
      id
      name
      quantity
      soldPrice
      color
      buyPrice
      minPrice
      item {
        id
      }
    }
  }
}
    `;

export function useMyOrderQuery(options?: Omit<Urql.UseQueryArgs<MyOrderQueryVariables>, 'query'>) {
  return Urql.useQuery<MyOrderQuery, MyOrderQueryVariables>({ query: MyOrderDocument, ...options });
};
export const ItemsDocument = gql`
    query Items {
  items {
    id
    brand {
      id
      name
    }
    model
    color
    minQuantity
    minPrice
    maxPrice
    buyPrice
    quantity
    selected
    supplier {
      id
      name
    }
  }
}
    `;

export function useItemsQuery(options?: Omit<Urql.UseQueryArgs<ItemsQueryVariables>, 'query'>) {
  return Urql.useQuery<ItemsQuery, ItemsQueryVariables>({ query: ItemsDocument, ...options });
};
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    privilege
  }
}
    `;

export function useUsersQuery(options?: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'>) {
  return Urql.useQuery<UsersQuery, UsersQueryVariables>({ query: UsersDocument, ...options });
};
export type WithTypename<T extends { __typename?: any }> = Partial<T> & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Brand?: (data: WithTypename<Brand>) => null | string,
  FieldError?: (data: WithTypename<FieldError>) => null | string,
  FieldError2?: (data: WithTypename<FieldError2>) => null | string,
  Item?: (data: WithTypename<Item>) => null | string,
  ItemResponse?: (data: WithTypename<ItemResponse>) => null | string,
  Order?: (data: WithTypename<Order>) => null | string,
  OrderResponse?: (data: WithTypename<OrderResponse>) => null | string,
  SoldItem?: (data: WithTypename<SoldItem>) => null | string,
  Supplier?: (data: WithTypename<Supplier>) => null | string,
  User?: (data: WithTypename<User>) => null | string,
  UserResponse?: (data: WithTypename<UserResponse>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    MyOrder?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Order> | string>,
    items?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Item> | string>>,
    meUser?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<User> | string>,
    orders?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Order> | string>>,
    users?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<User> | string>>
  },
  Brand?: {
    id?: GraphCacheResolver<WithTypename<Brand>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Brand>, Record<string, never>, Scalars['String'] | string>
  },
  FieldError?: {
    message?: GraphCacheResolver<WithTypename<FieldError>, Record<string, never>, Scalars['String'] | string>,
    target?: GraphCacheResolver<WithTypename<FieldError>, Record<string, never>, Scalars['String'] | string>
  },
  FieldError2?: {
    field?: GraphCacheResolver<WithTypename<FieldError2>, Record<string, never>, Scalars['String'] | string>,
    message?: GraphCacheResolver<WithTypename<FieldError2>, Record<string, never>, Scalars['String'] | string>
  },
  Item?: {
    brand?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, WithTypename<Brand> | string>,
    buyPrice?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Float'] | string>,
    color?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['ID'] | string>,
    maxPrice?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Float'] | string>,
    minPrice?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Float'] | string>,
    minQuantity?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Float'] | string>,
    model?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['String'] | string>,
    quantity?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Float'] | string>,
    selected?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, Scalars['Boolean'] | string>,
    supplier?: GraphCacheResolver<WithTypename<Item>, Record<string, never>, WithTypename<Supplier> | string>
  },
  ItemResponse?: {
    errors?: GraphCacheResolver<WithTypename<ItemResponse>, Record<string, never>, Array<WithTypename<FieldError> | string>>,
    item?: GraphCacheResolver<WithTypename<ItemResponse>, Record<string, never>, WithTypename<Item> | string>
  },
  Order?: {
    created_date?: GraphCacheResolver<WithTypename<Order>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Order>, Record<string, never>, Scalars['ID'] | string>,
    seller?: GraphCacheResolver<WithTypename<Order>, Record<string, never>, WithTypename<User> | string>,
    soldItems?: GraphCacheResolver<WithTypename<Order>, Record<string, never>, Array<WithTypename<SoldItem> | string>>
  },
  OrderResponse?: {
    errors?: GraphCacheResolver<WithTypename<OrderResponse>, Record<string, never>, Array<WithTypename<FieldError2> | string>>,
    order?: GraphCacheResolver<WithTypename<OrderResponse>, Record<string, never>, WithTypename<Order> | string>
  },
  SoldItem?: {
    buyPrice?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['Float'] | string>,
    color?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['ID'] | string>,
    item?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, WithTypename<Item> | string>,
    minPrice?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['Float'] | string>,
    name?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['String'] | string>,
    order?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, WithTypename<Order> | string>,
    quantity?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['Float'] | string>,
    soldPrice?: GraphCacheResolver<WithTypename<SoldItem>, Record<string, never>, Scalars['Float'] | string>
  },
  Supplier?: {
    address?: GraphCacheResolver<WithTypename<Supplier>, Record<string, never>, Scalars['String'] | string>,
    id?: GraphCacheResolver<WithTypename<Supplier>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Supplier>, Record<string, never>, Scalars['String'] | string>,
    phone?: GraphCacheResolver<WithTypename<Supplier>, Record<string, never>, Scalars['String'] | string>
  },
  User?: {
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    privilege?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['Boolean'] | string>
  },
  UserResponse?: {
    errors?: GraphCacheResolver<WithTypename<UserResponse>, Record<string, never>, Array<WithTypename<FieldError> | string>>,
    user?: GraphCacheResolver<WithTypename<UserResponse>, Record<string, never>, WithTypename<User> | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  EditItem?: GraphCacheOptimisticMutationResolver<MutationEditItemArgs, WithTypename<ItemResponse>>,
  createItem?: GraphCacheOptimisticMutationResolver<MutationCreateItemArgs, WithTypename<ItemResponse>>,
  createUser?: GraphCacheOptimisticMutationResolver<MutationCreateUserArgs, WithTypename<UserResponse>>,
  deleteItem?: GraphCacheOptimisticMutationResolver<MutationDeleteItemArgs, Scalars['Boolean']>,
  deleteUser?: GraphCacheOptimisticMutationResolver<MutationDeleteUserArgs, Scalars['Boolean']>,
  handelOrder?: GraphCacheOptimisticMutationResolver<MutationHandelOrderArgs, WithTypename<OrderResponse>>,
  login?: GraphCacheOptimisticMutationResolver<MutationLoginArgs, WithTypename<UserResponse>>,
  logout?: GraphCacheOptimisticMutationResolver<Record<string, never>, Scalars['Boolean']>,
  removeItem?: GraphCacheOptimisticMutationResolver<MutationRemoveItemArgs, Maybe<WithTypename<Order>>>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    EditItem?: GraphCacheUpdateResolver<{ EditItem: WithTypename<ItemResponse> }, MutationEditItemArgs>,
    createItem?: GraphCacheUpdateResolver<{ createItem: WithTypename<ItemResponse> }, MutationCreateItemArgs>,
    createUser?: GraphCacheUpdateResolver<{ createUser: WithTypename<UserResponse> }, MutationCreateUserArgs>,
    deleteItem?: GraphCacheUpdateResolver<{ deleteItem: Scalars['Boolean'] }, MutationDeleteItemArgs>,
    deleteUser?: GraphCacheUpdateResolver<{ deleteUser: Scalars['Boolean'] }, MutationDeleteUserArgs>,
    handelOrder?: GraphCacheUpdateResolver<{ handelOrder: WithTypename<OrderResponse> }, MutationHandelOrderArgs>,
    login?: GraphCacheUpdateResolver<{ login: WithTypename<UserResponse> }, MutationLoginArgs>,
    logout?: GraphCacheUpdateResolver<{ logout: Scalars['Boolean'] }, Record<string, never>>,
    removeItem?: GraphCacheUpdateResolver<{ removeItem: Maybe<WithTypename<Order>> }, MutationRemoveItemArgs>
  },
  Subscription?: {},
};

export type GraphCacheConfig = Parameters<typeof offlineExchange>[0] & {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers,
};