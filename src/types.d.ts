import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type About = {
   __typename?: 'About',
  description?: Maybe<Scalars['String']>,
  favoriteGame?: Maybe<Game>,
  currentlyPlaying?: Maybe<Game>,
  accounts?: Maybe<Array<Maybe<SocialLink>>>,
};

export type Game = {
   __typename?: 'Game',
  id?: Maybe<Scalars['ID']>,
  name?: Maybe<Scalars['String']>,
  covers?: Maybe<GameImage>,
};

export type GameImage = {
   __typename?: 'GameImage',
  cover?: Maybe<Scalars['String']>,
  logo?: Maybe<Scalars['String']>,
  thumb?: Maybe<Scalars['String']>,
  screenshotMed?: Maybe<Scalars['String']>,
  screenshotBig?: Maybe<Scalars['String']>,
  screenshotHuge?: Maybe<Scalars['String']>,
  res720?: Maybe<Scalars['String']>,
  res1080?: Maybe<Scalars['String']>,
};

export enum LinkType {
  Twitch = 'TWITCH',
  Mixer = 'MIXER',
  Discord = 'DISCORD',
  Youtube = 'YOUTUBE',
  Facebook = 'FACEBOOK',
  Steam = 'STEAM',
  Origin = 'ORIGIN',
  Uplay = 'UPLAY',
  Battlenet = 'BATTLENET',
  Riot = 'RIOT',
  Plain = 'PLAIN'
}

export type Me = {
   __typename?: 'Me',
  about?: Maybe<About>,
  posts?: Maybe<Array<Maybe<Post>>>,
  following?: Maybe<Array<Maybe<User>>>,
  followers?: Maybe<Array<Maybe<User>>>,
};

export type Post = {
   __typename?: 'Post',
  id?: Maybe<Scalars['ID']>,
  author?: Maybe<User>,
  content?: Maybe<Scalars['String']>,
  tags?: Maybe<Array<Maybe<Scalars['String']>>>,
  reactions?: Maybe<Array<Maybe<Reactions>>>,
};

export type Query = {
   __typename?: 'Query',
  user?: Maybe<User>,
  post?: Maybe<Post>,
  posts?: Maybe<Array<Maybe<Post>>>,
  me?: Maybe<Me>,
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>
};


export type QueryPostArgs = {
  id?: Maybe<Scalars['String']>
};

export type Reaction = {
   __typename?: 'Reaction',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<ReactionType>,
  user?: Maybe<User>,
};

export type Reactions = {
   __typename?: 'Reactions',
  id?: Maybe<Scalars['ID']>,
  type?: Maybe<ReactionType>,
  count?: Maybe<Scalars['Int']>,
  nodes?: Maybe<Array<Maybe<Reaction>>>,
};

export enum ReactionType {
  Like = 'LIKE',
  Love = 'LOVE',
  Dislike = 'DISLIKE'
}

export type SocialLink = {
   __typename?: 'SocialLink',
  type?: Maybe<LinkType>,
  url?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
};

export type User = {
   __typename?: 'User',
  id?: Maybe<Scalars['ID']>,
  username?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  img?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Post: ResolverTypeWrapper<Post>,
  Reactions: ResolverTypeWrapper<Reactions>,
  ReactionType: ReactionType,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Reaction: ResolverTypeWrapper<Reaction>,
  Me: ResolverTypeWrapper<Me>,
  About: ResolverTypeWrapper<About>,
  Game: ResolverTypeWrapper<Game>,
  GameImage: ResolverTypeWrapper<GameImage>,
  SocialLink: ResolverTypeWrapper<SocialLink>,
  LinkType: LinkType,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  User: User,
  ID: Scalars['ID'],
  Post: Post,
  Reactions: Reactions,
  ReactionType: ReactionType,
  Int: Scalars['Int'],
  Reaction: Reaction,
  Me: Me,
  About: About,
  Game: Game,
  GameImage: GameImage,
  SocialLink: SocialLink,
  LinkType: LinkType,
  Boolean: Scalars['Boolean'],
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, QueryUserArgs>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, QueryPostArgs>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['Me']>, ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  img?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reactions']>>>, ParentType, ContextType>,
};

export type ReactionsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reactions'] = ResolversParentTypes['Reactions']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>,
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  nodes?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reaction']>>>, ParentType, ContextType>,
};

export type ReactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['ReactionType']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
};

export type MeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  about?: Resolver<Maybe<ResolversTypes['About']>, ParentType, ContextType>,
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
};

export type AboutResolvers<ContextType = any, ParentType extends ResolversParentTypes['About'] = ResolversParentTypes['About']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  favoriteGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  currentlyPlaying?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>,
  accounts?: Resolver<Maybe<Array<Maybe<ResolversTypes['SocialLink']>>>, ParentType, ContextType>,
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  covers?: Resolver<Maybe<ResolversTypes['GameImage']>, ParentType, ContextType>,
};

export type GameImageResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameImage'] = ResolversParentTypes['GameImage']> = {
  cover?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  logo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumb?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  screenshotMed?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  screenshotBig?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  screenshotHuge?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  res720?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  res1080?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = {
  type?: Resolver<Maybe<ResolversTypes['LinkType']>, ParentType, ContextType>,
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Reactions?: ReactionsResolvers<ContextType>,
  Reaction?: ReactionResolvers<ContextType>,
  Me?: MeResolvers<ContextType>,
  About?: AboutResolvers<ContextType>,
  Game?: GameResolvers<ContextType>,
  GameImage?: GameImageResolvers<ContextType>,
  SocialLink?: SocialLinkResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
